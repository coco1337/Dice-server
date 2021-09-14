let i: number = 0;
export const EPacketId = {
  NONE: i++,
  CREATE_ROOM_REQ: i++,
  CREATE_ROOM_RES: i++,
  JOIN_RANDOM_ROOM_REQ: i++,
  PLAYER_JOIN_NOTI: i++,
  START_GAME_NOTI: i++,
  ROLL_DICE_REQ: i++,
  ROLL_DICE_RES: i++,
  CHANGE_TURN_NOTI: i++,
  MAX: i++,
};