import {initializeApp} from 'firebase/app';
import {getAuth,signOut,onAuthStateChanged,signInWithRedirect,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore,query,getDocs,collection,writeBatch,doc,setDoc,getDoc} from 'firebase/firestore';

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
export const addCollectionAndDocuments = async (collectionKey,objectsToAdd)=>{
const collectionRef= collection(db,collectionKey);
const batch = writeBatch(db);

objectsToAdd.forEach((object) => {
  const docRef=doc(collectionRef,object.title.toLowerCase());

batch.set(docRef,object);

});
await batch.commit();
console.log('done');
}

export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db,'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
    const {title,items}  = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{})
return categoryMap;
}

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

  export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email||!password) return;
  return await signInWithEmailAndPassword(auth,email,password);
  } 

  export const signOutUser = async ()=> await signOut(auth);

  export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth,callback);