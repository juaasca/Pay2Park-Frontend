import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://pay2park-fbf82.firebaseio.com'
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const deleteUser = functions.https.onCall((request) => {
    var userEmail = request.Email;

    return admin.auth().getUserByEmail(userEmail)
        .then((user) => {
            return admin.auth().deleteUser(user.uid)
                .catch((error) => { throw new functions.https.HttpsError(error.code, error.message)});
        })
        .catch((error) => {
            throw new functions.https.HttpsError(error.code, error.message);
        });
});

export const sendWorkerWelcomeEmail = functions.https.onCall(async (request) => {
    const email = request.Email;
    const displayName = request.Name;
    const password = request.Password;
    
    var firebaseEmail = functions.config().gmail.email;
    var firebaseEmailPassword = functions.config().gmail.pass;

    const mailTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: firebaseEmail,
          pass: firebaseEmailPassword,
        },
    });
  
    const mailOptions: Mail.Options = {
      from: `Pay2Park <noreply@firebase.com>`,
      to: email,
    };
    
    // The user subscribed to the newsletter.
    mailOptions.subject = `¡Bienvenido a Pay2Park!`;
    let emailText = `¡Hola ${displayName || ''}!`;
    emailText += `\n\nHas sido dado de alta como revisor en la aplicación Pay2Park. Puedes entrar en la aplicación con los siguientes datos:`;
    emailText += `\n\nCorreo: ${email}\nContraseña: ${password}\n\n`;
    emailText += `Te recomendamos que cambies esta contraseña lo antes posible.`;
    emailText += `\n\nSaludos,\nEl equipo de Pay2Park`;
    mailOptions.text = emailText;
    
    await mailTransport.sendMail(mailOptions);
  
    return null;
  });