import io from 'socket.io-client';

const connect = () => {
  Socket.socket = io.connect('https://n-ivehement.herokuapp.com');
}

const on = (eventName, callback) => {
  if (Socket.socket) {
    Socket.socket.on(eventName, data => {
      callback(data);
    });
  }
}

const emit = (eventName, data) => {
  if (Socket.socket) {
    Socket.socket.emit(eventName, data);
  }
}

const removeListener = (eventName) => {
  if (Socket.socket) {
    Socket.socket.removeListener(eventName);
  }
}

const Socket = {
  connect,
  on,
  emit,
  removeListener,
  socket: null
}

export default Socket;