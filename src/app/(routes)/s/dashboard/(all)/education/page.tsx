import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

const dashboardEducationPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-2 p-2 px-4 bg-zinc-200 rounded-xl">
        <ExclamationTriangleIcon className="w-4 h-4" />
        <h1 className="font-bold text-xl">Under Maintance</h1>
        <ExclamationTriangleIcon className="w-4 h-4" />
      </div>
    </div>
  );
};

export default dashboardEducationPage;
