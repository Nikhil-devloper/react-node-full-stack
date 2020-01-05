const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({subject, recepients},  content) {
        
        super();

        this.sgApi = sendgrid(keys.sendGridKey);

        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;

        this.body = new helper.Content('text/html',content);
        this.recipients = this.formatAddresses(recepients); //User Define function
        this.addContent(this.body); // built in function

        this.addClickTracking();  //User define for there code

        this.addRecipients(); // User define for there work


    }

    formatAddresses(recipients){
        return recipients.map(({email}) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {

        const trackingSetting = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);
        trackingSetting.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSetting); 
    }

    addRecipients() {

        const personalize = new helper.Personalization();
        this.recipients.forEach(recipients => {
            personalize.addTo(recipients);  //here recepient is not string hwich contain email,
                                            // it is new helper.Email Object
        });
        this.addPersonalization(personalize);
    }


    async send() {        

        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        
        const resp = await this.sgApi.API(request);
        return resp;
    }
    
}

module.exports = Mailer;