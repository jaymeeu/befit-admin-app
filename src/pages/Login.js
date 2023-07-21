import { Auth } from 'aws-amplify'
import React, { useState } from 'react'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault()
        await Auth.signIn(username, password)
        .then(()=>{
            window.location.reload()
        })
    }

  return (
    <section className="bg-blue-50 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-blue-900 ">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Flowbite    
      </a> */}
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 md:text-2xl text-center ">
                  ADMIN LOGIN
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-900 ">Your email</label>
                      <input value={username} onChange={(e)=>setUsername(e.target.value)} required type="email" name="email" id="email" className="bg-blue-50 border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue-900 ">Password</label>
                      <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="••••••••" className="bg-blue-50 border border-blue-300 text-blue-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                  </div>
                 
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Login