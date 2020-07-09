const config = require('config')
const sendGridApiKey = config.get('SEND_GRID_API_KEY')
const template = require('./template')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(sendGridApiKey)

const forgetPasswordEmail = async (name, email, link) => {
    const mailOptions = {
        to: email,
        from: 'alikadhim87nl@gmail.com',
        name: 'Travel App',
        subject: 'Password change request',
        html: template(
            name,
            `Please click on the following link to reset your password.`,
            link,
            ` If you did not request this, please ignore this email and your password will remain unchanged.`,
            `Click to Change Your Password`
        ),
        text: `Hello ${name} \n 
         Please click on the following link ${link} to reset your password. \n\n 
         If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    }
    try {
        await sgMail.send(mailOptions)
    } catch (error) {
        throw error.message
    }
}
const resetPasswordEmail = async (name, email) => {
    const mailOptions = {
        to: email,
        from: 'alikadhim87nl@gmail.com',
        subject: 'Your password has been changed',
        html: template(
            name,
            `This is a confirmation that the password for your account ${email} has just been changed.`,
            `http://localhost:3000`,
            ` `,
            `Go to App`
        ),
        text: `Hello ${name} \n 
            This is a confirmation that the password for your account ${email} has just been changed.\n`,
    }
    try {
        await sgMail.send(mailOptions)
    } catch (error) {
        throw error.message
    }
}
module.exports = {
    forgetPasswordEmail,
    resetPasswordEmail,
}
