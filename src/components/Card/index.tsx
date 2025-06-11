export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-8 flex flex-col gap-8">
      {children}
    </div>
  );
};
