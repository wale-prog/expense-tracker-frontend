import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../redux/LoginSlice"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/CategorySlice";
import './Login.css'


const Login = () => {

  const nav = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login[0]);
  const [checkLogin, setCheckLogin] = useState();
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
    loginErrors: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginDetail;
    const user = {
      email,
      password,
    }
    dispatch(postLogin(user)).then(resp => {
      if (resp.payload.logged_in) {
        setCheckLogin(true)
        localStorage.setItem("login", JSON.stringify(true))
        dispatch(fetchCategory(resp.payload.user.id))
        nav("/")
      } else {
        nav("/login")
        setLoginDetail({ ...loginDetail, loginErrors: resp.payload.error})
      }
    })
    setLoginDetail({ ...loginDetail, email: "", password: ""})
  };
  console.log(checkLogin)

  const handleChange = (e) => {
    setLoginDetail(prevState =>(
      { ...prevState, [e.target.name]: e.target.value }
    ))
  }

  const hideError = () => {
    document.querySelector('.error').classList.add('hide')
  }
  const errorDisplay = () => {
    if (login !== undefined) {
      return (
        <div>
          <p className="error" onClick={hideError}>{login.error}</p>
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