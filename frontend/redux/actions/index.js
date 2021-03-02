import firebase from 'firebase';
require('firebase/firestore');
import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USERS_LIKES_STATE_CHANGE,
  CLEAR_DATA,
} from '../constants/index';

export function clearData() {
  return dispatch => {
    dispatch({ type: CLEAR_DATA });
  };
}

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
        let posts = snapshot.docs.map(doc => {
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

export function fetchUserFollowing() {
  return dispatch => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .onSnapshot(snapshot => {
        let following = snapshot.docs.map(doc => {
          const id = doc.id;
          return id;
        });
        dispatch({
          type: USER_FOLLOWING_STATE_CHANGE,
          following,
        });
        // following.forEach(element => dispatch(fetchUsersData(element, true)));
        for (let i = 0; i < following.length; i++) {
          dispatch(fetchUsersData(following[i]), true);
        }
      });
  };
}

export function fetchUsersData(uid, getPosts) {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some(el => el.uid === uid);
    if (!found) {
      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;
            dispatch({
              type: USERS_DATA_STATE_CHANGE,
              user,
            });
          } else {
            console.log('fetchUsersData');
          }
        })
        .catch(e => console.log('fetchUsersData Error', e.message));
    }
    if (getPosts) {
      dispatch(fetchUsersFollowingPosts(uid));
    }
  };
}

export function fetchUsersFollowingPosts(uid) {
  return (
    dispatch,
    getState => {
      firebase
        .firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get()
        .then(snapshot => {
          const uid = snapshot.query.EP.path.segments[1];
          const user = getState().usersState.users.find(el => el.uid === uid);
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data, user };
          });

          posts.forEach(element =>
            dispatch(fetchUsersFollowingLikes(uid, element.id))
          );

          dispatch({
            type: USERS_POSTS_STATE_CHANGE,
            posts,
            uid,
          });
        })
        .catch(e => console.log('fetchUsersFollowingPosts Error', e.message));
    }
  );
}

export function fetchUsersFollowingLikes(uid, postId) {
  return (
    dispatch,
    getState => {
      firebase
        .firestore()
        .collection('posts')
        .doc(uid)
        .collection('userPosts')
        .doc(postId)
        .collection('likes')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot(snapshot => {
          const postId = snapshot.ZE.path.segments[3];
          let currentUserLike = false;
          if (snapshot.exists) {
            currentUserLike = true;
          }
          dispatch({
            type: USERS_LIKES_STATE_CHANGE,
            postId,
            currentUserLike,
          });
        })
        .catch(e => console.log('fetchUsersFollowingLikes Error', e.message));
    }
  );
}
