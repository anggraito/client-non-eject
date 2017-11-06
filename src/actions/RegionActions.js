import axios from 'axios'

export const getDataAPI = (dataFromMaps) => {
  return (dispatch, getState) => {
    const url = 'http://35.185.184.137/api/accident'
    // const url = 'http://localhost:3000/api/accident'
    var dataFrontEnd = {
      lat: dataFromMaps.lat,
      lng: dataFromMaps.lng,
      radius: dataFromMaps.radius
    }
    axios.post(url, dataFrontEnd).then(({ data }) => {
      dispatch(setDataAccidents(data))
    })
    .catch(err => { console.log('meesage error eror erro', err)})

    // return fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: dataFrontEnd
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log('ini data response', responseJson) 
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

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