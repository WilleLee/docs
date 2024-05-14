import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages";
import { Global, css } from "@emotion/react";

function App() {
  return (
    <>
      <Layout>
        <Global
          styles={css`
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-size: 1em;
              font-weight: normal;
              margin: 0;
            }
          `}
        />
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        width: 100%;
        max-width: 520px;
        min-width: 320px;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
      `}
    >
      {children}
    </div>
  );
}
