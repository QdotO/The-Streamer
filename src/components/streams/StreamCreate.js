import React from 'react';
import './Streams.css';
import { createStream } from '../../actions';
import { useDispatch } from 'react-redux';
import StreamForm from './StreamForm';

const StreamCreate = (props) => {
    const dispatch = useDispatch();
    const onSubmit = (fieldValues) => {
        console.log('Stream submitted');
        console.log(fieldValues);
        dispatch(createStream(fieldValues));
    };

    return (
        <div>
            <StreamForm
                title='Create a Stream'
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default StreamCreate;
