import React from "react";
import styles from "./Login.module.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { modifyIsLoggedIn } from "../action";

function Login(data) {
  const navigate = useNavigate();

  const AdminLoginStatus = data.data.reducer.LoginStatus;

  useEffect(() => {}, [AdminLoginStatus]);

  const [username, setusername] = useState([]);
  const [password, setpassword] = useState([]);

  function userloginStatus() {
    if (username === password) {
      data.login(true);
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.loginForm}>
          <h3 className={styles.loginText}>Welcome to Dashboard, Login</h3>

          <div className={styles.usernameWrapper}>
            <label htmlFor="input-box1" className={styles.userNameLabel}>
              Username
            </label>
            <input
              className={styles.usernameInput}
              id="input-box1"
              type="text"
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
          </div>

          <div className={styles.passwordWrapper}>
            <label htmlFor="input-box2" className={styles.passwordLabel}>
              Password
            </label>
            <input
              className={styles.passwordInput}
              id="input-box2"
              type="text"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>

          <div className={styles.btnWrapper}>
            <button
              className={styles.loginBtn}
              onClick={() => {
                userloginStatus();
              }}
            >
              LOGIN
            </button>
            <button className={styles.forgotbtn}>FORGOT YOUR PASSWORD?</button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapstateToProps = (props) => ({
  data: props,
});

const mapDispatchToProps = (dispatch) => ({
  login: (status) => {
    dispatch(modifyIsLoggedIn(status));
  },
});

export default connect(mapstateToProps, mapDispatchToProps)(Login);
