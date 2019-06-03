import React from 'react';
import { Avatar } from 'antd';
import './users.scss';

const UsersList = ({ users }) => (
    <div className='userslist'>
        <ul>
            { users.map(u => (
                <li key={u.id}>
                    <Avatar size={'large'} style={{ backgroundColor: `#${u.color}`, verticalAlign: 'middle' }}>
                        { u.name }
                    </Avatar>
                </li>
            ))}
        </ul>
    </div>
);

export default UsersList;