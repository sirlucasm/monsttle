export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 w-full max-w-md mx-auto">{children}</div>
  );
};
