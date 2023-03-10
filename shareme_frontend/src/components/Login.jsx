import React from 'react'
import {GoogleLogin,googleLogout} from "@react-oauth/google"
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc"
import shareVideo from "../assets/share.mp4"
import logo from "../assets/logowhite.png"
import {client} from "../client"
import jwt_decode from "jwt-decode";


const Login = () => {
  const navigate = useNavigate()
  const responseGoogle=(response)=>{
    localStorage.setItem("user",JSON.stringify(response.profileObj))
    var decodedHeader = jwt_decode(response.credential);
    console.log(decodedHeader)
     
    const { name, sub, picture } = decodedHeader;
    console.log(name, sub, picture)
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
      .then(() =>{
        navigate('/', { replace: true })
      })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video src={shareVideo} autoPlay loop muted className='absolute w-full h-full object-cover'/>
      </div>
      <div className='absolute top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center left-0 w-full h-full bg-black opacity-60'>
      <div className="p-5">
          <img src={logo} width="130px" alt='logo'/>
      </div>
      <div className='shadow-2xl'>
        
        <GoogleLogin 
        onSuccess={responseGoogle}
        onFailure={(response) => console.log(response)}
        cookiePolicy={'single_host_origin'}
        />



      </div>
      </div>
      


    </div>
  )
}

export default Login