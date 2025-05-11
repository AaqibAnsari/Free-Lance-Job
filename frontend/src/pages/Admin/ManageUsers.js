import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/');
        const data = await response.json();

        // Format each user for display
        const formattedUsers = data.map((user, index) => ({
          id: user._id || index,
          name: user.fullName || 'Unnamed',
          email: user.email,
          role: user.role || 'User',
          userType: user.role === 'admin' ? 'Admin' : 'Freelancer',
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Users</h2>
      {loading ? (
        <p style={styles.noUsers}>Loading users...</p>
      ) : (
        <ul style={styles.userList}>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} style={styles.userItem}>
                <div style={styles.userDetails}>
                  <strong style={styles.userName}>{user.name}</strong> ({user.email}) -{' '}
                  <span style={styles.userRole}>{user.role}</span>
                </div>
                <div style={styles.userType}>
                  User Type: <span style={styles.userTypeValue}>{user.userType}</span>
                </div>
              </li>
            ))
          ) : (
            <p style={styles.noUsers}>No users available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  userList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  userItem: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  userDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  userName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#007bff',
  },
  userRole: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '14px',
  },
  userType: {
    fontSize: '14px',
    color: '#555',
    marginTop: '5px',
  },
  userTypeValue: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  noUsers: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
  },
};

export default ManageUsers;
