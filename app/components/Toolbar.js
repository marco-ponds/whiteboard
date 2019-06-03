import React from 'react';
import { Icon } from 'antd';
import ColorPicker from './ColorPicker';
import SizePicker from './SizePicker';

import './toolbar.scss';
import {TOOLS, TOOLS_ICONS} from './constants';

class Toolbar extends React.Component {

    getMenu = (currentTool, onToolChange) => (
        Object
            .keys(TOOLS)
            .map((key) => {
                const className = (currentTool === TOOLS[key]) ? 'selected': '';
                return (
                    <li
                        className={className}
                        onClick={onToolChange(TOOLS[key])}>
                        <Icon type={TOOLS_ICONS[key]}/>
                    </li>
                );
            })
    );
  
    render() {

        const { onToolChange, onColorChange, onSizeChange, color, size, tool } = this.props;

        return (
            <div className='toolbar'>
                <ul>
                    { this.getMenu(tool, onToolChange) }
                </ul>
                <ColorPicker
                    color={color}
                    onColorChange={onColorChange}
                />
                <SizePicker
                    size={size}
                    onSizeChange={onSizeChange}
                />
            </div>)
    }
}
  
export default Toolbar;