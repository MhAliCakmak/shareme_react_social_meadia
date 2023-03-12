import React from 'react'
import {Circles} from "react-loader-spinner"

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
        <Circles
            type="loading"
            color="#00BFFF"
            height={50}
            width={200}
            timeout={3000} //3 secs
        />

        <p className="text-lg text-center px-2">{message}</p>
    </div>
  )
}

export default Spinner