import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button className={clsx(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}
