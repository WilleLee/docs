import { ReactNode, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const PortalContext = createContext<HTMLDivElement | null>(null);

interface PortalProviderProps {
  children: ReactNode;
}

function PortalProvider({ children }: PortalProviderProps) {
  const [portalContainerRef, setPortalContainerRef] =
    useState<HTMLDivElement | null>(null);
  return (
    <PortalContext.Provider value={portalContainerRef}>
      {children}
      <div
        id="portal-container"
        ref={(elem) => {
          if (!elem || portalContainerRef !== null) return;
          setPortalContainerRef(elem);
        }}
      />
    </PortalContext.Provider>
  );
}

interface PortalElementProps {
  children: ReactNode;
}

function PortalElement({ children }: PortalElementProps) {
  const portalContainerRef = useContext(PortalContext);

  if (!portalContainerRef) return null;

  return createPortal(children, portalContainerRef);
}

export const GlobalPortal = {
  Provider: PortalProvider,
  Element: PortalElement,
};
