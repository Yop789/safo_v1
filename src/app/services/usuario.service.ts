import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private auth: Auth,private firestore:Firestore) {}

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  loginWi() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
