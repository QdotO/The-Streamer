import history from '../history';

import {
    SIGN_IN,
    SIGN_OUT,
    GET_STREAMS,
    GET_STREAM,
    CREATE_STREAM,
    UPDATE_STREAM,
    DELETE_STREAM,
} from '../actions/types';

import streams from '../apis/streams';

const signIn = (id) => {
    return { type: SIGN_IN, payload: id };
};
const signOut = (id) => {
    return { type: SIGN_OUT, payload: id };
};

const getStreams = () => async (dispatch) => {
    const response = await streams.get('/streams');
    console.log('Streams response: ', response);
    dispatch({ type: GET_STREAMS, payload: response.data });
};

const getStream = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: GET_STREAM, payload: response.data });
};

const createStream = (streamInfo) => async (dispatch, getState) => {
    console.log('Creating stream: ', streamInfo);
    const {
        auth: { userId },
    } = getState();
    console.log('UserId', userId);
    const response = await streams.post('/streams', { ...streamInfo, userId });
    console.log("Dispatching CREATE STREAM");
    dispatch({ type: CREATE_STREAM, payload: response.data });
    //Navigate the user back to root route "/"
    history.push('/');
};

//PATCH REQUEST - Update SOME of the values on an object
//PUT REQUEST - Update ALL of the values on an object
const updateStream = (id, streamInfo) => async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, streamInfo);
    dispatch({
        type: UPDATE_STREAM,
        payload: response.data,
    });
    history.push('/');
};

const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`/streams/${id}`);
    dispatch({
        type: DELETE_STREAM,
        payload: id,
    });
    history.push('/');
};

export {
    signIn,
    signOut,
    getStream,
    getStreams,
    createStream,
    updateStream,
    deleteStream,
};
