const dashboardUsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col bg-zinc-100">
      <h1 className="w-full text-center font-bold text-xl p-2">Attendance</h1>
      <div className="h-full w-full bg-white rounded-tl-xl pt-2">
        {children}
      </div>
    </div>
  );
};

export default dashboardUsersLayout;
