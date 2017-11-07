import React, {Component} from 'react'
import {
    Text, View, Button,
    StyleSheet,
    FlatList, Image,
    Linking, Dimensions,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'

let { width: windowWidth, height: windowHeight } = Dimensions.get('window')
const slidePosition = windowHeight - 600

class NewsList extends Component {

    _onPress (link) {
        console.log('open link')
        Linking.openURL(link)
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Back"></Button>
                <Text>List of Accident on This Area</Text>
                <FlatList
                    data={this.props.accidents.accidents}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item}) => {
                        return (
                            <TouchableHighlight onPress={() => {this._onPress(item.accident.linksite)} } id={item._id}>
                                <View style={styles.contentWrap} >
                                    <Image
                                        style={styles.img}
                                        source={{uri: item.accident.imgUrl}} />
                                    <Text style={styles.textNews}>{item.accident.title}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    }}>
                </FlatList>
            </View>
        )
    }
}
// export default List
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    contentWrap:{
        backgroundColor: '#E5E3ED',
        flexDirection: 'row',
        width: windowWidth - 40,
        padding: 10,
        marginLeft: 10,
        marginRight: 10
    },
    img: {
        width: 30,
        height: 50,
        flex: 1,
    },
    textNews: {
        flex: 3,
        paddingLeft: 12,
        maxHeight: 35,
    }
})

const mapStateToProps = state => {
    console.log('state new list', state.HeaderReducer.accidents)
    return {
        accidents: state.HeaderReducer.accidents
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRegion: (region) => dispatch(setRegion(region))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)