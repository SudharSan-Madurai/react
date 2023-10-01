import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const nav=useNavigate()
let curentuserdata = []
    const validationSchema = Yup.object().shape({
      
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
          .max(40, 'Password must not exceed 40 characters'),
      
      });
    
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });
    
      const onSubmit = data => {
        
        console.log(JSON.stringify(data, null, 2));
        let ldata = JSON.parse(localStorage.getItem("new")) || [];
        let lvdata=ldata.find(e=>e.email === data.email && (e=>e.password === data.password))
        console.log(lvdata);
       
if(lvdata){
    reset();
    curentuserdata.push(lvdata)
    localStorage.setItem("CurrentUser",JSON.stringify(curentuserdata));
    nav("/Otp")
}else{
    alert("user not valid")

}

        
        
      };



  return (
    <div>
 <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
       

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="text"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
      

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
        </div>
      </form>
    </div>







    </div>
  )
}
