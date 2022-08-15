import { initializeApp } from 'firebase/app';
import * as Auth from 'firebase/auth';
import * as FS from 'firebase/firestore';

import { FirebaseConfig } from 'constants/config';
import type { TransactionSheet, UserInfo } from 'types/common';

export class FirebaseHelper {
  private static auth: Auth.Auth;
  private static db: FS.Firestore;

  static initialize = async () => {
    initializeApp(FirebaseConfig);
    this.db = FS.getFirestore();
    this.auth = Auth.getAuth();
  };

  static signIn = async (callback = () => {}): Promise<UserInfo | undefined> => {
    const provider = new Auth.GoogleAuthProvider();

    try {
      const result = await Auth.signInWithPopup(this.auth, provider);
      const { user } = result;
      const credential = Auth.GoogleAuthProvider.credentialFromResult(result);
      if (!credential || !credential.accessToken || !user.email) return;

      await this.postUser({
        accessToken: credential.accessToken,
        email: user.email,
        name: user.displayName || '',
        picture: user.photoURL || '',
        id: user.uid
      });
      callback();
    } catch (e) {
      const error = e as Auth.AuthError;
      const { code, message } = error;
      const credential = Auth.GoogleAuthProvider.credentialFromError(error);
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
    const q = FS.query(
      FS.collection(this.db, 'sheets'),
      FS.where('id', '==', Number(id)),
      FS.where('userId', '==', user.id)
    );

    try {
      const snapshot = await FS.getDocs(q);
      const posts = this.snapshotToArray(snapshot) as TransactionSheet[];
      return posts[0] || undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  static getPosts = async (user: UserInfo): Promise<TransactionSheet[]> => {
    try {
      const q = FS.query(FS.collection(this.db, 'sheets'), FS.where('userId', '==', user.id), FS.orderBy('updatedAt', 'desc'));
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
