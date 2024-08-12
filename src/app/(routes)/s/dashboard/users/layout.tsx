const dashboardUsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="w-full text-center font-bold text-xl p-2">Manage User</h1>
      <div className="h-full w-full bg-zinc-100 rounded-tl-xl pt-2 pl-2">
        {children}
      </div>
    </div>
  );
};

export default dashboardUsersLayout;
