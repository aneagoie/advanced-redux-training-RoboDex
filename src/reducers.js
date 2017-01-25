import {
  CHANGE_SEARCHTERM1,
  CHANGE_SEARCHTERM2,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
 } from './constants'
import { createSelector } from 'reselect'

//Using Reselct to optimize performance
const requestRobotsSelector = state => state.robotsRequest.robots
const searchTerm1Selector = state => state.robotsSearch.searchTerm1

export const filterRobotsSelector = createSelector(
  [requestRobotsSelector, searchTerm1Selector],
  (robots, search) => {
    console.log('filtering')
    return robots.filter(
      robot =>
        robot.name.toLowerCase().includes(search.toLowerCase())
    )
  }
)

const initialState1 = {
  searchTerm1: '',
  searchTerm2: ''
}



export const robotsSearch = (state=initialState1, action={}) => {
  switch (action.type) {
    case CHANGE_SEARCHTERM1:
      return {...state, searchTerm1: action.payload}
    case CHANGE_SEARCHTERM2:
      return {...state, searchTerm2: action.payload}
    default:
      return state
  }
}

const initialState2 = {
  robots: [],
  isPending: false
}

export const robotsRequest = (state=initialState2, action={}) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return {...state, isPending: false}
    case REQUEST_ROBOTS_SUCCESS:
      return {...state, robots: action.payload}
    case REQUEST_ROBOTS_FAILED:
      return {...state, error: action.payload}
    default:
      return state
  }
}