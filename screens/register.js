import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {TextInput} from 'react-native-gesture-handler';

var db = openDatabase({name: 'UserDatabase.db'});

export default class Registraion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_age: '',
    };
  }
  register_user = () => {
    var that = this;
    const {user_name} = this.state;
    const {user_age} = this.state;
    var age = parseFloat(user_age, 10);
    if (user_name) {
      if (Number.isInteger(age) && age > 1 && age < 120) {
        db.transaction(function(txn) {
          txn.executeSql(
            'INSERT INTO table_user (user_name, user_age) VALUES (?,?)',
            [user_name, user_age],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert('Success', 'Registered Successfully', [
                  {
                    text: 'OK',
                    onPress: () => that.props.navigation.navigate('Home'),
                  },
                ]);
              }
            },
          );
        });
      } else {
        Alert.alert('Note', 'Enter a valid age');
      }
    } else {
      Alert.alert('Note', 'Enter your name');
    }
  };

  render() {
    return (
      <View style={styles.registerContainer}>
        <TextInput
          placeholder="Enter Name"
          onChangeText={user_name => this.setState({user_name})}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Age"
          onChangeText={user_age => this.setState({user_age})}
          style={styles.input}
          numeric
          keyboardType={'numeric'}
        />
        <View style={styles.saveButton}>
          <Button title="Save" onPress={this.register_user.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    padding: 20,
  },
  input: {
    fontSize: 24,
  },
});
