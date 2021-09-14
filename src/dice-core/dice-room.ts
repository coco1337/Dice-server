import { IWebSocket } from "src/events/IWebSocket.type";
import { IRoomUser } from "./dice-game.type";
import { EPacketId } from "src/events/packet-schema/packet-id";
import { IResponsePacket } from "src/events/packet-schema/response-packet.type";
import { EError } from "src/events/packet-schema/error-enum";
type PacketId = typeof EPacketId[keyof typeof EPacketId];

export class DiceRoom {
  private roomUsers: Array<IRoomUser>;
	private roomId: string; 
	private isStart: boolean;

	constructor(roomId: string) {
		this.roomUsers = [];
		this.roomId = roomId;
		this.isStart = false;
	}

	private BroadcastToRoom(id: PacketId, msg: IResponsePacket) {
		const packet = JSON.stringify({id: id, msg: JSON.stringify(msg)});
		for (let user of this.roomUsers) {
			user.socket.send(packet);
		}
	}

	public TryJoin(socket: IWebSocket): boolean {
		if (this.roomUsers.length < 4 && !this.isStart) {
			this.roomUsers.push({socket: socket});
			if (this.roomUsers.length === 2)
				this.StartGame();
			return true;
		}
		
		return false;
	}

	private StartGame() {
		this.BroadcastToRoom(EPacketId.START_GAME_NOTI, {
			id: EPacketId.START_GAME_NOTI,
			tick: Date.now(),
			result: EError.SUCCESS,
		})
	}
}