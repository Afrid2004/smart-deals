import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

const Root = () => {
  const navigate = useNavigation();
  if (navigate.state == "loading") {
    return <Loading />;
  }
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Root;
