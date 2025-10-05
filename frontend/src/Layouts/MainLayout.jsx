import { useEffect, useState } from "react";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function MainLayout({ children }) {
  const [isLoggedInInfo, setIsLoggedInInfo] = useState(false);
  const [isAdminInfo, setIsAdminInfo] = useState(false);

  useEffect(() => {
    setIsLoggedInInfo(localStorage.getItem("isLoggedIn") === "true");
    setIsAdminInfo(localStorage.getItem("isAdmin") === "true");
  }, []);

  return (
    <>
      <Header isLoggedInInfo={isLoggedInInfo} isAdmin={isAdminInfo} />
      {children}
      <Footer />
    </>
  );
}
