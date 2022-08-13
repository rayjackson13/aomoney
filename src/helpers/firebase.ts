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

  static getPost = async (user: UserInfo, id: string): Promise<TransactionSheet | undefined> => {
    const ref = FS.doc(this.db, 'sheets', id);

    try {
      const result = await FS.getDoc(ref);
      return result.data() as TransactionSheet;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  static getPosts = async (user: UserInfo): Promise<TransactionSheet[]> => {
    try {
      const q = FS.query(FS.collection(this.db, 'sheets'), FS.where('userId', '==', user.id));
      const snapshot = await FS.getDocs(q);
      return this.snapshotToArray(snapshot) as TransactionSheet[];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  static savePost = async (user: UserInfo, post: TransactionSheet) => {
    const ref = FS.doc(this.db, 'sheets', post.id.toString());

    try {
      await FS.setDoc(ref, { ...post, userId: user.id});
    } catch (e) {
      console.error('Error adding document:', e);
    }
  };

  static deletePost = async (user: UserInfo, postId: string) => {
    const ref = FS.doc(this.db, 'sheets', postId);

    try {
      await FS.deleteDoc(ref);
    } catch (e) {
      console.error('Error deleting document:', e);
    }
  };
}
