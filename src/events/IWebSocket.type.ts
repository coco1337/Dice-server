export interface IWebSocket extends WebSocket {
  id: string;
  room: string;
}