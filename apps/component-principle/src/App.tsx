import { Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./pages";
import { ReactNode } from "react";
import { GlobalPortal } from "./GlobalPortal";
import { Global, css } from "@emotion/react";
import colors from "@constants/colors";

function App() {
  return (
    <GlobalPortal.Provider>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-size: 1em;
            font-weight: normal;
          }
        `}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
      `}
    >
      <div
        css={css`
          width: 100%;
          max-width: 380px;
          height: auto;
          min-height: 100vh;
          margin: 0 auto;
          padding: 16px 8px;
          background: ${colors.background};
        `}
      >
        {children}
      </div>
    </div>
  );
}
