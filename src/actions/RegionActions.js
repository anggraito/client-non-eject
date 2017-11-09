import axios from 'axios'

export const getDataAPI = (dataFromMaps) => {
  return (dispatch, getState) => {
    // const url = 'http://35.196.134.74/api/accident' //har
    const url = 'http://35.185.184.137/api/accident' //beg
    var dataFrontEnd = {
      lat: dataFromMaps.lat,
      lng: dataFromMaps.lng,
      radius: dataFromMaps.radius
    }
    axios.post(url, dataFrontEnd).then(({ data }) => {
      dispatch(setDataAccidents(data))
      dispatch(setLoading(false))
    })
    .catch(err => { console.log('meesage error eror erro', err)})
  }
}

export const setDataAccidents = (data) => {
  return {
    type: 'SET_DATA_ACCIDENTS',
    payload: { data }
  }
}

export const search_region = (detailRegion) => {
  console.log('ini di action-----> ',detailRegion)
  return {
    type: 'SEARCH_REGION',
    payload: {
      detailRegion
    }
  }
}

export const setRegion = (region) => {
  console.log('ini di action setRegion -----> ',region)
  return {
    type: 'SET_REGION',
    payload: {
      region
    }
  }
}

export const setRadius = (radius) => {
  console.log('ini action setRadius ---->', radius)
  return {
    type: 'SET_RADIUS',
    payload: {
      radius
    }
  }
}

export const setLoading = (loading) => {
 return {
   type: 'SET_LOADING',
   payload: {
     loading
   }
 }
}

export const setModal = (setBoolean) => {
  console.log('------(modal) ---->', setBoolean)
  return {
    type: 'SET_MODAL',
    payload: {
      setBoolean
    }
  }
}
