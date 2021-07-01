import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStream, updateStream } from '../../actions/index';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {
    const {
        match: {
            params: { id },
        },
    } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStream(id));
    }, [id]);
    const streams = useSelector((state) => state.streams);
    const streamToEdit = streams[id];
    const onSubmit = (fieldValues) => {
        dispatch(updateStream(id, fieldValues));
    };
    if (streamToEdit) {
        const { title, description } = streamToEdit;
        return (
            <StreamForm
                title="Edit a Stream"
                initialValues={ {title , description} }
                onSubmit={onSubmit}
            />
        );
    }
    return <div>Loading...</div>;
};

export default StreamEdit;
