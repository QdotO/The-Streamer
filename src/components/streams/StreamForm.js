import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './Streams.css';
import { createStream } from '../../actions';
import { useDispatch } from 'react-redux';

const renderError = ({ error, touched }) => {
    if (touched && error) {
        return <div className='error'>{error}</div>;
    }
};

const renderInput = ({ input, label, meta }) => {
    const className = `field ${
        meta.error && meta.touched ? 'error-field' : ''
    }`;
    return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} />
            {renderError(meta)}
        </div>
    );
};

const StreamForm = (props) => {
    const { title, onSubmit, handleSubmit } = props;

    return (
        <form
            className='form'
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1>{title}</h1>
            <Field name='title' component={renderInput} label='Enter Title' />
            <Field
                name='description'
                component={renderInput}
                label='Enter Description'
            />
            <button className='submit-btn'> Submit </button>
        </form>
    );
};
const validate = (fieldValues) => {
    let vRes = {}; //validation result
    if (!fieldValues.title) vRes.title = 'You must enter a title';
    if (!fieldValues.description)
        vRes.description = 'You must enter a description';
    return vRes;
};

export default reduxForm({ form: 'streamForm', validate })(StreamForm);
