import { SEARCH_RESULT } from '../constants'
export function searchResult(payload) {
    return { type: SEARCH_RESULT, payload }
};