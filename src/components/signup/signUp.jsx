import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./logout.scss";
import { auth, db } from "../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await db.collection("users").doc(user.uid).set({
        email: user.email,
        fullname: fullname,
        username: username,
        uid: user.uid,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="container_of_signup">
      <div className="signup_box">
        <div className="img_box">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="img"/>
        </div>
        <form>
          <div className="input_box">
            <input type="text" name="email" required placeholder="Mobile Number or Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" name="fullname" required placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            <input type="text" name="username" required placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="btn">
              <button type="submit" name="submit" onClick={handleSignUp}>Sign up</button>
            </div>
          </div>
        </form>
      </div>

      <div className="login_box">
        <p>Have an account?<Link className="link" to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
