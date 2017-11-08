import React, {Component} from 'react'
import {
    Text, View, Modal,
    StyleSheet, Button,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'


class ModalStatistic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={ () => {alert('you sure?')}}>
            <View style={{marginTop: 20}}>
              <Text>Modal</Text>
              <TouchableHighlight onPress={() => {
                  this.setModalStatistic(!this.state.modalVisible)
                  }}>
                  <Text>Hide Modal</Text>
              </TouchableHighlight>
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
    marginTop: 30,
  }
})

const mapStateToProps = state => {
  console.log('state new list', state.HeaderReducer.accidents)
  return {
    accidents: state.HeaderReducer.accidents
  }
}


export default connect(mapStateToProps, null)(ModalStatistic)