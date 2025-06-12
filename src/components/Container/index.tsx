import clsx from "clsx";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("relative z-10 w-full max-w-md mx-auto", className)}>
      {children}
    </div>
  );
};
