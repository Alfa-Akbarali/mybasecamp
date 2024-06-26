import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login&Signup.scss";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function registr(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== passwordRepeat) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: username,
        }).then(() => {
          console.log("User profile updated successfully");
        }).catch((error) => {
          setError("Error updating user profile", error);
        });
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            userName: username,
            email: email,
            Admin: false
          });
        }
        setError("");
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/");
      }).catch((error) => {
        setError("Error: This email already exists");
      });
  }

  return (
    <div className="main-container">
    <div className="login-form">
      <form onSubmit={registr}>
        <h1 className="login-title">Sign up</h1>
        <div className="input-container">
          <div className="input-field">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="username"
              type="text"
              className="validate"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">User Name</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              type="email"
              className="validate"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input
              id="password"
              type="password"
              className="validate"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input
              id="passwordRepeat"
              type="password"
              className="validate"
              name="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              autoComplete="passwordRepeat"
            />
            <label htmlFor="passwordRepeat">repeat the Password</label>
          </div>
          <div className="signup-link-container">
            <label>
              Allready have an account?{" "}
              <a href="/login">
                <strong>Log in</strong>
              </a>
            </label>
            <br />
            <br />
          </div>
          <div className="submit-btn-container">
            <button className="submit-btn" name="action" onClick={registr}>
              Sign Up
              <i className="material-icons right">person_add</i>
            </button>
          </div>
          {error && (
            <div className="error-container">
              <div className="card red lighten-1 p-1">{error}</div>
            </div>
          )}
        </div>
        <br />
      </form>
    </div>
  </div>
  );
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default Signup;
