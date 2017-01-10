import CHANGE_SEARCHTERM from './constants'

export const setSearchTerm = (text) =>  ({ type: CHANGE_SEARCHTERM, payload: text })
