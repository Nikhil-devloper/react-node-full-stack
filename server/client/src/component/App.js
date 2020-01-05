import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header.js';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './Surveys/SurveyNew.js';

class App extends React.Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route exact path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
  
const mapStateToProps = (state) => {

    return {

    }
}

export default connect(mapStateToProps, actions)(App);
