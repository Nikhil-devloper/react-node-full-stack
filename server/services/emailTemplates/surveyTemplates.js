const keys = require('../../config/keys');
console.log(`${keys.redirectDomain}/api/surveys/thanks`);
 
module.exports = survey => {
    return `<html>
                <body>
                    <div style='text-align: center'>
                        <h3> I'd like your input </h3>
                            <p> Please Answer the following </p>
                            <p> ${survey.body} </p>
                            <div> <a href='${keys.redirectDomain}/api/surveys/${survey.id}/yes'> Yes </a> </div>
                            <div>  <a href='${keys.redirectDomain}/api/surveys/${survey.id}/no'> No </a>  </div>
                        </div>
                    </div>
    </html>`;
}