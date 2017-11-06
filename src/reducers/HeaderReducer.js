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
    accidents: [],
    markers: []
  },
  // markers: []
}

const HeaderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEARCH_REGION' :
      return { ...state, regional: action.payload.detailRegion}
    case 'SET_REGION' :
      return { ...state, regional: action.payload.region}
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