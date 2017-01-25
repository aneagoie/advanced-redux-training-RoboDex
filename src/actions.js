import {
  CHANGE_SEARCHTERM1,
  CHANGE_SEARCHTERM2,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
 } from './constants'

import { apiCall } from './api/api'

export const setSearchTerm1 = (text) => ({ type: CHANGE_SEARCHTERM1, payload: text })
export const setSearchTerm2 = (text) => ({ type: CHANGE_SEARCHTERM2, payload: text })

export const requestRobots = () => {
  return (dispatch) => {
    dispatch({ type: REQUEST_ROBOTS_PENDING })
    apiCall('https://jsonplaceholder.typicode.com/users')
      .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
      .catch(err => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: err }))
  }
}