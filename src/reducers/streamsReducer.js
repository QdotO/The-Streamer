import {
    CREATE_STREAM,
    DELETE_STREAM,
    GET_STREAM,
    GET_STREAMS,
    UPDATE_STREAM,
} from '../actions/types';

import _ from 'lodash';

const streamsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case GET_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case UPDATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            let newState = {...state};
            delete newState[action.payload];
            return newState;
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};

export default streamsReducer;
