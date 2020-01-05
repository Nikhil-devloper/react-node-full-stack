import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields.js';
import { Field } from 'redux-form';
import SurveyField from './SurveyField.js';
import formValues from './formFields';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../../actions/index';

class SurveyReviewForm extends React.Component {

    render() {

        //console.log('formValues',this.props.formValues);

        const reviewFields = _.map(formFields, field => {

            return (
                <div key={field.label}>
                    <label> {field.label} </label>
                    <div>
                        {this.props.formValues[field.name]}
                    </div>
                </div>
            )
        });

        return (
            <div>
                SurveyReviewForm !@
                    {reviewFields}
                <button
                    className={'yellow darken-3 btn-flat white-text'}
                    onClick={this.props.onCancel}
                >
                    Back
                </button>

                <button
                    className={'green btn-flat right btn-flat white-text'}
                    onClick={() => this.props.submitSurvey(this.props.formValues,this.props.history)}
                >
                    Send Survey
                    <i className='material-icons right'>email</i>
                </button>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps,actions)(withRouter(SurveyReviewForm));