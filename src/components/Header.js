import React from 'react'
import { StyleSheet, Text,
        View, Image, TextInput,
        Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { setRegion, getDataAPI, setLoading } from '../actions/RegionActions'

let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE = 6.17511
const LONGITUDE = 106.8650395
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Header extends React.Component {

  onSearchChange(region){
    console.log('di klik')
    this.props.setRegion(region)
    this.getNewsInSearch()
  }

  changeLoading () {
    this.props.setLoading(!this.props.loading)
  }

  getNewsInSearch() {
    this.changeLoading()
    console.log('klik list search')
    var dataFromMaps = {
      lat: this.props.regional.latitude,
      lng: this.props.regional.longitude,
      radius: this.props.selectedRadius / 1000
    }
    this.props.getDataAPI(dataFromMaps)
  }

  render() {
    // console.log('state render',this.state.region)
    return (
      <View style={styles.container}>
        <View style={styles.imgWrapper}>
          <Image 
              style={styles.imgItem}
              source={require('../assets/images/accidentifier.png')} />
        </View>
        <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2}
          autoFocus={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            const region = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
            this.onSearchChange(region)
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              width: '100%',
              paddingTop: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              marginTop: 0,
              height: 40,
              alignItems: 'center',
              paddingLeft: '10%',
              paddingRight: '10%',
            },
            textInput: {
              backgroundColor: 'rgba(229,227,237,0.8)',
              height: 30,
              color: '#5d5d5d',
              fontSize: 16,
              marginLeft: 0,
              marginRight: 0,
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
          currentLocation={false}
          query={{
            key: 'AIzaSyCcMjuDmtXJLhqQHOu--Ff5ZoP10GTg1E4',
            language: 'en', // language of the results
            types: 'geocode', // default: 'geocode'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255, 0.9)',
    position: 'absolute',
    top:0,
    width: '100%',
    zIndex: 99,
    paddingTop: 15,
    paddingBottom: 22,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  imgWrapper: {
    flex: 1,
    width: 205,
    height: 45,
    alignItems: 'center',
  },
  imgItem:{
    width: '100%',
    height: '80%'
  }
})

const mapStateToProps = state => {
  return {
    regional: state.HeaderReducer.regional,
    selectedRadius: state.HeaderReducer.selectedRadius,
    loading: state.HeaderReducer.loading
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setRegion: (region) =>  dispatch(setRegion(region)),
    getDataAPI: (dataFromMaps) => dispatch(getDataAPI(dataFromMaps)),
    setLoading: (loading) => dispatch(setLoading(loading))
  }
} 

// export default connect(null, mapDispatchToProps)(Header)
export default connect(mapStateToProps, mapDispatchToProps)(Header)