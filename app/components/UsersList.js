import React from 'react';
import { Avatar, Tooltip } from 'antd';
import './users.scss';

const UsersList = ({ users }) => (
    <div className='userslist'>
        <ul>
            { users.map(u => (
                <li key={u.id}>
                    <Tooltip placement="left" title={u.name}>
                        <Avatar
                            icon="user"
                            size={'large'}
                            src={`https://api.adorable.io/avatars/120/${u.name}.png`}
                            style={{ backgroundColor: `#${u.color}`, verticalAlign: 'middle' }} />
                    </Tooltip>
                </li>
            ))}
        </ul>
    </div>
);

export default UsersList;