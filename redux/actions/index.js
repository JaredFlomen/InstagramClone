import firebase from 'firebase';
require('firebase/firestore');
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from '../constants/index';

export function fetchUser() {
  return dispatch => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log('Redux Actions/Index Error');
        }
      });
  };
}

export function fetchUserPosts() {
  return dispatch => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then(snapshot => {
        const posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: USER_POSTS_STATE_CHANGE,
          posts,
        });
      });
  };
}
