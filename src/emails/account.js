const sgMail = require('@sendgrid/mail')
const sendGridApiKey='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'


sgMail.setApiKey(sendGridApiKey)

sgMail.send({
   to: 'namratasingh2911@gmail.com',
   from : 'namratasingh2911@gmail.com',
   subject:'This is my first creation',
   text : 'i hope this one get actually to u' 
})