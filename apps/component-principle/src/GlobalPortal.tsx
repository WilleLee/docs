import { ReactNode, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const PortalContext = createContext<HTMLDivElement | null>(null);

function PortalProvider({ children }: { children: ReactNode }) {
  const [portalRef, setPortalRef] = useState<HTMLDivElement | null>(null);
  return (
    <PortalContext.Provider value={portalRef}>
      {children}
      <div
        id="portal-container"
        ref={(elem) => {
          if (!elem || portalRef) return;
          setPortalRef(elem);
        }}
      />
    </PortalContext.Provider>
  );
}

function PortalElement({ children }: { children: ReactNode }) {
  const portalContainer = useContext(PortalContext);

  if (!portalContainer) return null;

  return createPortal(children, portalContainer);
}

export const GlobalPortal = {
  Provider: PortalProvider,
  Element: PortalElement,
};
