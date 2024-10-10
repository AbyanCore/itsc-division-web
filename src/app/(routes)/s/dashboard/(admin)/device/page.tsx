import BackButton from "@/component/BackButton";
import CopyTextButton from "@/component/CopyTextButton";
import ErrorAlert from "@/component/ErrorAlert";
import {
  createIotDevice,
  deleteIotDevice,
  getIotDevices,
  regernerateIotDeviceToken,
} from "@/server-action/dashboardIotdeviceAction";
import {
  ArrowsUpDownIcon,
  ClipboardDocumentIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

const DashboardDevicePage = async ({ searchParams }: { searchParams: any }) => {
  const devices = await getIotDevices();
  const error = searchParams.error;

  return (
    <div className="w-full h-[100vh] sm:h-full dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BackButton className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
            Back
          </BackButton>
        </div>
        <form action={createIotDevice} className="flex items-center gap-2">
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Device name"
            className="border py-2 px-4 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl hover:shadow-lg transition-shadow duration-300"
          >
            <h1 className="text-lg font-bold capitalize">{device.name}</h1>
            <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-lg mt-2">
              <h2 className="text-md">
                Token :{" "}
                <code className="blur-sm hover:blur-0 transition duration-300 select-none">
                  {device.token}
                </code>
              </h2>
              <div className="flex items-center gap-2">
                <form action={regernerateIotDeviceToken}>
                  <input
                    type="hidden"
                    name="device_id"
                    value={device.id}
                    readOnly
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded-md transition duration-300">
                    <ArrowsUpDownIcon className="w-5 h-5" />
                  </button>
                </form>
                <CopyTextButton
                  value={device.token}
                  className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white p-2 rounded-md transition duration-300"
                >
                  <ClipboardDocumentIcon className="w-5 h-5" />
                </CopyTextButton>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <time className="text-sm text-gray-600 dark:text-gray-400">
                {device.create_at?.toLocaleString("id-ID")} -{" "}
                {device.update_at?.toLocaleString("id-ID")}
              </time>
              <form action={deleteIotDevice}>
                <input
                  type="hidden"
                  name="device_id"
                  value={device.id}
                  readOnly
                />
                <button className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white p-2 rounded-md transition duration-300">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
      {error ? <ErrorAlert error={error} /> : null}
    </div>
  );
};

export default DashboardDevicePage;
