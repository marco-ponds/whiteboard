import React from 'react';
import { Checkbox, Tooltip } from 'antd';

const GridCheckbox = ({ onGridCheckboxChange, value }) => (
    <Tooltip placement="right" title={'snap to grid'}>
        <div className={'gridcheckbox'}>
            <Checkbox
                className='gridcheckbox-input'
                value={value}
                onChange={onGridCheckboxChange} />
        </div>
    </Tooltip>
);

export default GridCheckbox;