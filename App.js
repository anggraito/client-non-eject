import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import store from './src/store'
import Header from './src/components/Header'
import MapsScreen from './src/components/Mapspage'
import NewsListScreen from './src/components/NewsList'

const BasicApp = StackNavigator({
  Headerpage: {screen: Header},
  Mapspage: {screen: MapsScreen},
  NewsList: {screen: NewsListScreen}
}, {
 initialRouteName :'Mapspage',
 headerMode: 'none'
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BasicApp />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  bodyWrap: {
    flex: 1,
    backgroundColor: '#fff',
    top: 25,
    flexDirection: 'column',
  }
})

// <View style={styles.bodyWrap}>