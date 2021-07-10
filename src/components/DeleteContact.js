import React from 'react';
import { Link } from 'react-router-dom';

const DeleteContact = (props) => {
    const { id, name, email } = props.location.state.contact;

    return (
        <div className='ui main centered'>
            <h2>Are you sure want to delete?</h2>
            <Link to='/'>
                <button className='ui button green left' onClick={() => props.clickHandler(id)} >Yes</button>
            </Link>
            <Link to='/'>
                <button className='ui button red right'>No</button>
            </Link>
        </div>
    );
}

export default DeleteContact;