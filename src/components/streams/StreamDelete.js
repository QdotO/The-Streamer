import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStream, deleteStream } from '../../actions/index';
import history from '../../history';
import Modal from '../Modal';

const StreamDelete = (props) => {
    const {
        match: {
            params: { id },
        },
    } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStream(id));
    }, [id, dispatch]);
    const streams = useSelector((state) => state.streams);
    const streamToEdit = streams[id];
    if (streamToEdit) {
        const { title } = streamToEdit;
        return  <Modal
                onDismiss={() => history.push('/')}
                header={'Delete Stream'}
                content={`Are you sure you want to delete the ${title} stream?`}
                actions={
                    {
                        primaryAction: {text:'Delete', action: ()=> { dispatch(deleteStream(id)) } },
                        secondaryAction: {text: 'Cancel', action: ()=>{ history.push('/')}} 
                    }
                }
                />
    }
    return <div>Loading...</div>;
};

export default StreamDelete;
