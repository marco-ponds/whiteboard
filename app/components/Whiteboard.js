import React from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import {COLORS, getRandomColor, SIZES, TOOLS} from './constants';
import TextModal from './TextModal';
import UserModal from './UserModal';
import UsersList from './UsersList';
import SocketConnection from './lib/SocketConnection';
import Cookie from 'js-cookie';
import axios from 'axios';
import Grid from './Grid';
import CanvasContext from './lib/CanvasContext';

import { Typography } from 'antd';

const { Title } = Typography;


class Whiteboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tool: TOOLS.DRAW,
            color: COLORS[1],
            size: SIZES[0],
            grid: {
                enabled: false,
                size: 50
            },
            text: {
                visible: false,
                position: { x: 0, y: 0},
                content: false
            },
            user: {
                visible: false,
                room: this.extractLocationHash(),
                name: Cookie.get('username'),
                id: Cookie.get('id'),
                color: Cookie.get('color')
            },
            users: []
        };
    }

    extractLocationHash = () => location.hash.replace('#', '') || 'default';

    handleBeforeUnload = () => {
        console.log('this is when the app is about to be destroyed');
        SocketConnection.disconnect();

        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleHashChange = () => {
        SocketConnection.disconnect();
        this.setState({
            user: {
                ...this.state.user,
                room: this.extractLocationHash()
            }
        }, this.startConnection);
    }

    componentDidMount() {
        // listening for unload event
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        window.addEventListener('hashchange', this.handleHashChange);
        // control if cookie exists with username
        // if not, render modal for username
        // if exists, starts connection to BE
        const name = Cookie.get('username');
        const id = Cookie.get('id');
        const color = Cookie.get('color');

        if (!name || !id || !color) {
            this.setState({
                user: {
                    ...this.state.user,
                    visible: true
                }
            });
        } else {
            this.startConnection();
        }
    }

    startConnection() {
        SocketConnection.connect(this.state.user, this.handleConnectionsChanges);
    }

    handleDrawLine = (data) => SocketConnection.sendDraw(data);
    handleDrawText = (data) => SocketConnection.sendText(data);
    handleDrawSquare = (data) => SocketConnection.sendSquare(data);
    handleDrawCircle = (data) => SocketConnection.sendCircle(data);

    handleConnectionsChanges = ({ users }) => {
        this.setState({ users });
    }

    handleToolChange = (tool) => () => {
        this.setState({ tool: tool });
    }

    handleColorChange = (color) => () => {
        this.setState({ color });
    }

    handleSizeChange = (size) => () => {
        this.setState({ size });
    }

    handleGridCheckboxChange = () => {
        this.setState({
            grid: {
                ...this.state.grid,
                enabled: !this.state.grid.enabled
            }
        });
    }

    handleTextStart = (position) => {
        // tthis should set text modal visible
        this.setState({
            text: {
                visible: true,
                position,
                content: false
            }
        })
    }

    handleTextCompleted = (content) => {
        // text is done, close the modal now and set content to false
        const { text } = this.state;

        this.setState({
            text: {
                visible: false,
                position: text.position,
                content
            }
        });
    }

    handleTextModalDone = () => {
        // modal has been dismissed, clear everything
        this.setState({
            text: {
                visible: false,
                position: { x: 0, y: 0},
                content: false
            }
        });
    }

    handleSave = (blob) => {
        // upload blob to be
        const { user } = this.state;
        const formData = new FormData();
        formData.append('data', blob, 'board.png');
        formData.append('room', user.room);

        axios.post('/api/image', formData);
    }

    handleClearAll = () => {
        // clear everything then save
        CanvasContext.clearAll();
        CanvasContext.toBlob(this.handleSave);
    }

    handleExport = () => {
        // getting the blob then exporting
        CanvasContext.toBlob((blob) => {
            const link = document.createElement('a');
            link.download = `${this.state.user.room}_board.png`;

            link.href = URL.createObjectURL(blob);
            link.click();
        });
    }

    handleUsernameCompleted = (name) => {
        // store this name inside cookie
        // setting the state with new color for the user
        // setting also new id for the user
        // this values should be restored from cookie when starting app
        Cookie.set('username', name);
        const id = '' + Math.floor((Math.random() * 10000));
        Cookie.set('id', id);

        const color = getRandomColor();
        Cookie.set('color', color);

        this.setState({
            user: {
                visible: false,
                room: this.state.user.room,
                name,
                id,
                color
            }
        }, this.startConnection);
    }

    render() {
        const {
            tool,
            color,
            size,
            text,
            user,
            users,
            grid
        } = this.state;

        return (
            <div>
                <Title className={'title'}>
                    {user.room}
                </Title>
                <Toolbar
                    tool={tool}
                    size={size}
                    color={color}
                    grid={grid}
                    onColorChange={this.handleColorChange}
                    onSizeChange={this.handleSizeChange}
                    onToolChange={this.handleToolChange}
                    onGridCheckboxChange={this.handleGridCheckboxChange}
                    onClearAll={this.handleClearAll}
                    onExportPng={this.handleExport}
                />
                <Canvas
                    grid={grid}
                    tool={tool}
                    color={color}
                    size={size}
                    text={text}
                    user={user}
                    onSave={this.handleSave}
                    onTextStart={this.handleTextStart}
                    onTextDone={this.handleTextModalDone}
                    onDrawLine={this.handleDrawLine}
                    onDrawText={this.handleDrawText}
                    onDrawSquare={this.handleDrawSquare}
                    onDrawCircle={this.handleDrawCircle}
                />
                { grid.enabled && <Grid gridSize={grid.size}/> }
                <UsersList
                    users={users}
                />
                <TextModal
                    visible={text.visible}
                    onModalDismiss={this.handleTextModalDone}
                    onTextCompleted={this.handleTextCompleted}
                />
                <UserModal
                    visible={user.visible}
                    onUsernameCompleted={this.handleUsernameCompleted}
                />
            </div>
        );
    }
}

export default Whiteboard;