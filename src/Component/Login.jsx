import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '.././UserContext';

export default function Login() {
  let {setIsUser,setLogin}  = useContext(userContext)
  const navigate  = useNavigate()
  let [loading, setLoading] = useState(false)
  let [msg, setMsg] = useState('')
  async function getLogin(values) {
    try {
      setLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      if (data.message === 'success') {
        setIsUser(data.token) 
        setLogin(data.user.name)
        localStorage.setItem('userToken',data.token)
        localStorage.setItem('userName',data.user.name)
        setMsg('')
        setLoading(false)
        navigate('/home');
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false)
    }
  }

 

  const validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('email is not valid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'password not valid'),
    
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: getLogin
  })


  return (
    <div className='min-vh-100'>
      <h4 className='py-3 text-bg-success text-center mx-auto '>Login Now:</h4>
      <form className='w-75 mx-auto my-4' onSubmit={formik.handleSubmit}>
      {msg ? <p className='alert alert-danger'>{msg}</p> : ''}
     


        <label htmlFor="email">email:</label>
        <input type="email" className='form-control mb-3' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}

        <label htmlFor="password">password:</label>
        <input type="password" className='form-control mb-3' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />


        {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}
        <h5 className=''><Link to='/vertifyCode'>forget your password ?</Link></h5>
        <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main green-color text-white ms-auto d-block green-color' type='submit' >{loading ? <Bars
          height="30"
          width="40"
          color="#fff"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true} /> : 'Login now'}</button>
      </form>
    </div>
  )
}

