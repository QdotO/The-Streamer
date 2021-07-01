import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getStream } from '../../actions/index';

const StreamShow = (props) => {
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
    const streamToShow = streams[id];
    if (streamToShow) {
        const { title, description, url="" } = streamToShow;
        return (
            <div>
                <StreamVideo src={url}/>
                <StreamContent>
                    <StreamTitle>{title}</StreamTitle>
                    <StreamDescription>{description}</StreamDescription>
                </StreamContent>
            </div>
        );
    }
    return <div>Loading...</div>;
};

export default StreamShow;


const StreamContent = styled.div`
    padding: 1rem;
`;
const StreamTitle = styled.p`
    font-size: 2rem;    
    font-weight: 700;
`;

const StreamDescription = styled.p`
    font-weight: 700;
`;

const StreamVideo = styled.video`
    width: 80%;
    margin: 1rem auto;
`;
