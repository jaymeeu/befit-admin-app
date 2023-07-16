import { useState, useEffect, Fragment } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(true);
  // const [isMobile, setIsMobile] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}

useEffect(() => {
  if (window.innerWidth <= 768) {
    setShowNav(false);
  } else {
    setShowNav(true);
  }
}, [])

useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

const isMobile = width <= 768;
 
  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      
      <SideBar showNav={showNav} isMobile={isMobile} setShowNav={setShowNav} />
     
      <main
        className={`pt-20 transition-all duration-[300ms] ${
          showNav && !isMobile ? "pl-64" : "pl-32"
        }`}>
        <div>{children}</div>
      </main>
    </>
  );
}