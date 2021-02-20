import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder='name'
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          placeholder='password'
          onChangeText={password => this.setState({ password })}
        />
        <TextInput
          placeholder='email'
          onChangeText={email => this.setState({ email })}
        />
      </View>
    );
  }
}

export default Register;
