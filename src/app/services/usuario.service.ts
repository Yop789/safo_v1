import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from '../models/user';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  //variables
  private storeRef = firebase.app().storage().ref();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private afAuth: AngularFireAuth
  ) {}

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  loginWi() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  addUser(user: User) {
    let userRef = collection(this.firestore, 'User');
    return addDoc(userRef, user);
  }
  async addImages(name: string, imgBase64: any) {
    try {
      let result = await this.storeRef
        .child(`user/${name}`)
        .putString(imgBase64, 'data_url');
      return await result.ref.getDownloadURL();
    } catch (error) {
      return await null;
    }
  }
  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
      // El inicio de sesión fue exitoso, puedes devolver el usuario o hacer algo más con userCredential.user si es necesario
    } catch (error) {
      // Si hay un error durante el inicio de sesión, puedes manejarlo aquí
      console.error('Error durante el inicio de sesión:', error);
      throw error; // Puedes relanzar el error para que sea manejado por el código que llamó a este método
    }
  }
  loginByGoogle() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }
}
