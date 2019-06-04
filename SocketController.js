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

let users = {};
let socketIO = null;

class SocketController {
    
    static start(io) {
        socketIO = io;
        socketIO.on('connection', SocketController.handleConnection);
    }

    static handleConnection(socket) {
        console.log('user is connecting');

        socket.on(SOCKET_EVENTS.NEW, SocketController.handleNewUser(socket));
        socket.on(SOCKET_EVENTS.DISCONNECT, SocketController.handleDisconnection(socket));

        socket.on(SOCKET_EVENTS.DRAW, SocketController.broadcast(SOCKET_EVENTS.DRAW));
        socket.on(SOCKET_EVENTS.TEXT, SocketController.broadcast(SOCKET_EVENTS.TEXT));
        socket.on(SOCKET_EVENTS.SQUARE, SocketController.broadcast(SOCKET_EVENTS.SQUARE));
        socket.on(SOCKET_EVENTS.CIRCLE, SocketController.broadcast(SOCKET_EVENTS.CIRCLE));
        socket.on(SOCKET_EVENTS.LINE, SocketController.broadcast(SOCKET_EVENTS.LINE));
    }

    static broadcast(event) {
        return function(data) {
            const room = data.user && data.user.room || 'default';
            socketIO.to(room).emit(event, data);
        }
    }

    static handleNewUser(socket) {
        return function (data) {
            const room = data.room || 'default';
            if (!users[room]) {
                users[room] = [];
            }
            users[room].push(data);

            socket.join(room);
            socketIO.to(room).emit(SOCKET_EVENTS.NEW, { users: users[room] });
        }
    }

    static handleDisconnection(socket) {
        return function(data) {
            const room = data.room;
            users[room] = users[room] && users[room].filter(user => user.id !== data.id) || [];

            socket.leave(room);
            socketIO.to(room).emit(SOCKET_EVENTS.DISCONNECT, { users: users[room] });
        }
    }
}

module.exports = SocketController;