import { User } from './user';
export interface DataC {
  _id?: string;
  idUser: User;
  qualification: number;
  comment?: string;
}
