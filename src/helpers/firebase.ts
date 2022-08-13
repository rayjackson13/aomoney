import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, type AuthError } from 'firebase/auth';
import * as FS from 'firebase/firestore';

import type { TransactionSheet, UserInfo } from '../types/common';
import { FirebaseConfig } from '../constants/config';

export class FirebaseHelper {
  static appConfig: FirebaseApp;
  static db: FS.Firestore;

  static initialize = () => {
    this.appConfig = initializeApp(FirebaseConfig);
    this.db = FS.getFirestore(this.appConfig);
  };

  static signIn = async (callback = () => {}): Promise<UserInfo | undefined> => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential || !credential.accessToken || !user.email) return;

      await this.postUser({
        accessToken: credential.accessToken,
        email: user.email,
        name: user.displayName || '',
        avatar: user.photoURL || '',
        id: user.uid
      });
      callback();
    } catch (e) {
      const error = e as AuthError;
      const { code, message } = error;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(code, message, credential);
    }
  };

  private static postUser = async (userInfo: UserInfo) => {
    try {
      await fetch('api/auth', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.error('There was a problem with saving this user.');
    }
  };

  static saveUser = async (userInfo: UserInfo) => {
    const ref = FS.doc(this.db, 'users', userInfo.id);

    try {
      await FS.setDoc(ref, userInfo);
    } catch (e) {
      console.error('Error adding document:', e);
    }
  };

  static findUser = async (sessionId: string): Promise<UserInfo | undefined> => {
    try {
      const q = FS.query(FS.collection(this.db, "users"), FS.where('accessToken', '==', sessionId));
      const snapshot = await FS.getDocs(q);
      const result = this.snapshotToArray(snapshot);
      const user = result[0];

      return user as UserInfo;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  private static snapshotToArray = (snapshot: FS.QuerySnapshot): FS.DocumentData[] => {
    const array: FS.DocumentData[] = [];
    snapshot.forEach((doc) => {
      array.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return array;
  };

  static savePost = async (post: TransactionSheet) => {

  };
}
