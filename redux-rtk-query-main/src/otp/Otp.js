import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Otp() {
    const nav=useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm();
  const staticOTP = '1234'; // Static OTP for demonstration purposes

  const onSubmit = (data) => {
    const enteredOTP = data.otp;

    if (enteredOTP === staticOTP) {
      alert('OTP verification successful!');
      localStorage.setItem("isLogin",true)
      nav("/Userdashboard")
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      <h1>OTP Verification</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>OTP</label>
          <Controller
            name="otp"
            control={control}
            defaultValue=""
            rules={{
              required: 'OTP is required',
              minLength: { value: 4, message: 'OTP should be exactly 4 characters long' },
              maxLength: { value: 4, message: 'OTP should be exactly 4 characters long' }
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter OTP"
              />
            )}
          />
          {errors.otp && <p>{errors.otp.message}</p>}
        </div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default Otp;