import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    Linking,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { setCenter, setRegion } from '../actions/RegionActions'

class List extends Component {
    
    _onPress (accident) {
        console.log('open link')
        var coord = {
            latitude: accident.lat,
            longitude: accident.lng
        }
        // this.props.methodAnimated(accident)
        this.props.setCenter(coord)
        // Linking.openURL(link)
    }

    render() {
        return (
          <View style={styles.container}>
            <FlatList horizontal
            data={this.props.accidents.accidents}
            renderItem={({item}) => {
                return (
                    <TouchableHighlight onPress={() => {this._onPress(item.accident)} }>
                        <View style={styles.contentWrap}>
                            <Text>{item.accident.title}</Text>
                            <Image
                                style={styles.img}
                                source={{uri: item.accident.imgUrl}} />
                        </View>
                    </TouchableHighlight>
                )
            }}
            />
          </View>

        )
    }
}

// export default List
const styles = StyleSheet.create({
    container: {
        width: '100%',
        // backgroundColor: 'red',
        position: 'absolute', 
        bottom: 58, 
        // paddingBottom: 8, 
        alignItems: 'center'
    },
    contentWrap:{
        backgroundColor: 'red',
        width: 320,
        padding: 10,
        marginLeft: 10,
        marginRight: 10
    },
    img: {
        width: 50,
        height: 50
    },
})

const mapStateToProps = state => {
    // console.log('bawahnya all state', state.HeaderReducer.regional)
    return {
        accidents: state.HeaderReducer.accidents
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRegion: (region) => dispatch(setRegion(region)),
        setCenter: (coord) => dispatch(setCenter(coord)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)

