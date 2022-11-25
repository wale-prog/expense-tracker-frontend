import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAction } from "../../redux/LoginSlice"; 
import { useDispatch } from "react-redux";

const Registration = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: ""
  })

  const handleSubmit = (e) => {   

    const { email, password, password_confirmation } = loginDetail;

    axios.post("http://localhost:3000/registrations",
      {
        user: {
          email,
          password, 
          password_confirmation
        },
      }, 
        { withCredentials: true }
    )
      .then(response => {
        if (response.data.status === 'created') {
          dispatch(loginAction.login(response.data));         
          nav("/login");
        }
      })
      .catch(error => {
        setLoginDetail({ ...loginDetail, registrationErrors: error })
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
        <input
          type="password" 
          name="password_confirmation" 
          placeholder="Password Confirmation" 
          value={loginDetail.password_confirmation}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
};
export default Registration;