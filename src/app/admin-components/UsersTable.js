import React, { useEffect, useState } from 'react';
import styles from './UsersTable.module.css';

const UsersTable = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3200/api/v1/users/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error(error));

    }, []) 

    return (
        <div className={styles.fullScreen}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>User IP</th>
                            <th>Username</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td className={styles.obscured}>••••••••</td>
                                <td>{user.userip}</td>
                                <td>{user.username || '-'}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { UsersTable };
