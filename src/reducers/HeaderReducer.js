import { 
  Dimensions 
} from 'react-native'

let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
// const LATITUDE = -6.17511 //  anggep aja Jakarta 
// const LONGITUDE = 106.8650395 // //  anggep aja Jakarta
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


const defaultState = {
  regional: {
    latitude: -6.17511,
    longitude: 106.8650395,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  },
  accidents: {
    accidents: [
      {
      "accident": {
        "_id": "59feabd8dd88453ae6ec16d8",
        "updatedAt": "2017-11-05T06:12:40.241Z",
        "createdAt": "2017-11-05T06:12:40.241Z",
        "linksite": "http://www.tribunnews.com/seleb/2017/09/21/tyas-mirasih-ngomel-ngomel-setelah-ditabrak-sepeda-motor",
        "title": "Tyas Mirasih Ngomel-ngomel setelah Ditabrak Sepeda Motor",
        "imgUrl": "http://cdn2.tstatic.net/tribunnews/foto/bank/images/tyas-mirasih-saat-ditemui-di-kawasan-tendean_20170327_190705.jpg",
        "addressDetected": "   JAKARTA",
        "lat": -6.17511,
        "lng": 106.8650395,
        "street": null,
        "village": null,
        "district": null,
        "__v": 0
      },
      "dataMaps": {
        "distanceValue": 0,
        "distance": "1 m",
        "origin": "13538-13598 Hesby St, Sherman Oaks, CA 91423, USA",
        "destination": "13538-13598 Hesby St, Sherman Oaks, CA 91423, USA"
      }
    }
    ],
    markers: [
      {
        title: "Tyas Mirasih Ngomel-ngomel setelah Ditabrak Sepeda Motor",
        coordinates: {
          latitude: -6.17511,
          longitude: 106.8650395,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      }
    ]
  },
  centerMaps: {
    latitude: -6.17511,
    longitude: 106.8650395,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }
  // markers: []
}

const HeaderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEARCH_REGION' :
      return { ...state, regional: action.payload.detailRegion}
    case 'SET_REGION' :
      console.log('set region', action.payload.region)
      return { ...state, regional: action.payload.region}
    case 'SET_CENTER' :
      console.log('set center', action.payload.coord)
      var center = {
        latitude: action.payload.coord.latitude,
        longitude: action.payload.coord.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      return { ...state, centerMaps: center}
    case 'SET_DATA_ACCIDENTS' :
      console.log('sampai di reducers', action.payload.data)
      
      var markers = []
      action.payload.data.forEach(data => {
        var marker = {
          title: data.dataMaps.destination,
          coordinates: {
            latitude: data.accident.lat,
            longitude: data.accident.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        }
        markers.push(marker)  
      })

      accidentsData = {
        accidents: action.payload.data,
        markers: markers
      }

      return { ...state, accidents: accidentsData}
    default:
      return state
  }
}

export default HeaderReducer