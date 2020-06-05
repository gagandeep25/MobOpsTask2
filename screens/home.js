import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function(tx, res) {
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_age INT(2))',
              [],
            );
          }
        },
      );
    });
  }
  render() {
    return (
      <View style={styles.homeContainer}>
        <View style={styles.registerButton}>
          <Button
            title="Register"
            onPress={() => this.props.navigation.navigate('Registration')}
          />
        </View>
        <View style={styles.savedUsersButton}>
          <Button
            title="Saved Users"
            onPress={() => this.props.navigation.navigate('SavedScreen')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    paddingBottom: 15,
  },
  savedUsersButton: {
    paddingTop: 15,
  },
});
