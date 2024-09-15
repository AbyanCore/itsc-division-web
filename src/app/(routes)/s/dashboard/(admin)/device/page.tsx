import BackButton from "@/component/BackButton";
import iotdeviceService from "@/service/iotdeviceService";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const dummyIoTDevices = [
  {
    id: 1,
    name: "Smart Thermostat",
    token: "8f3c2e1e-3397-4449-83c7-d0049573733c",
    create_at: new Date("2024-09-10T10:30:00Z"),
    update_at: new Date("2024-09-12T14:15:00Z"),
  },
  {
    id: 2,
    name: "Security Camera",
    token: "2a7b1d3c-4e5f-4g6h-9i0j-k1l2m3n4o5p6q",
    create_at: new Date("2024-09-05T08:00:00Z"),
    update_at: null,
  },
  {
    id: 3,
    name: "Smart Light Bulb",
    token: "7r8s9t0u-5v6w-7x8y-9z0a-b1c2d3e4f5g6",
    create_at: new Date("2024-08-20T16:45:00Z"),
    update_at: new Date("2024-09-01T12:00:00Z"),
  },
  {
    id: 4,
    name: "Smart Door Lock",
    token: "3f2g1h0i-7j8k-9l0m-1n2o-3p4q5r6s7t8",
    create_at: new Date("2024-07-15T20:20:00Z"),
    update_at: new Date("2024-08-10T09:30:00Z"),
  },
];

const DashboardDevicePage = async () => {
  const devices = await iotdeviceService.getIotDevices();

  return (
    <div className="w-full">
      <div className="flex flex-row p-2 justify-between items-center">
        <div className="flex flex-row gap-1 items-center">
          <BackButton className="bg-red-400 text-white p-1">Back</BackButton>
          <h1>Device List</h1>
        </div>
        <Link href={"#"} className="bg-blue-500 text-white p-1">
          <PlusIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="flex flex-col gap-2 px-2">
        {dummyIoTDevices.map((device) => (
          <div
            key={device.id}
            className="bg-zinc-100 rounded-xl p-2 hover:bg-zinc-200 duration-300 hover:my-2 hover:shadow-xl hover:scale-105"
          >
            <h1 className="ml-2 font-bold text-lg">{device.name}</h1>
            <p>Token : {device.token}</p>
            <time>Create At : {device.update_at?.toISOString()}</time>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardDevicePage;
