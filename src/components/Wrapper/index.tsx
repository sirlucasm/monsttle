import clsx from "clsx";
import { Background } from "../Background";

type WrapperProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  as?: keyof HTMLElementTagNameMap;
  mb?: number;
};

export const Wrapper = ({
  children,
  as = "div",
  className,
  mb = 0,
  ...props
}: WrapperProps) => {
  const Tag = as as any;
  return (
    <Tag
      className={clsx(
        `px-6 mx-auto max-w-(--breakpoint-md) w-full md:max-w-(--breakpoint-sl) md:px-28 lg:px-44`,
        "min-h-screen bg-gradient-to-br from-slate-900 via-secondary-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden",
        className
      )}
      style={{ marginBottom: mb }}
      {...props}
    >
      <Background />
      {children}
    </Tag>
  );
};
