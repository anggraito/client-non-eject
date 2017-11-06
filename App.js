import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import { Provider } from 'react-redux'

import store from './src/store'
import Header from './src/components/Header'
import Mapspage from './src/components/Mapspage'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.bodyWrap}>
          <Header />
          <Mapspage />
        </View>
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
  },
})