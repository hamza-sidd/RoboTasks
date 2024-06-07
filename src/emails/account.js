const sgMail=require('@sendgrid/mail')

//const sendgridAPIKey='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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to:'hamza1234siddiqui@gmail.com',
//     from:'hamza1234siddiqui@gmail.com',
//     subject:'Thanks for joining in',
//     text:'Welcome to the app'

// })

const sendWelcomeEmail=(email, name)=>{
    sgMail.send({
        to:email,
        from:'hamza1234siddiqui@gmail.com',
        subject:'Thanks for joining in',
        text:`Welcome to the app, ${name}`
    
    })
}

const sendCancelationEmail= (email, name)=>{
    sgMail.send({
        to:email,
        from:'hamza1234siddiqui@gmail.com',
        subject:'Sorry to see you go',
        text:`Goodbye, ${name}`
    })
}
module.exports={
    sendWelcomeEmail,
    sendCancelationEmail
}
