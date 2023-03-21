import '../sign-up-form/sign-up-form.styles.scss';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.componenet';
import Button from '../button/button.component';

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
};

const SignUpForm = ()=>{

const [formFields,setFormFields ]= useState(defaultFormFields);
const {displayName,email,password,confirmPassword} = formFields;

console.log(formFields);

const resetFormFields = ()=>{
    setFormFields(defaultFormFields);
}

const handleSubmit = async (event)=>{
event.preventDefault();

if(password !== confirmPassword) {
    alert ('Passwords do not match');
    return;
}
try{
 const {user} =  await createAuthUserWithEmailAndPassword(email,password);
 await createUserDocumentFromAuth(user,{displayName});
 resetFormFields();

}catch(error){
    if(error.code ==='auth/email-already-in-use'){
        alert('Cannot create user, email already in use');
    }else{

        console.log('creating user with email and password failed', error);
    }
}

}

const handleChange = (event)=>{
    const {name,value} = event.target;
    setFormFields({...formFields,[name]:value});
}

    return(
<div className='sign-up-container'>
    <h2>Don't have an account?</h2>
    <span>Sign up with your email and password</span>
<form  onSubmit={handleSubmit}>
    
<FormInput label="Display name" onChange={handleChange} value={displayName} name='displayName' required />
<FormInput label="Email" type="email" onChange={handleChange} value={email} name ='email' required/>
<FormInput label = "Password" type="password" onChange={handleChange} value={password} name='password' required/>
<FormInput label="Confirm Password" type="password" onChange={handleChange} value={confirmPassword} name = 'confirmPassword' required/>

<Button type='submit'>Sign Up </Button>
</form>
    
    </div>
    );
}
export default SignUpForm;