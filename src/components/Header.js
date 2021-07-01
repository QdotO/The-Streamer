import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className='header'>
            <Link to='/' className='item'>
                {' '}
                The Streamer{' '}
            </Link>
            <div className='right menu'>
                <Link to='/' className='item'>
                    All Streams
                </Link>
            </div>
            <GoogleAuth />
        </div>
    );
};

export default Header;
