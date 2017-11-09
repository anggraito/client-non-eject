import React, {Component} from 'react'
import {
    Text, View, Modal,
    StyleSheet, Button,
    FlatList, Image,
    Linking, Dimensions,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'

import { setModal } from '../actions/RegionActions'
import ModalStatistic from './ModalStatistic'
let {width: windowWidth, height: windowHeight} = Dimensions.get('window')
const slidePosition = windowHeight - 600
const widthBox = windowWidth - 200
const half = windowHeight - 120

class NewsList extends Component {

  _onPress(link) {
    console.log('open link')
    Linking.openURL(link)
  }

  _listData () {
    if(this.props.accidents.accidents.length === 0) {
      return (
        <View style={styles.containerData}>
          <Image source={require('../assets/images/map-transparant.png')} />
          <Text style={styles.noData}>Select your location, please</Text>
        </View>
      )
    }
  }

  render() {
    const {goBack} = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.combined}>
            <TouchableOpacity style={styles.buttonBack} onPress={() => goBack()}>
              <Image
                style={styles.imgBack}
                source={require('../assets/images/button-back.png')}/>
              <Text style={styles.titleBack}>Back</Text>
            </TouchableOpacity>
            <View style={styles.titleArea}>
              <Text style={styles.titleFont}>List of Accident on This Area</Text>
            </View>
        </View>
        {this._listData() }
        <FlatList
          data={this.props.accidents.accidents}
          keyExtractor={(item, index) => item._id}
          renderItem={({item}) => {
          return (
            <TouchableHighlight
              onPress={() => {
                this._onPress(item.accident.linksite)
              }}
              key={item._id}>
              <View style={styles.contentWrap} key={item._id}>
                <Image
                  style={styles.img}
                  source={{
                    uri: item.accident.imgUrl
                  }}/>
                <Text style={styles.textNews}>{item.accident.title}</Text>
              </View>
            </TouchableHighlight>
          )
        }}></FlatList>
        <ModalStatistic />
        <TouchableHighlight
          style={styles.statistikButton}
          onPress={() => this.props.setModal(true)}>
          <Text style={styles.textStatis}>Show Statistic</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
// export default List
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  containerData: {
    alignItems: 'center',
    backgroundColor: '#1B3E66',
    paddingTop: '48%',
    paddingBottom: '48%'
  },
  contentWrap: {
    backgroundColor: 'rgba(27, 62, 102, 0.8)',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#fff',
    width: '100%',
    padding: '100%'
  },
  img: {
    width: 30,
    height: 50,
    flex: 1
  },
  textNews: {
    flex: 3,
    paddingLeft: 12,
    color: '#E8E7EF'
  },
  buttonBack: {
    flex: 1
  },
  titleArea: {
    alignItems: 'center',
    flex: 4
  },
  titleFont: {
    color: '#1B3E66',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  combined: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: '4%',
    paddingRight: '4%'
  },
  titleBack: {
    color: '#1B3E66',
    fontSize: 14
  },
  statistikButton: {
    backgroundColor: '#E8E7EF', //E8E7EF
    padding: '3%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.9,
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  textStatis: {
    color: '#FF972E',
    fontSize: 16,
    fontWeight: 'bold'
  },
  noData: {
    fontSize: 18,
    color: '#E8E7EF',
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#1B3E66',
    padding: '10%',
  }
})

const mapStateToProps = state => {
  console.log('state accident', state.HeaderReducer.accidents)
  return {
    accidents: state.HeaderReducer.accidents, 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setModal: (setBoolean) => dispatch(setModal(setBoolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)
