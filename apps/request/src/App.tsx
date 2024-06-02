import { Route, Routes } from "react-router-dom";
import StartPage from "./pages";
import XmlPage from "@pages/XmlPage";
import XmlPromisePage from "@pages/XmlPromisePage";
import FetchPage from "@pages/FetchPage";
import FetchAsyncPage from "@pages/FetchAsyncPage";
import UseTransitionPage from "@pages/UseTransitionPage";
import FetchErrorPage from "@pages/FetchErrorPage";
import { GlobalPortal } from "./GlobalPortal";
import FetchPromiseAllPage from "@pages/FetchPromiseAllPage";
import WithoutPromiseAllPage from "@pages/WithoutPromiseAllPage";
import PlaygroundPage from "@pages/PlaygroundPage";
import TestPage from "@pages/TestPage";
import TodoPage from "@pages/TestPage/TodoPage";
import SwrPage from "@pages/SwrPage";
import NprogressPage from "@pages/NprogressPage";
import { useEffect } from "react";
import nProgress from "nprogress";

function App() {
  useEffect(() => {
    return () => {
      nProgress.remove();
    };
  }, []);
  return (
    <GlobalPortal.Provider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/xml" element={<XmlPage />} />
        <Route path="/xmlpromise" element={<XmlPromisePage />} />
        <Route path="/fetch" element={<FetchPage />} />
        <Route path="/fetchasync" element={<FetchAsyncPage />} />
        <Route path="/fetchpromiseall" element={<FetchPromiseAllPage />} />
        <Route path="/withoutpromiseall" element={<WithoutPromiseAllPage />} />
        <Route path="/usetransition" element={<UseTransitionPage />} />
        <Route path="/fetcherror" element={<FetchErrorPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/swr" element={<SwrPage />} />
        <Route path="/nprogress" element={<NprogressPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/test/:todoId" element={<TodoPage />} />
      </Routes>
    </GlobalPortal.Provider>
  );
}

export default App;
