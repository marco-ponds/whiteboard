import React from 'react';
import {Menu, Dropdown, Button, Tooltip} from 'antd';
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
        <Menu className="toolbar-menu">
            { COLORS.map((c) => (
                <Menu.Item onClick={onColorChange(c)} className={'toolbar-list-item'}>
                    <ColorBlock
                        color={c.key}
                        name={c.name} />
                </Menu.Item>
            ))}
        </Menu>
    );
    const { key } =  color;

    return (
        <Tooltip placement="right" title={'tool color'}>
            <div className={'colorpicker'}>
                <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                    <Button className={'color-dropdown-button'}>
                        <ColorBlock color={key} />
                    </Button>
                </Dropdown>
            </div>
        </Tooltip>
    );
};

export default ColorPicker;