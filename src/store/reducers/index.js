import { SEARCH_RESULT } from '../constants'

const initialState = {
    gifs: []
};

function rootReducer(state = Object.assign({},initialState), action) {
    if (action.type === SEARCH_RESULT) {
        return {
             ...state,
             gifs: state.gifs.concat(action.payload)
        }
    }

    return state;
};

export default rootReducer;