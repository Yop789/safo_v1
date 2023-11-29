import { User } from './user';

export interface Store {
  _id?: string;
  name: string;
  description: string;
  idUser: string;
  image: string;
  category: string;
  qualification?: Qualification;
  log: number;
  lat: number;
}
export interface Qualification {
  idUser: User;
  qualification: number;
  comment: string;
}
