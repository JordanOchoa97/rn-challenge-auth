import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function singOut(){
    auth().signOut().then(() => console.log('User signed out!'));
}

export function emailSignIn(email: any, password: any) {
    console.log(email, password);
    auth().signInWithEmailAndPassword(email, password).then(() => {
      console.log('signed in!');
    }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {console.log('That email address is already in use!');}
        if (error.code === 'auth/invalid-email') {console.log('That email address is invalid!');}
        console.error(error);
    });
}
export function emailSignUp(email: any, password: any) {
    console.log(email, password);
    auth().createUserWithEmailAndPassword(email, password).then(() => {
      console.log('created and signed in!');
    }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {console.log('That email address is already in use!');}
        if (error.code === 'auth/invalid-email') {console.log('That email address is invalid!');}
        console.error(error);
    });
}

export async function googleSignIn() {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '921383753162-ffm7hjarisjhhfmi0nrr7pssq6r04hkm.apps.googleusercontent.com',
        offlineAccess: true,
        forceCodeForRefreshToken: true,
        accountName: '',
        profileImageSize: 120,
    });

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
}

export async function phoneNumberSignIn(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation;
}

export async function confirmPhoneCode(confirm: { confirm: (arg0: any) => any; }, code: any) {
    console.log(confirm)
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.', error);
    }
}