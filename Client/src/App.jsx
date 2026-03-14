import React from "react";
// import Supplier from "./pages/supplier";
import Buyer from "./pages/buyer";
import Supplier from "./pages/supplier";
import Admin from "./pages/admin";
import NewBuyer from "./pages/newBuyer";
import Hero from "./pages/Hero";
import NewHero from "./pages/newHero";
import Database from "./pages/database";
import SupplierFactor from "./components/supplier/supplier";

function App() {
  return (
    <div>
      {/* <Supplier /> */}
      <SupplierFactor />
      {/* <Buyer /> */}
      {/* <Admin /> */}
      {/* <NewBuyer /> */}
      {/* <NewHero /> */}
      {/* <Database /> */}
      {/* <Hero /> */}
    </div>
  );
}

export default App;
