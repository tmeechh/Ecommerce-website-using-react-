import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignUP = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-feilds">
          <input type="text" placeholder="Username" /><br />
          <input type="email" placeholder="Email" /><br />
          <input type="password" placeholder="Password"/><br/>
        </div>
<button>Continue</button>
        <p className="loginsignup-login">Already have an account? <span>Login Here</span>    </p>
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
      </div>
    </div>
  )
}

export default LoginSignUP