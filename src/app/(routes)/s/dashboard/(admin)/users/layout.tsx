const dashboardUsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
      <h1 className="w-full text-center font-bold text-xl p-2 text-zinc-800 dark:text-zinc-200">
        Manage User
      </h1>
      <div className="h-full w-full bg-white dark:bg-zinc-900 rounded-tl-xl pt-2 shadow-md">
        {children}
      </div>
    </div>
  );
};

export default dashboardUsersLayout;
