import { Navigate, Route, Routes } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { GlobalPortal } from "@/GlobalPortal";
import StartPage from "@pages/StartPage";
import SubPage from "@pages/SubPage";

function App() {
  return (
    <GlobalPortal.Provider>
      <Global
        styles={css`
          box-sizing: border-box;
          button {
            cursor: pointer;
            background: inherit;
            border: none;
            &:focus,
            &:focus-visible {
              outline: none;
            }
          }
        `}
      />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/sub" element={<SubPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </GlobalPortal.Provider>
  );
}

export default App;
