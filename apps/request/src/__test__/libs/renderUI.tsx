import { GlobalPortal } from "@/GlobalPortal";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

type Path = `/${string}`;

interface Props {
  children: ReactNode;
}

export function wrapper({ children }: Props, path?: Path) {
  return (
    <GlobalPortal.Provider>
      <MemoryRouter initialEntries={[path || "/"]}>{children}</MemoryRouter>
    </GlobalPortal.Provider>
  );
}
