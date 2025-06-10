import clsx from "clsx";

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
        `px-6 mx-auto max-w-(--breakpoint-sm) w-full md:max-w-(--breakpoint-sl) md:pl-24 md:px-16 lg:px-40`,
        className
      )}
      style={{ marginBottom: mb }}
      {...props}
    >
      {children}
    </Tag>
  );
};
