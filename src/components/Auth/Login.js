import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAction } from "../../redux/LoginSlice"; 
import { useDispatch } from "react-redux";
import { categoryAction } from "../../redux/CategorySlice";
import './Login.css'


const Login = () => {

  const nav = useNavigate();
  const dispatch = useDispatch();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
    loginErrors: ""
  })

  const getCategories = (userId) => {
    const apiUrl = `http://localhost:3000/api/v1/user/${userId}/category`;
    axios.get(apiUrl, { withCredentials: true })
      .then(response => {
        dispatch(categoryAction.addCategory(response.data));
        console.log(response.data)
      })
  }

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
        console.log(response.data)
        if (response.data.logged_in) {
          dispatch(loginAction.login(response.data));     
          nav("/");
          console.log(response.data.user.id)
          getCategories(response.data.user.id)
        } else {
          setLoginDetail({ ...loginDetail, loginErrors: response.data})

        }

      })
      .catch(error => {
        setLoginDetail({ ...loginDetail, loginErrors: error })
      }) 
    e.preventDefault();
  }

  const handleChange = (e) => {
    setLoginDetail(prevState =>(
      { ...prevState, [e.target.name]: e.target.value }
    ))
  }

  const hideError = () => {
    document.querySelector('.error').classList.add('hide')
  }
  const errorDisplay = () => {
    if (loginDetail.loginErrors) {
      return (
        <div>
          <p className="error" onClick={hideError}>{loginDetail.loginErrors.error}</p>
        </div>
      )    
    }
  }

  return (
    <div>
      {errorDisplay()}
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
};
export default Login;