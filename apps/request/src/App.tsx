import { Route, Routes } from "react-router-dom";
import "./App.css";
import StartPage from "./pages";
import XmlPage from "@pages/XmlPage";
import XmlPromisePage from "@pages/XmlPromisePage";
import FetchPage from "@pages/FetchPage";
import FetchAsyncPage from "@pages/FetchAsyncPage";
import UseTransitionPage from "@pages/UseTransitionPage";
import FetchErrorPage from "@pages/FetchErrorPage";
import { GlobalPortal } from "./GlobalPortal";

function App() {
  return (
    <GlobalPortal.Provider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/xml" element={<XmlPage />} />
        <Route path="/xmlpromise" element={<XmlPromisePage />} />
        <Route path="/fetch" element={<FetchPage />} />
        <Route path="/fetchasync" element={<FetchAsyncPage />} />
        <Route path="/usetransition" element={<UseTransitionPage />} />
        <Route path="/fetcherror" element={<FetchErrorPage />} />
      </Routes>
    </GlobalPortal.Provider>
  );
}

export default App;
