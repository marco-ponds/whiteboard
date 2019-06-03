import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { SIZES } from './constants';

const SizeBlock = ({ size, name }) => {
    return (
        <span className={'sizeblock-container'}>
            <div
                className={'sizeblock'}
                style={{ boxShadow: `inset 0px -${size}px 0px black` }}/>
            { name }
        </span>
    );
}

const SizePicker = ({ onSizeChange, size }) => {
    const menu = (
        <Menu>
            { SIZES.map((s) => (
                <Menu.Item onClick={onSizeChange(s)} className={'sizeblock-list-item'}>
                    <SizeBlock
                        size={s.key}
                        name={s.name} />
                </Menu.Item>
            ))}
        </Menu>
    );
    const { key } =  size;

    return (
        <div className={'sizepicker'}>
            <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                <Button className={'size-dropdown-button'}>
                    <SizeBlock size={key} />
                </Button>
            </Dropdown>
        </div>
    );
};

export default SizePicker;