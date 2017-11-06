import React from 'react'
import { StyleSheet, Text,
        View, Image, TextInput,
        Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { setRegion } from '../actions/RegionActions'

let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE = 6.17511
const LONGITUDE = 106.8650395
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Header extends React.Component {

  // constructor(){
  //   super()
  //   this.state = {
  //     region: {
  //       latitude: LATITUDE,
  //       longitude: LONGITUDE,
  //       latitudeDelta: LATITUDE_DELTA,
  //       longitudeDelta: LONGITUDE_DELTA,
  //     }
  //   }
  // }

  onSearchChange(region){
  //   // ini dikirim ek store harusnya
  //   console.log('ini data on search',detailRegion)
    // this.setState({
    //   region: {
    //     latitude: detailRegion.latitude,
    //     longitude: detailRegion.longitude,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA,
    //   }
    // })
    // console.log('region atas', this.state.region)
    console.log('di klik')
    this.props.setRegion(region)
    // this.props.setRegion(region)
  }

  render() {
    // console.log('state render',this.state.region)
    return (
      <View style={styles.container}>
        <Image 
          style={styles.imgWrapper}
          source={require('../assets/images/logo.png')} />
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
              marginTop: 10,
              height: 40,
              alignItems: 'center',
              paddingLeft: '10%',
              paddingRight: '10%',
            },
            textInput: {
              backgroundColor: 'rgba(0,0,0,0.1)',
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
    zIndex: 999,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  imgWrapper: {
    width: '45%', 
    height: 40,
  }
})

const mapStateToProps = state => {
  return {
    regional: state.HeaderReducer.regional
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setRegion: (detailRegion) =>  dispatch(setRegion(detailRegion))
//     // searchRegion: (detailRegion) =>  dispatch(search_region(detailRegion))
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    setRegion: (region) =>  dispatch(setRegion(region))
  }
} 

// export default connect(null, mapDispatchToProps)(Header)
export default connect(mapStateToProps, mapDispatchToProps)(Header)