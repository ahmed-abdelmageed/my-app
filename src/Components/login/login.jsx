import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'



export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value
    setUser(myUser)
    console.log(myUser);
  }

  async function sendLoginDataToApi() {
    let { data } = await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/auth/signin`, user)
    if (data.message == 'success') {
      localStorage.setItem('userToken', data.token);
      setIsLoading(false);
      saveUserData();
      navigate('/')


    }
    else {
      setIsLoading(false);
      setError(data.message)
    }
  }

  function submitLoginForm(e) {
    setIsLoading(true);
    e.preventDefault();
    let validation = validateLoginForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details)

    }
    else {
      sendLoginDataToApi();
    }
  }

  function validateLoginForm() {
    let schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().required()
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="w-75 login-container  mx-auto py-4 bg-light rounded-4 p-5 m-5 ">



        <h3 className='text-black text-center pb-5'>Login Now  </h3>


        {error.length > 0 ? <div className="alert alert-danger my-2">{error}</div> : ''}
        <form className='form-container' onSubmit={submitLoginForm}>
          <label  htmlFor='email' className='text-black'>email:</label>
          <input onChange={getUserData} type='email' className='form-control my-2 my-input' name='email' id='email' />

          {errorList.filter((err) => err.context.label == 'email')[0] ? <div className="alert alert-danger my-2">

            <p>{errorList.filter((err) => err.context.label == 'email')[0]?.message}</p>
          </div> : ''}
          <label htmlFor='password' className='text-black'>password:</label>
          <input onChange={getUserData} type='password' className='form-control my-2 my-input' name='password' id='password' />

          {errorList.filter((err) => err.context.label == 'password')[0] ? <div className="alert alert-danger my-2">

            <p>{errorList.filter((err) => err.context.label == 'password')[0]?.message}</p>
          </div> : ''}

        <div className='login-btn'>
            {isLoading ? <button type='button' className='btn button btn-warning rounded-5 text-black'> <i className='fas fa-spinner fa-spin'></i></button>
              : <button  type='submit' className='btn button bg-warning rounded-5'> <i class="fa-solid fa-arrow-right"></i></button>
            }
          </div>

        </form>

      </div>

    </>
  )
}
