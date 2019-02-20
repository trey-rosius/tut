import React from "react";
import { FirebaseContext } from "../Firebase";
import TopProducts from "../TopProducts";
import LogoClass from "../Logo";
import TopBanner from "../TopBanner";
import Footer from "../Footer";
import Admin from "../Admin";
import SideBanner from "../SideBanner";
const BodyClass = () => (
  <div>
    <TopBanner />
    <div className="main-body">
      <div className="left">
        <TopProducts />
        <TopProducts />
      </div>
      <div className="right">
        <SideBanner />
      </div>
    </div>

    <Footer />
  </div>
);
export default BodyClass;
