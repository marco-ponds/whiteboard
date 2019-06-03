import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { COLORS } from './constants';

const ColorBlock = ({ color, name }) => {
    return (
        <span className={'colorblock-container'}>
            <div
                className={'colorblock'}
                style={{ background: color }}/>
            { name }
        </span>
    );
}

const ColorPicker = ({ onColorChange, color }) => {
    const menu = (
        <Menu>
            { COLORS.map((c) => (
                <Menu.Item onClick={onColorChange(c)} className={'colorblock-list-item'}>
                    <ColorBlock
                        color={c.key}
                        name={c.name} />
                </Menu.Item>
            ))}
        </Menu>
    );
    const { key } =  color;

    return (
        <div className={'colorpicker'}>
            <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                <Button className={'color-dropdown-button'}>
                    <ColorBlock color={key} />
                </Button>
            </Dropdown>
        </div>
    );
};

export default ColorPicker;