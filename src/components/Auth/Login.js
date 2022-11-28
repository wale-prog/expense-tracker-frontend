import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAction } from "../../redux/LoginSlice"; 
import { useDispatch } from "react-redux";
import { categoryAction } from "../../redux/CategorySlice";


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
        <button type="submit">Login</button>
      </form>
    </div>
  )
};
export default Login;