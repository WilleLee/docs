import { css } from "@emotion/react";
import { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef(function Button(
  props: ButtonProps,
  forwardedRef: Ref<HTMLButtonElement>,
) {
  const { fullWidth = true, children, ...rest } = props;
  return (
    <button
      ref={forwardedRef}
      css={css`
        width: ${fullWidth ? "100%" : "auto"};
        height: 54px;
        background: orange;
        color: white;
        border-radius: 8px;
      `}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
