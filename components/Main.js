import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchUser } from '../redux/actions/index';
import FeedScreen from './main/Feed';

const Tab = createBottomTabNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    // const { currentUser } = this.props;
    // console.log(currentUser);
    // if (!currentUser) return <View></View>;
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Feed'
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = store => ({ currentUser: store.userState.currentUser });

const mapDispatchProps = dispatch =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
