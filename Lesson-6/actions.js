import {
  CHANGE_SEARCHTERM,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
 } from './constants'

import { apiCall } from './api/api'

export const setSearchTerm = (text) => ({ type: CHANGE_SEARCHTERM, payload: text })

export const requestRobots = (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  apiCall('https://jsonplaceholder.typicode.com/users')
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: err }))
}