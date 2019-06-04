import React from 'react';
import {Icon, Tooltip} from 'antd';
import ColorPicker from './ColorPicker';
import SizePicker from './SizePicker';

import './toolbar.scss';
import {TOOLS, TOOLS_ICONS} from './constants';
import GridCheckbox from './GridCheckbox';
import ExtraToolbar from './ExtraToolbar';

class Toolbar extends React.Component {

    getMenu = (currentTool, onToolChange) => (
        Object
            .keys(TOOLS)
            .map((key) => {
                const className = (currentTool === TOOLS[key]) ? 'selected': '';
                return (
                    <Tooltip placement="right" title={TOOLS[key]}>
                        <li
                            className={className}
                            onClick={onToolChange(TOOLS[key])}>
                                <Icon type={TOOLS_ICONS[key]}/>
                        </li>
                    </Tooltip>
                );
            })
    );
  
    render() {

        const {
            onToolChange,
            onColorChange,
            onSizeChange,
            onGridCheckboxChange,
            onClearAll,
            onExportPng,
            color,
            size,
            tool,
            grid
        } = this.props;

        return (
            <div className='toolbar'>
                <ul>
                    { this.getMenu(tool, onToolChange) }
                </ul>

                <ExtraToolbar
                    onClearAll={onClearAll}
                    onExportPng={onExportPng}
                />

                <ColorPicker
                    color={color}
                    onColorChange={onColorChange}
                />
                <SizePicker
                    size={size}
                    onSizeChange={onSizeChange}
                />
                <GridCheckbox
                    onGridCheckboxChange={onGridCheckboxChange}
                    value={grid.enabled} />

            </div>)
    }
}
  
export default Toolbar;