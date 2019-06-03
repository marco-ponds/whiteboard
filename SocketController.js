const SOCKET_EVENTS = {
    NEW: 'new',
    DRAW: 'draw',
    TEXT: 'text',
    SQUARE: 'square',
    CIRCLE: 'circle',
    LINE: 'line',
    ARROW: 'arrow',
    DISCONNECT: 'user_disconnect',
    USERS: 'users'
};

let users = [];
let socketIO = null;

class SocketController {
    
    static start(io) {
        socketIO = io;
        socketIO.on('connection', SocketController.handleConnection);
    }

    static handleConnection(socket) {
        console.log('user is connecting');

        socket.on(SOCKET_EVENTS.NEW, SocketController.handleNewUser);
        socket.on(SOCKET_EVENTS.DISCONNECT, SocketController.handleDisconnection);

        socket.on(SOCKET_EVENTS.DRAW, SocketController.broadcast(SOCKET_EVENTS.DRAW));
        socket.on(SOCKET_EVENTS.TEXT, SocketController.broadcast(SOCKET_EVENTS.TEXT));
        socket.on(SOCKET_EVENTS.SQUARE, SocketController.broadcast(SOCKET_EVENTS.SQUARE));
        socket.on(SOCKET_EVENTS.CIRCLE, SocketController.broadcast(SOCKET_EVENTS.CIRCLE));
        socket.on(SOCKET_EVENTS.LINE, SocketController.broadcast(SOCKET_EVENTS.LINE));
    }

    static broadcast(event) {
        return function(data) {
            socketIO.emit(event, data);
        }
    }

    static handleNewUser(data) {
        users.push(data);
        socketIO.emit(SOCKET_EVENTS.NEW, { users });
    }

    static handleDisconnection(data) {
        console.log('receiving disconnection from', data, data.id, data.name);
        users = users.filter(user => user.id !== data.id);
        console.log(users);
        socketIO.emit(SOCKET_EVENTS.DISCONNECT, { users });
    }
}

module.exports = SocketController;