import { CHANGE_SEARCHTERM } from './constants'

export const setSearchTerm = (text) => {
  return { type: CHANGE_SEARCHTERM, payload: text }
}
