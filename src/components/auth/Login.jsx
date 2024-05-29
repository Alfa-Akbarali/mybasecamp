import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login&Signup.scss"
import { auth } from "../../firebase";
import Loader from "../loader/Loader";

const Login = () => {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    function login(e) {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are required");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email address");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            setError("");
            setEmail("");
            setPassword("");
            navigate("/");
        }).catch((error)=>{
            console.log(error)
            setError("Error: Couldn't find your account")
        })
    }
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    if (loading) {
        return <Loader/>;
    }
    return (
        <div>
        <div className="main-container">
          <form onSubmit={login} className="login-form">
            <h1 className="login-title">Login</h1>
            <div className="row input-container">
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="email"
                  type="email"
                  className="validate"
                  name="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <span className="material-icons prefix">lock</span>
                <input
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  autoComplete="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="signup-link-container">
                <label>
                  Dont have an account yet? <a href="/signup"><strong>Sign up</strong></a>
                </label>
                <br/>
                <br/>
              </div>
              <div className="submit-btn-container">
                <button className="submit-btn" type="submit" name="action">Log In
                  <i className="material-icons right">login</i>
                </button>
              </div>
              {error && <div className="error-container"><div className="card red lighten-1 p-1">{error}</div></div>}
            </div>
            <br/>
          </form>
        </div>
      </div>
    )
}

export default Login;
