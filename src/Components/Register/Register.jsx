import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'minimum length is 3 caracters').max(10, 'maximum length is 10 characters'),
    email: Yup.string().email('Email is invalid').required('email is required'),
    password: Yup.string().required('Password is required').matches(/^[A-z][a-z0-9]{5,10}$/, 'password must start with uppercase '),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'password and rePassword doesnt match'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, ' Invalid phone '),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''

    },
    validationSchema,
    onSubmit: handleRegister

  })

  async function handleRegister(values) {
    console.log('hhh')
    console.log(values)
    setIsLoading(true)
    let { data } = await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/auth/signup`, values)
    console.log(data)
    if (data.message === 'success') {
      setIsLoading(false);
      navigate('/login')


    }
    else {
      setIsLoading(false);
      setMessageError(data.message)
    }
  }


  return (
    <>

      <div className="w-75 login-container  mx-auto py-4 bg-light rounded-4 p-5 m-5 ">


        <h3 className='text-black text-center pb-2'>Register Now </h3>
        {messageError ? <div className="alert alert-danger"> {messageError} </div>
          : null}

        <form className='form-container' onSubmit={formik.handleSubmit}>
          <label className='text-black' htmlFor='name'>Name</label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type='text' name='name' id='name' />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">
            {formik.errors.name}
          </div> : ''}

          <label className='text-black' htmlFor='email'>Email</label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type='email' email='email' id='email' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">
            {formik.errors.email}
          </div> : ''}
          <label className='text-black' htmlFor='password'>Password</label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type='password' password='password' id='password' />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">
            {formik.errors.password}
          </div> : ''}
          <label className='text-black' htmlFor='rePassword'>rePassword</label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type='password' rePassword='rePassword' id='rePassword' />

          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">
            {formik.errors.rePassword}
          </div> : ''}

          <label className='text-black' htmlFor='phone'>Phone</label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type='tel' phone='phone' id='phone' />

          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">
            {formik.errors.phone}
          </div> : ''}
          <div className='register-btn'>
            {isLoading ? <button type='button' className='btn button btn-warning rounded-5 text-black'> <i className='fas fa-spinner fa-spin'></i></button>
              : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn button bg-warning rounded-5'> <i class="fa-solid fa-arrow-right"></i></button>
            }
          </div>

        </form>
      </div>
    </>
  )
}
