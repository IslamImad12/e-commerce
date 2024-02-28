import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Register() {
  let[loading,setLoading] = useState(false);
  let[msg,setMsg] = useState('')
  async function getRegister(values) {
    try {
      setLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',
      values)
      if(data.message === 'success'){
        console.log(data);
        setMsg('');
        setLoading(false);
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false);
    }
  }
  const phoneNumberRegex = /^(?:\+20)?1\d{9}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/
  const validationSchema = Yup.object({
    name:Yup.string().required('name is required').min(2,'too short is 2').max(10,'too long max is 6'),
    email:Yup.string().required('email is required').email('email is not valid'),
    phone:Yup.string().required('phone is required')
    .matches(phoneNumberRegex , 'num should be like ex:+201167444267'),
    password:Yup.string().required('password is required')
    .matches(passwordRegex,'password sholud start with capital & Minimum length of 8 characters.'),
    repassword:Yup.string().required('repassword is required').oneOf([Yup.ref("password")] , 'password and repassword '),
  }) 

  let formik = useFormik({
    initialValues:{
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":"",
  }, validationSchema,
    onSubmit: getRegister
  })
  console.log(formik);
  return (
    <>
    <div>
      <h3 className='py-3 text-bg-success text-center mx-auto'>Register Now:</h3>
      {msg?<p className='alert alert-danger'>{msg}</p>:''}

      <form className='w-75 mx-auto my-4' onSubmit={formik.handleSubmit}>
        <label htmlFor="">name:</label>
        <input type="text" className='form-control ' name='name' value={formik.values.name} onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
        {formik.errors.name && formik.touched.name?<p className='alert alert-danger'>{formik.errors.name}</p>:''} 
        
        <label htmlFor="">email:</label>
        <input type="email" className='form-control ' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email?<p className='alert alert-danger'>{formik.errors.email}</p>:''} 
        
        <label htmlFor="">password:</label>
        <input type="text" className='form-control ' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password?<p className='alert alert-danger'>{formik.errors.password}</p>:''} 
        
        <label htmlFor="">repassword:</label>
        <input type="text" className='form-control ' name='repassword' value={formik.values.repassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.repassword && formik.touched.rePassword?<p className='alert alert-danger'>{formik.errors.repassword}</p>:''} 
        
        <label htmlFor="">phone:</label>
        <input type="tel" className='form-control ' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.phone && formik.touched.phone?<p className='alert alert-danger'>{formik.errors.phone}</p>:''} 
        
        <button className='btn text-white ms-auto d-block my-2 btn-main' disabled={!(formik.isValid && formik.dirty)} 
        type='submit' style={{'backgroundColor':'#0aad0a'}}>{loading? 'loading': 'Register'}</button>
      </form>
    </div>
    </>
  )
}
