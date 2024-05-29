import React from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import Auth from "../img/auth.png";
const Login = () => {
  return (
    <div className="container">
      <div className="left_box">
        <img src={Auth} alt="" />
      </div>
      <div className="right_box">
        <div className="login_box">
            <div className="img_box">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="img"/>
            </div>
            <div className="main_input_box">
              <form class="form">
                <div className="input_box">
                  <input type="text" id="name" required placeholder="Phone number, username, or email"></input>
                  <input type="password" name="password" required placeholder="Password"></input>
                </div>
                
                <button class="btn" type="submit" name="submit">
                  Log in
                </button>

                {/* <div className="forgot_pass">
                  <a class="forgot" href="#">
                    Forgot password?
                  </a>
                </div> */}
              </form>
            </div>
          </div>
          <div class="logout_box">
            <p class="text">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
      </div>


      
    </div>
  );
};

export default Login;
