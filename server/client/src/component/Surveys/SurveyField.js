import React from 'react';

class SurveyField extends React.Component {
    render() {
        let {input,label,meta : {error,  touched}} = this.props;

        return(
            <div style={{marginBottom: '5px'}}>
                <label>{label}</label>
                <input {...input} style={{marginBottom: '5px'}} />
                <div className='red-text'>
                    { touched && error}
                </div>
            </div>  
        )
    }
}

export default SurveyField;