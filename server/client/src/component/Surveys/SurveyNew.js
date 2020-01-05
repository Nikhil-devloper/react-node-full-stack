import React from 'react';
import SurveyForm from './SurveyForm';
import SurveyReviewForm from './SurveyReviewForm.js';
import { reduxForm } from 'redux-form';

class SurveyNew extends React.Component {

    state = {
        showFormReview: false
    }

    renderContent = () => {
        if(this.state.showFormReview) {
            return(
                <SurveyReviewForm
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            )
        }
        return (
            <SurveyForm
                onSurveySubmit={() => this.setState({ showFormReview: true })}
             />
        );
    }

    render() {
        return(
            <div>
                Survey New!
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);