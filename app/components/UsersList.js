import React from 'react';
import { Avatar, Tooltip } from 'antd';
import './users.scss';

const UsersList = ({ users }) => (
    <div className='userslist'>
        <ul>
            { users.map(u => (
                <li key={u.id}>
                    <Tooltip placement="bottom" title={u.name}>
                        <Avatar
                            icon="user"
                            size={'large'}
                            style={{ backgroundColor: `#${u.color}`, verticalAlign: 'middle' }} />
                    </Tooltip>
                </li>
            ))}
        </ul>
    </div>
);

export default UsersList;