"use client";
import {
  ButtonProps as UIButtonProps,
  Button as UIButton,
} from "@nextui-org/button";

export type ButtonProps = Omit<UIButtonProps, "radius" | "className"> & {
  extraClassNames?: string;
};

export function Button({ children, extraClassNames, ...props }: ButtonProps) {
  return (
    <UIButton
      radius="full"
      className={`bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-lg fit self-center ${extraClassNames}`}
      {...props}
    >
      {children}
    </UIButton>
  );
}
