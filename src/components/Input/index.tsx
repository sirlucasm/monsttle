"use client";

import { useState } from "react";

import {
  Button,
  Input as InputNextUI,
  InputProps as InputNextUIProps,
} from "@heroui/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface InputProps extends InputNextUIProps {
  fullWidth?: boolean;
  type?: HTMLInputElement["type"];
  autoComplete?: "off" | "on";
}

export const Input = ({
  label,
  size = "lg",
  fullWidth = true,
  variant = "bordered",
  type,
  autoComplete,
  ...rest
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <InputNextUI
      label={label}
      size={size}
      classNames={{
        input: "text-sm text-white placeholder:text-neutral-100",
        label: "text-md !text-neutral-50",
      }}
      fullWidth={fullWidth}
      variant={variant}
      type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
      autoComplete={autoComplete}
      endContent={
        isPassword && (
          <Button
            isIconOnly
            size="sm"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            variant="light"
          >
            {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        )
      }
      {...rest}
    />
  );
};
