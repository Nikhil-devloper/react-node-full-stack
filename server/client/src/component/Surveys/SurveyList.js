import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends React.Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }

    
    renderSurvey() {
       return this.props.surveys.reverse().map(survey => {
            return(
                <div className="card " key={survey._id}>
                <div className="card-content ">
            <span className="card-title">{survey.title}</span>
                <p>{survey.body}</p>
                <p className='right'>
                    Sent on: {new Date(survey.dateSent).toLocaleString()}
                </p>
                </div>
                <div className="card-action">
                    <a href="#">Yes {survey.yes}</a>
                    <a href="#">No {survey.no}</a>
                </div>
            </div>
            );
        });
       
    }


    render() {

        console.log('surveyList', this.props.surveys);

        return (
            <div>
                Survey List.
                {this.renderSurvey()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { surveys: state.surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);