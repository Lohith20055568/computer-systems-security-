import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ['websocket'],
  secure: true,
  withCredentials: true,
  autoConnect: false
});

console.log("🔌 Connecting to socket:", import.meta.env.VITE_BACKEND_URL);

export default socket;
