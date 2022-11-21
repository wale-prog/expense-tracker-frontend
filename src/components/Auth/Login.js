import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {

  const nav = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
    loginErrors: ""
  })

  const handleSubmit = (e) => {   

    const { email, password } = loginDetail;

    axios.post("http://localhost:3000/sessions",
      {
        user: {
          email,
          password
        },
      }, 
        { withCredentials: true }
    )
      .then(response => {
        if (response.data.logged_in) {
          props.handleSuccessfulAuth(response.data);         
          nav("/expense");
        }
      })
      .catch(error => {
        console.log("errors from login", error);
        // setLoginDetail({ ...loginDetail, registrationErrors: error })
      }) 
    e.preventDefault();
  }

  const handleChange = (e) => {
    setLoginDetail(prevState =>(
      { ...prevState, [e.target.name]: e.target.value }
    ))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email" 
          name="email" 
          placeholder="Email" 
          value={loginDetail.email}
          onChange={handleChange}
          required
        />
        <input
          type="password" 
          name="password" 
          placeholder="Password" 
          value={loginDetail.password}
          onChange={handleChange}
          required
        />
        {/* <input
          type="password" 
          name="password_confirmation" 
          placeholder="Password Confirmation" 
          value={loginDetail.password_confirmation}
          onChange={handleChange}
          required
        /> */}
        <button type="submit">Login</button>
      </form>
    </div>
  )
};
export default Login;