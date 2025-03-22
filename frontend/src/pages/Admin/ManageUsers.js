import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
  // Default users with Pakistani names
  const defaultUsers = [
    {
      id: 1,
      name: 'Ali Khan',
      email: 'alikhan@example.com',
      role: 'Admin',
      userType: 'Freelancer',
    },
    {
      id: 2,
      name: 'Sara Ahmed',
      email: 'saraahmed@example.com',
      role: 'User',
      userType: 'Client',
    },
    {
      id: 3,
      name: 'Bilal Malik',
      email: 'bilalmalik@example.com',
      role: 'User',
      userType: 'Freelancer',
    },
    {
      id: 4,
      name: 'Ayesha Iqbal',
      email: 'ayeshaiqbal@example.com',
      role: 'Admin',
      userType: 'Client',
    },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      // Retrieve userType and userEmail from localStorage
      const storedUserType = localStorage.getItem('userType');
      const storedUserEmail = localStorage.getItem('userEmail');

      let storedUsers = [];

      if (storedUserType && storedUserEmail) {
        // Add the logged-in user from localStorage
        storedUsers.push({
          id: defaultUsers.length + 1, // Unique ID
          name: 'Logged User', // Placeholder name
          email: storedUserEmail,
          role: storedUserType,
          userType: storedUserType === 'admin' ? 'Admin' : 'Freelancer',
        });
      }

      // Combine default users with stored user
      setUsers([...defaultUsers, ...storedUsers]);
    } catch (e) {
      console.error('Error retrieving user data from localStorage:', e);
      setUsers(defaultUsers);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Users</h2>
      <ul style={styles.userList}>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} style={styles.userItem}>
              <div style={styles.userDetails}>
                <strong style={styles.userName}>{user.name}</strong> ({user.email}) - <span style={styles.userRole}>{user.role}</span>
              </div>
              <div style={styles.userType}>User Type: <span style={styles.userTypeValue}>{user.userType}</span></div>
            </li>
          ))
        ) : (
          <p style={styles.noUsers}>No users available.</p>
        )}
      </ul>
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
