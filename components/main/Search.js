import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');

export default function Search() {
  const [users, setUsers] = useState([]);

  const fetchUsers = search => {
    firebase.firestore().collection('users').where('name', '>=', search);
  };

  return (
    <View>
      <Text>Feed</Text>
    </View>
  );
}
