import React, {Component} from 'react'
import {
    Text, View, Modal,
    StyleSheet, Button,
    Image, TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'

import { setModal } from '../actions/RegionActions'

class ModalStatistic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible === true}
          onRequestClose={ () => {alert('you sure?')}}>
          <View style={{marginTop: 20}}>
            
            
            
            
            
            
            
            <TouchableHighlight
              onPress={() => {this.props.setModal(false)}}>
              <Image 
                source={require('../assets/images/icon-cancel.png')}/>
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
