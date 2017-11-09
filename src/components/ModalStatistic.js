import React, {Component} from 'react'
import {
    Text, View, Modal,
    StyleSheet, Button,
    Image, TouchableHighlight, ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { setModal } from '../actions/RegionActions'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryLabel } from "victory-native";
import axios from 'axios'

class ModalStatistic extends Component {
  constructor() {
    super ()
    this.state = {
      dataAciidents : []
    }
  }

  componentWillMount (){
    axios.get('http://35.196.134.74/api/accident')
    .then(response => {
      function sortArray(array) {
          return array.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date)
        })
      }

      var sortedArray = sortArray(response.data)

      function clasify(sortedArray) {
        var clasified = []
        var data = []
        var tanggalDiCek = sortedArray[0].date
        var counter = 0
        for (let i = 0; i < sortedArray.length; i++) {

          if (tanggalDiCek === sortedArray[i].date) {
            counter += 1
          } else {
            data.push({ counter: counter, date: tanggalDiCek })
            tanggalDiCek = sortedArray[i].date
            counter = 1
          }
        }

        if (counter >= 1) {
          data.push({ counter: counter, date: tanggalDiCek })
        }
        return data
      }

      this.setState ({
        dataAciidents: clasify(sortedArray),
      })
    })
  }

  render() {
    console.log('=================>', this.state.dataAciidents);
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible === true}
          onRequestClose={ () => {alert('you sure?')}}>
          <View style={{marginTop: 40}}>

            <TouchableHighlight
              style={{paddingTop: 20, paddingLeft: '5%'}}
              onPress={() => {this.props.setModal(false)}}>
              <Image
                source={require('../assets/images/icon-cancel.png')}/>
            </TouchableHighlight>

            <View style={styles.statisticWrap}>
              <ScrollView horizontal={true}>
                <VictoryChart
                  width={100 * this.state.dataAciidents.length}

                  theme={VictoryTheme.material}
                >
                  <VictoryAxis
                    tickValues={Object.keys(this.state.dataAciidents).map(data => {return parseInt(data)})}
                    tickFormat={Object.values(this.state.dataAciidents).map(data => {return data.date.slice(0,10)})}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x/10}%`)}
                  />
                  <VictoryStack
                    style={{
                      data: { width: 15, stroke: "white", strokeWidth: 2 }
                    }}
                    colorScale={["cyan", "gold", "orange", "tomato"]}
                  >
                    <VictoryBar
                      style={{
                        data: { width: 13, strokeWidth: 0, fill: "navy" }
                      }}
                      data={this.state.dataAciidents}
                      x="date"
                      y="counter"
                    />
                  </VictoryStack>
                </VictoryChart>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
// export default List
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgCancel: {
    width: 25,
    height: 25
  },
  statisticWrap: {
    justifyContent: 'center',
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    accidents: state.HeaderReducer.accidents,
    modalVisible: state.HeaderReducer.modalVisible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setModal: (setBoolean) => dispatch(setModal(setBoolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalStatistic)
