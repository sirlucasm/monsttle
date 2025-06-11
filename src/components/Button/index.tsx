import clsx from "clsx";
import Link from "next/link";

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
}

const Button3D = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  href,
  type = "button",
}: Button3DProps) => {
  const baseStyles = `
    relative
    font-semibold
    border-0
    cursor-pointer
    transition-all
    duration-200
    transform-gpu
    select-none
    active:translate-y-1
    active:shadow-sm
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:active:translate-y-0
    disabled:active:shadow-lg
    flex
    items-center
    justify-center
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-b from-primary to-primary/80
      hover:from-primary/90 hover:to-primary/80
      text-primary-foreground
      shadow-[0_6px_0_hsl(var(--primary)/0.8),0_8px_25px_hsl(var(--primary)/0.3)]
      hover:shadow-[0_4px_0_hsl(var(--primary)/0.8),0_6px_20px_hsl(var(--primary)/0.4)]
      border-b-4 border-primary/80
    `,
    secondary: `
      bg-gradient-to-b from-secondary to-secondary/80
      hover:from-secondary/90 hover:to-secondary/80
      text-secondary-foreground
      shadow-[0_6px_0_hsl(var(--secondary)/0.8),0_8px_25px_hsl(var(--secondary)/0.3)]
      hover:shadow-[0_4px_0_hsl(var(--secondary)/0.8),0_6px_20px_hsl(var(--secondary)/0.4)]
      border-b-4 border-secondary/80
    `,
    white: `
      bg-gradient-to-b from-white to-white/80
      hover:from-white/90 hover:to-white/80
      text-white-foreground
      shadow-[0_6px_0_hsl(var(--white)/0.8),0_8px_25px_hsl(var(--white)/0.3)]
      hover:shadow-[0_4px_0_hsl(var(--white)/0.8),0_6px_20px_hsl(var(--white)/0.4)]
      border-b-4 border-white/80
    `,
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  return href ? (
    <Link
      href={href}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button3D;
