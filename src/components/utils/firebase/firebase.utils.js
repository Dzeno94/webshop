import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore,doc,setDoc,getDoc} from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyDibm2aU-Lsu6mQjx2td6wHsbg5-LdYQ6M",
  
    authDomain: "webshopapp-db.firebaseapp.com",
  
    projectId: "webshopapp-db",
  
    storageBucket: "webshopapp-db.appspot.com",
  
    messagingSenderId: "1095616827136",
  
    appId: "1:1095616827136:web:5b3b211325d554f4ebede5"
  
  };
  
  
  
  
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth = getAuth();
  export const signinWithGooglePopup = ()=> signInWithPopup(auth,provider);
export const signinWithGoogleRedirect = () =>signInWithRedirect(auth,provider);

  export const db = getFirestore();
 export const createUserDocumentFromAuth = async (userAuth,additionalInformation = {})=>{
  if(!userAuth) return;

  const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();
    try{
        await setDoc(userDocRef,{
            displayName,
            email,
            createdAt,
            ...additionalInformation
        })
    }catch(error) {
        console.log('error creating the user', error.message);
    }
}
return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email||!password) return;
  return await createUserWithEmailAndPassword(auth,email,password);
  } 