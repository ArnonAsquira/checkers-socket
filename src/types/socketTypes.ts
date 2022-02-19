interface IGameToken {
  gameToken: string;
}

interface IJoinGameBody {
  userId: string;
  gameToken: string;
}

export type { IGameToken, IJoinGameBody };
