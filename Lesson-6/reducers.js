import {
  CHANGE_SEARCHTERM,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
 } from './constants'

const initialState1 = {
  searchTerm: ''
}

export const robotsSearch = (state=initialState1, action={}) => {
  switch (action.type) {
    case CHANGE_SEARCHTERM:
      return Object.assign({}, state, {searchTerm: action.payload})
    default:
      return state
  }
}

const initialState2 = {
  robots: [],
  isPending: true
}

export const robotsRequest = (state=initialState2, action={}) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return Object.assign({}, state, {isPending: false})
    case REQUEST_ROBOTS_SUCCESS:
      return Object.assign({}, state, {robots: action.payload, isPending: false})
    case REQUEST_ROBOTS_FAILED:
      return Object.assign({}, state, {error: action.payload})
    default:
      return state
  }
}