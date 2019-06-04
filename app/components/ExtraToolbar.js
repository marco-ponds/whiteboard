import React from 'react';
import {Icon, Tooltip, Dropdown, Menu } from 'antd';
import ColorPicker from './ColorPicker';
import SizePicker from './SizePicker';

import './toolbar.scss';
import {EXTRA_TOOLS_ICONS, EXTRA_TOOLS, TOOLS_ICONS, SIZES} from './constants';
import GridCheckbox from './GridCheckbox';

class ExtraToolbar extends React.Component {

    getDeleteMenu = () => {
        const { onClearAll } = this.props;

        return (
            <Menu className={'toolbar-menu'}>
                <Menu.Item
                    onClick={onClearAll}
                    className={'toolbar-list-item'}>
                    clear all
                </Menu.Item>
            </Menu>
        );
    }

    getExportMenu = () => {
        const { onExportPng } = this.props;

        return (
            <Menu className={'toolbar-menu'} >
                <Menu.Item
                    onClick={onExportPng}
                    className={'toolbar-list-item'}>
                    export as .png
                </Menu.Item>
                <Menu.Item
                    onClick={onExportPng}
                    className={'toolbar-list-item'}>
                    export as .jpg
                </Menu.Item>
                <Menu.Item
                    onClick={onExportPng}
                    className={'toolbar-list-item'}>
                    export as .pdf
                </Menu.Item>

            </Menu>
        );
    }

    render() {

        return (
            <ul className={'extratoolbar'}>
                <li className={'extratoolbar-dropdown-button'}>
                    <Dropdown overlay={this.getDeleteMenu()} placement="bottomRight" trigger={['click']}>
                        <Icon type={'delete'}/>
                    </Dropdown>
                </li>
                <li className={'extratoolbar-dropdown-button'}>
                    <Dropdown overlay={this.getExportMenu()} placement="bottomRight" trigger={['click']}>
                        <Icon type={'export'}/>
                    </Dropdown>
                </li>
            </ul>
            )
    }
}

export default ExtraToolbar;