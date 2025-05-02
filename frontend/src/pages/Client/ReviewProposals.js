import React, { useEffect, useState } from "react";

const ReviewProposals = () => {
  const [jobs, setJobs] = useState([]);
  const [proposalsByJob, setProposalsByJob] = useState({});
  const [loading, setLoading] = useState(true);

  const clientId = localStorage.getItem("userId");

  useEffect(() => {
    if (!clientId) return;

    const ts = Date.now();
    // fetch jobs & proposals in parallel
    Promise.all([
      fetch(`http://localhost:5000/api/jobs/client?clientId=${clientId}&_=${ts}`).then(r=>r.json()),
      fetch(`http://localhost:5000/api/proposals/client/${clientId}?_=${ts}`).then(r=>r.json())
    ])
    .then(([jobsData, { jobs: _, proposals }]) => {
      setJobs(jobsData);
      // group proposals by jobId
      const grouped = proposals.reduce((acc, p) => {
        const jid = p.job._id.toString();
        if (!acc[jid]) acc[jid] = [];
        acc[jid].push(p);
        return acc;
      }, {});
      setProposalsByJob(grouped);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [clientId]);

  const updateStatus = (proposalId, action) => {
    fetch(`http://localhost:5000/api/proposals/${proposalId}/${action}`, { method: "POST" })
      .then(res => res.json())
      .then(() => {
        setProposalsByJob(prev => {
          // remove that proposal from whichever job array it was in
          const copy = { ...prev };
          Object.keys(copy).forEach(jid => {
            copy[jid] = copy[jid].filter(p => p._id !== proposalId);
          });
          return copy;
        });
      })
      .catch(console.error);
  };

  if (loading) return <div>Loading…</div>;

  if (!jobs.length) return <p>No jobs for this client.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Review Proposals</h2>
      {jobs.map(job => {
        const ps = proposalsByJob[job._id] || [];
        return (
          <div key={job._id} style={{ border: "1px solid #ccc", margin: "1em 0", padding: "1em", borderRadius: 8 }}>
            <h3>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Budget:</strong> ${job.budget}</p>
            <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>

            {ps.length === 0
              ? <p>No proposals yet.</p>
              : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {ps.map(p => (
                    <li key={p._id} style={{ marginBottom: "1em", padding: "0.5em", border: "1px solid #ddd", borderRadius: 6 }}>
                      <p><strong>{p.freelancer.fullName}</strong> (${p.bidAmount})</p>
                      <p>{p.proposalText}</p>
                      <button onClick={() => updateStatus(p._id, "accept")} style={{ marginRight: 8 }}>Accept</button>
                      <button onClick={() => updateStatus(p._id, "reject")}>Reject</button>
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
        );
      })}
    </div>
  );
};

export default ReviewProposals;
