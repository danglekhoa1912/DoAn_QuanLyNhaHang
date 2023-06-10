export interface ILobby {
  name: string;
  capacity: number;
  describe: string | null;
  status: boolean;
  price: number;
  image: string;
  id: number;
  image360: string;
}

export interface IILoobyBooked {
  date: Date;
  session: number;
}

export interface ITypeParty {
  id: number;
  nameParty: string;
  imageType: string;
}

export interface ILobbyRes {
  id?: number;
  name: string;
  capacity: number;
  describe: string;
  price: number;
  image: File;
  image360: File;
  status?: boolean;
}
