import { CHANGE_SEARCHTERM } from './constants'

const initialState = {
  searchTerm: ''
}

const robotsSearch = (state=initialState, action={}) => {
  switch (action.type) {
    case CHANGE_SEARCHTERM:
      return Object.assign({}, state, {searchTerm: action.payload})
    default:
      return state
  }
}

export default robotsSearch;