import { Route, Routes } from "react-router-dom";
import "./App.css";
import StartPage from "./pages";
import XmlPage from "@pages/XmlPage";
import XmlPromisePage from "@pages/XmlPromisePage";
import FetchPage from "@pages/FetchPage";
import FetchAsyncPage from "@pages/FetchAsyncPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/xml" element={<XmlPage />} />
        <Route path="/xmlpromise" element={<XmlPromisePage />} />
        <Route path="/fetch" element={<FetchPage />} />
        <Route path="/fetchasync" element={<FetchAsyncPage />} />
      </Routes>
    </>
  );
}

export default App;
