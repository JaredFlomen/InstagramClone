import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

function Profile(props) {
  const { currentUser, posts } = props;
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{currentUser ? currentUser.name : 'Name Not Found'}</Text>
        <Text>{currentUser ? currentUser.email : 'Email Not Found'}</Text>
      </View>
      <View style={styles.containerPost}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const mapStateToProps = store => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerPost: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
});
