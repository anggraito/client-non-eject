import React from 'react'
import { StyleSheet, Text, 
        View, Picker,
        Dimensions, Button, 
        Slider, FlatList,
        TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { setRegion, getDataAPI } from '../actions/RegionActions'

import List from './List'

let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE = 6.17511 //  anggep aja Jakarta 
const LONGITUDE = 106.8650395 // //  anggep aja Jakarta
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Maps extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedRadius: 0,
      // radiusDefider: 0,
      markers: [{  // dummies multiple marker
        title: 'Koi Residence',
        coordinates: {
          latitude: -6.258185,
          longitude: 106.783374,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      },{
        title: 'Jl. Desa Cilember, Bogor',
        coordinates: {
          latitude: -6.6538811,
          longitude: 106.9179212,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        } 
      },{
        title: 'Jl. Kebon Baru Utara',
        coordinates: {
          latitude: -6.233003,
          longitude: 106.862131,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      }]
    }
  }

  componentWillMount() {
    console.log('did mount')
    navigator.geolocation.getCurrentPosition(
      position => {
        // this.setState({
          dataRegion = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        // })
        this.props.setRegion(dataRegion)

      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  changeLabelRadius(radius) {
    // console.log('defider', this.state.radiusDefider)
    this.setState({
      selectedRadius: radius,
      // radiusDefider: this.state.selectedRadius / 1000
    })
    console.log('state radius di change label', this.state.selectedRadius)
  }


  functionAA (region) {
    console.log('aa')
    this.props.setRegion(region)
  }

  getNews () {
    console.log('click')
    var dataFromMaps = {
      lat: this.props.regional.latitude,
      lng: this.props.regional.longitude,
      radius: this.state.selectedRadius / 1000
    }
    this.props.getDataAPI(dataFromMaps)
  }

  render() {
    console.log('data store regional',this.props.regional);
    // console.log('region state ====>', this.state.region)
    return (
      <View style ={styles.container}>
        <MapView
          provider={ PROVIDER_GOOGLE }
          style={ styles.map }
          showsUserLocation={ true }
          showsMyLocationButton={true}
          showsCompass={true}
          region={ this.props.regional }
          showsTraffic={true}
          zoomEnabled={true}
          moveOnMarkerPress={false}
          onRegionChangeComplete={ region => this.functionAA(region) }
          >
          <MapView.Marker draggable
            title={'Drag n Push Me'}
            coordinate={ this.props.regional }
            onPress={e => console.log(e.nativeEvent)}
            onDragEnd={e => console.log('drag end', e.nativeEvent)}
          />
          {this.props.accidents.markers.map((data, idx) => {
            return (
              <MapView.Marker key = {idx}
                title = {data.title}
                coordinate = {data.coordinates}
                image={require('../assets/images/markerpoint5.png')}
              />
            )
          })}
          <MapView.Circle
            center={{latitude: this.props.regional.latitude, longitude: this.props.regional.longitude}}
            radius={this.state.selectedRadius}
            fillColor="rgba(0, 0, 0, 0.2)"
            strokeColor="rgba(0, 0, 0, 0.2)"/>
          </MapView>
        <List />
        <View style={styles.footerWrap}>
          <Slider
            style={styles.slider}
            value={0}
            minimumValue={0}
            maximumValue={10000}
            step={1000}
            onValueChange={(radius) => this.changeLabelRadius(radius)} />
          <Text style={styles.radiusText}> {this.state.selectedRadius / 1000 } KM </Text>
          <Button 
            onPress={() => this.getNews()}
            title="Find"/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: '120%'
  },
  compassStyle:{
    bottom: 50,
    left: 10,
  },
  footerWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute', 
    bottom: 15, 
    backgroundColor: 'rgba(255,255,255, 0.9)',
    width: '100%',
    paddingBottom: 8, 
    alignItems: 'center'
  },
  slider: {
    width: 300,
  }
})

const mapStateToProps = state => {
  console.log('bawahnya all state', state.HeaderReducer.regional)
  return {
    regional: state.HeaderReducer.regional,
    accidents: state.HeaderReducer.accidents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRegion: (region) =>  dispatch(setRegion(region)),
    getDataAPI: (dataFromMaps) => dispatch(getDataAPI(dataFromMaps))

  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Maps)

// onRegionChangeComplete={ region => this.setState({
//   region:{
//     latitude: this.props.regional.latitude,
//     longitude: this.props.regional.longitude,
//     latitudeDelta: this.props.regional.latitudeDelta,
//     longitudeDelta: this.props.regional.longitudeDelta
//   }
// })}



// onDragEnd={(e) => this.setState({ region: e.nativeEvent.coordinate })}