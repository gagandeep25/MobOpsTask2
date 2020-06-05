import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

export default class SavedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }

  ListEmpty = () => {
    return (
      <View style={styles.emptyComponent}>
        <Text style={styles.emptyMessage}>No records</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View key={item.user_id} style={styles.item}>
              <Text style={styles.text}>Name: {item.user_name}</Text>
              <Text style={styles.text}>Age: {item.user_age} </Text>
            </View>
          )}
          ListEmptyComponent={this.ListEmpty}
          contentContainerStyle={{height: '100%'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  savedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'pink',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    fontSize: 24,
  },
  emptyComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessage: {
    fontSize: 20,
    textAlignVertical: 'center',
  },
});
