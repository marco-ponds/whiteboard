import io from 'socket.io-client';
import {SOCKET_EVENTS} from '../constants';
import CanvasContext from './CanvasContext';

class SocketConnection {

    connect(user, onConnectionChange) {
        this.user = user;
        this.socket = io();

        this.socket.on(SOCKET_EVENTS.NEW, onConnectionChange);
        this.socket.on(SOCKET_EVENTS.DISCONNECT, onConnectionChange);

        this.socket.on(SOCKET_EVENTS.DRAW, this.handleDraw);
        this.socket.on(SOCKET_EVENTS.TEXT, this.handleText);
        this.socket.on(SOCKET_EVENTS.SQUARE, this.handleSquare);
        this.socket.on(SOCKET_EVENTS.CIRCLE, this.handleCircle);

        this.socket.emit(SOCKET_EVENTS.NEW, { ...user });
    }

    disconnect = () => {
        // do something here
        this.socket.emit(SOCKET_EVENTS.DISCONNECT, { ...this.user });
    }

    // drawing

    handleDraw = (data) => {
        const { user, start, stop, color, size } = data;
        if (user.id !== this.user.id) {
            CanvasContext.drawLine(start, stop, color, size);
        }
    }

    sendDraw(data) {
        this.socket.emit(SOCKET_EVENTS.DRAW, { ...data, user: this.user });
    }

    // text

    handleText = (data) => {
        const { user, text, color, size } = data;
        if (user.id !== this.user.id) {
            CanvasContext.drawText(text, color, size);
        }
    }

    sendText(data) {
        this.socket.emit(SOCKET_EVENTS.TEXT, { ...data, user: this.user });
    }

    // square

    handleSquare = (data) => {
        const { user, start, stop, color, size } = data;
        if (user.id !== this.user.id) {
            CanvasContext.drawSquare(start, stop, color, size);
        }
    }

    sendSquare(data) {
        this.socket.emit(SOCKET_EVENTS.SQUARE, { ...data, user: this.user });
    }

    // circle

    handleCircle = (data) => {
        const { user, start, stop, color, size } = data;
        if (user.id !== this.user.id) {
            CanvasContext.drawCircle(start, stop, color, size);
        }
    }

    sendCircle(data) {
        this.socket.emit(SOCKET_EVENTS.CIRCLE, { ...data, user: this.user });
    }

}

export default new SocketConnection();