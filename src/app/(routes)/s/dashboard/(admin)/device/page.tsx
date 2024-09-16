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
    <div className="w-full">
      <div className="flex flex-row p-2 justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <BackButton className="bg-red-400 text-white px-2 py-1 rounded-md">
            Back
          </BackButton>
          <h1 className="font-bold text-xl">Device List</h1>
        </div>
        <form
          className="flex flex-row gap-2 items-center"
          action={createIotDevice}
        >
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Device name"
            className="border py-1 px-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2 px-2">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-zinc-100 rounded-xl p-2 hover:bg-zinc-200 duration-300 hover:shadow-xl"
          >
            <h1 className="ml-2 pb-1 font-bold text-lg capitalize">
              {device.name}
            </h1>
            <div className="flex flex-row w-full justify-between bg-white p-2 rounded-xl">
              <h2 className="text-md">
                Token :{" "}
                <code className="blur-sm hover:blur-0 duration-200 select-none">
                  {device.token}
                </code>
              </h2>
              <div className="flex flex-row gap-2">
                <form action={regernerateIotDeviceToken}>
                  <input
                    type="hidden"
                    name="device_id"
                    value={device.id}
                    readOnly
                  />
                  <button className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-500 duration-300">
                    <ArrowsUpDownIcon className="w-4 h-4" />
                  </button>
                </form>
                <CopyTextButton
                  value={device.token}
                  className="bg-orange-500 text-white p-1 rounded-md hover:bg-orange-600 duration-300"
                >
                  <ClipboardDocumentIcon className="w-4 h-4" />
                </CopyTextButton>
              </div>
            </div>
            <div className="flex flex-row justify-between p-1">
              <time className="text-sm">
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
                <button className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 duration-300">
                  <TrashIcon className="w-4 h-4" />
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
