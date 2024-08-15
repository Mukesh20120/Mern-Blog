import React from 'react'
import {Button} from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import {AiFillGoogleCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { app } from '../Firebase'
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'

export default function OAuth() {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleOAuthClick = async() =>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'});
       try{
          const result = await signInWithPopup(auth,provider);
          if(result){
             const res = await fetch('/api/v1/auth/google',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    googleImgUrl: result.user.photoURL
                })
             });
             const data = await res.json();
             if(res.ok){
                dispatch(signInSuccess(data.userData))
                navigate('/');
             }
          }
       }catch(error){
        window.alert(error.message);
       }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleOAuthClick}>
     <AiFillGoogleCircle className=' w-6 h-6 mr-2'/>
     Continue with Google
    </Button>
  )
}
