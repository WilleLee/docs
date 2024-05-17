import { GlobalPortal } from "@/GlobalPortal";
import { css } from "@emotion/react";
import { ReactNode } from "react";

interface ModalProps {
  onCloseModal: () => void;
  children: ReactNode;
}

export default function Modal({ onCloseModal, children }: ModalProps) {
  return (
    <GlobalPortal.Element>
      <div
        css={css`
          width: 100%;
          height: 100%;
          position: fixed;
          left: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        onClick={() => {
          const ok = confirm("close?");
          if (ok) onCloseModal();
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          css={css`
            position: relative;
            background: #242424;
            border-radius: 10px;
          `}
        >
          <div
            css={css`
              padding: 24px;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
              `}
            >
              <button onClick={() => onCloseModal()}>X</button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </GlobalPortal.Element>
  );
}
