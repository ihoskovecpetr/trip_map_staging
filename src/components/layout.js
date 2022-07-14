/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";

export default function Layout({ children, withFooter = false }) {

  return (
    <React.Fragment>
      <Header />
      {children}
      {withFooter && <Footer />}
    </React.Fragment>
  );
}
