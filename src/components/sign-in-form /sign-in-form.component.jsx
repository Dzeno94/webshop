import '../sign-in-form /sign-in-form.styles.scss';
import { useState } from 'react';
import { signinWithGooglePopup,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword } from '../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.componenet';
import Button from '../button/button.component';


const defaultFormFields = {
    email:'',
    password:'',
};

const SignInForm = ()=>{

const [formFields,setFormFields ]= useState(defaultFormFields);
const {email,password} = formFields;

const resetFormFields = ()=>{
    setFormFields(defaultFormFields);
}
const signInWithGoogle = async ()=>{
     await signinWithGooglePopup();
}

const handleSubmit = async (event)=>{
event.preventDefault();

try{
 const {user} = await signInAuthUserWithEmailAndPassword(email,password);
 resetFormFields();

}
catch(error){
    switch (error.code) {
        case 'auth/wrong-password':
            alert("incorect password for email");
            break;
        case 'auth/user-not-found':
            alert("no user associated with this email");
            break;
        default:
            console.log(error);
     }
}
};

const handleChange = (event)=>{
    const {name,value} = event.target;
    setFormFields({...formFields,[name]:value});
}

    return(
<div className='sign-up-container'>
    <h2>Already have an account?</h2>
    <span>Sign in with your email and password</span>
<form  onSubmit={handleSubmit}>
    
<FormInput label="Email" type="email" onChange={handleChange} value={email} name ='email' required/>
<FormInput label = "Password" type="password" onChange={handleChange} value={password} name='password' required/>
<div className='buttons-container'>

<Button onClick={handleSubmit} type='submit'>Sign In </Button>
<Button onClick={signInWithGoogle} type='button' buttonType='google'>Google sign in</Button>

</div>

</form>
    
    </div>
    );
}
export default SignInForm;