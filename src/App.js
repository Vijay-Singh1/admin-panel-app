import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { allData } from "./action";
import { connect } from "react-redux";
import Dashboard from "./components/Dashboard";
import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import Account from "./components/Account";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";

function App(data) {
  const CallAPI = data.data.reducer.callApi;
  const loginStatus = data.data.reducer.LoginStatus;
  console.log(loginStatus);

  localStorage.setItem("IsLoggedIn", loginStatus);

  let IsLoggedIn = JSON.parse(localStorage.getItem("IsLoggedIn"));

  useEffect(() => {
    if (CallAPI === true) {
      data.addData();
    }
  }, [IsLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div id="main-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={IsLoggedIn == true ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/product"
              element={IsLoggedIn == true ? <Product /> : <Navigate to="/" />}
            />
            <Route
              path="/accounts"
              element={IsLoggedIn == true ? <Account /> : <Navigate to="/" />}
            />
            <Route
              path="/AddProduct"
              element={
                IsLoggedIn == true ? <AddProduct /> : <Navigate to="/" />
              }
            />
            <Route path='*' element={<Login />}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

const mapstateToProps = (props) => ({
  data: props,
});

const mapDispatchToProps = (dispatch) => ({
  addData: (data) => {
    dispatch(allData());
  },
});

export default connect(mapstateToProps, mapDispatchToProps)(App);
