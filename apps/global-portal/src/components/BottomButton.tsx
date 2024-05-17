import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";
import { css } from "@emotion/react";
import { GlobalPortal } from "@/GlobalPortal";
import Button from "@components/Button";

const BottomButton = forwardRef(function BottomButton(
  props: ComponentPropsWithoutRef<typeof Button>,
  forwardedRef: Ref<HTMLButtonElement>,
) {
  return (
    <GlobalPortal.Element>
      <div
        css={css`
          width: 100%;
          position: fixed;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999;
        `}
      >
        <div
          css={css`
            padding: 0 8px 16px;
          `}
        >
          <Button {...props} ref={forwardedRef} />
        </div>
      </div>
    </GlobalPortal.Element>
  );
});

export default BottomButton;
