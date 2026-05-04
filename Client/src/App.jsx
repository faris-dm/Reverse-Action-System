import React from "react";

import { BrowserRouter, Router, Route, Link, Routes } from "react-router-dom";
// import Supplier from "./pages/supplier";
import Buyer from "./pages/buyer";
import Supplier from "./pages/supplier";
import Admin from "./pages/admin";
import NewBuyer from "./pages/newBuyer";
import Hero from "./pages/Hero";
import MainHero from "./pages/newHero";

import SupplierFactor from "./components/supplier/supplier";
import Role from "./pages/Role";
import LoginPage from "./components/ui/Login";
import SupplierRegitor from "./components/Registor/supplierRegistor";
// import mainBuyer from "./pages/mainBuyer";
import MainBuyer from "./pages/mainBuyer";
import BuyerRegistor from "./components/Registor/buyerRegistor";

function App() {
  return (
    <div>
      <div>
        {/* <SupplierFactor /> */}
        {/* <Admin /> */}
        {/* <MainHero /> */}
        {/*   <LoginPage /> */}
        {/*   <Role />   */}
        {/* <Hero /> */}
        {/*    <SupplierRegitor />  */}
        {/* <BuyerRegistor /> */}
        {/* // <mainBuyer /> */}
        {/* <MainBuyer /> */}
        {/* // // // // */}
        {/* llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll */}
        {/* <Buyer /> */}
        {/* <NewBuyer /> */}
        {/*  <Supplier /> */}
      </div>
      <BrowserRouter>
        <Routes>
          {/* landing page */}
          <Route path="/" element={<Hero />} />
          {/*  page  for desideing the role */}
          <Route path="/role" element={<Role />} />
          {/* login  page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Supplier registor */}
          <Route path="/supplierform" element={<SupplierRegitor />} />
          {/* Buyer Registor */}
          <Route path="/buyerform" element={<BuyerRegistor />} />
          {/* supplier  Dashboard */}
          <Route path="/supplier" element={<SupplierFactor />} />
          {/* buyer Dashboard */}
          <Route path="/buyer" element={<MainBuyer />} />
          {/* dashboard  for the admin */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
