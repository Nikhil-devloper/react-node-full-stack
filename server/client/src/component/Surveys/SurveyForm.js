import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields.js';

class SurveyForm extends React.Component {

    renderFields = () => {
        return _.map(formFields, ({label, name }) => {
            return (
                <Field
                    key={name}  
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                />
            )
        });
    }


    render() {
        return (
            <div>
                Survey Form!
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link
                        to='/surveys'
                        className='red btn-flat white-text'
                    >
                            Cancel
                    </Link>

                    <button type='submit' className='teal btn-flat right white-text'>
                        Next
                        <i className='material-icons right'>done</i>
                    </button>

                </form>
            </div>
        )
    }
}

function validate(values) {


    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({name}) => {
        if(!values[name]) {
            errors[name] = 'You must proivde a value.'; //Read Note.
        }
    });

    //note -> this is generic msg we can also uniq msg for all fields. how ?
    // by adding errorMsg property to -> FieldObject.errorMsg then iterate that object.

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm);