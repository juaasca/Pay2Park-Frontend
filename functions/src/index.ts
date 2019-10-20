import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://pay2park-fbf82.firebaseio.com'
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

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