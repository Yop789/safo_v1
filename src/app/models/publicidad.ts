import { Store } from './store';

export interface Publicidad {
  name: string;
  description: string;
  image: string;
  idStore: any;
  cantidad: number;
  expiration: number;
}
export interface PublicidadResponse {
  name: string;
  description: string;
  image: string;
  idStore: Store;
  cantidad: number;
  expiration: number;
}
