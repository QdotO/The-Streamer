import React, { useEffect } from 'react';
import { getStreams } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const StreamList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStreams());
    }, []);

    const streams = useSelector((state) => Object.values(state.streams)); //Object.values converts obj to array
    const currentUserId = useSelector((state) => state.auth.userId);
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    console.log('Streams in StreamList: ', streams);
    console.log('Current UserId in StreamList: ', currentUserId);
    const getActions = (userId, id) => {
        if (userId === currentUserId) {
            return (
                <div className='stream-action-container'>
                    <Link
                        to={`/streams/edit/${id}`}
                        className='stream-action-edit'
                    >
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${id}`} className='stream-action-delete'>
                        Delete
                    </Link>
                </div>
            );
        }
    };

    const renderList = () => {
        if (streams) {
            return (
                <ul className='stream-container'>
                    {streams.map((stream) => (
                        <li className='stream' key={stream.id}>
                            <div className='stream-content'>
                                <Link to={`/streams/${stream.id}`}>{`${stream.title}`}</Link>
                                <div>{stream.description}</div>
                            </div>
                            {getActions(stream.userId, stream.id)}
                        </li>
                    ))}
                </ul>
            );
        }
    };

    const renderCreate = () => {
        if (isSignedIn)
            return (
                <div className='stream-create-container'>
                    <Link className='stream-create-btn' to='/streams/new'>
                        Create Stream
                    </Link>
                </div>
            );
    };
    return (
        <div>
            <h1>Streams</h1>
            {renderList()}
            {renderCreate()}
        </div>
    );
};

export default StreamList;
