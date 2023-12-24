import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMessage } from "./hooks/useAlert.js";
import ContextProvider from "./context/contextProvider.js";
import HeaderComponent from "./components/Header";

const App = () => {
  const { showMessage } = useMessage();
  const { isAlert, type, content } = useSelector((state) => state.alertReducer);
  const location = useLocation(); // Get the current location
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Depend on the path

  //async
  useEffect(() => {
    if (isAlert) {
      showMessage(type, content);
    }
  }, [isAlert, content, type, showMessage]);

  return (
    <div className="main_wrapper">
      <ContextProvider>
        <HeaderComponent />
        <Outlet />
      </ContextProvider>
    </div>
  );
};

export default App;
