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
import { ReactNode, useEffect } from "react";
import nProgress from "nprogress";
import { css } from "@emotion/react";
import NprogressItemPage from "@pages/NprogressPage/NprogressItemPage";

function App() {
  useEffect(() => {
    return () => {
      nProgress.remove();
    };
  }, []);
  return (
    <GlobalPortal.Provider>
      <Layout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/xml" element={<XmlPage />} />
          <Route path="/xmlpromise" element={<XmlPromisePage />} />
          <Route path="/fetch" element={<FetchPage />} />
          <Route path="/fetchasync" element={<FetchAsyncPage />} />
          <Route path="/fetchpromiseall" element={<FetchPromiseAllPage />} />
          <Route
            path="/withoutpromiseall"
            element={<WithoutPromiseAllPage />}
          />
          <Route path="/usetransition" element={<UseTransitionPage />} />
          <Route path="/fetcherror" element={<FetchErrorPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/swr" element={<SwrPage />} />
          <Route path="/nprogress" element={<NprogressPage />} />
          <Route path="/nprogress/:item" element={<NprogressItemPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test/:todoId" element={<TodoPage />} />
        </Routes>
      </Layout>
    </GlobalPortal.Provider>
  );
}

export default App;

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        max-width: 100%;
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
        padding: 0;
        margin: 0;
        height: auto;
      `}
    >
      <div
        css={css`
          width: 100%;
          max-width: 380px;
          margin: 0 auto;
          padding: 16px 8px;
        `}
      >
        {children}
      </div>
    </div>
  );
}
