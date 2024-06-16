"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const PortalContext = createContext<HTMLDivElement | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [portalRef, setPortalRef] = useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={portalRef}>
      {children}
      <div
        ref={(elem) => {
          if (!elem || portalRef) return;
          setPortalRef(elem);
        }}
      />
    </PortalContext.Provider>
  );
}

export function PortalConsumer({ children }: { children: ReactNode }) {
  const portalContainer = useContext(PortalContext);

  if (!portalContainer) return null;

  return createPortal(children, portalContainer);
}
