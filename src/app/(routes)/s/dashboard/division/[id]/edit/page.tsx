import {
  getDivision,
  updateDivision,
} from "@/server-action/dashboardDivisionAction";
import { division } from "@prisma/client";
import Link from "next/link";

export default async function dashboardUserCreatePage({
  params,
}: {
  params: any;
}) {
  const division = (await getDivision(Number.parseInt(params.id))) as division;

  return (
    <div className="w-screen h-screen">
      <h1 className="font-bold text-2xl w-full text-center">Edit User</h1>
      <form className="max-w-md mx-auto" action={updateDivision}>
        <input type="hidden" name="id" value={division!.id} />
        <input
          name="name"
          type="text"
          placeholder="name"
          className="w-full mb-4 p-2 border rounded"
          defaultValue={division!.name}
          required
        />

        <textarea
          name="description"
          placeholder="description"
          defaultValue={division!.description}
          className="w-full mb-4 p-2 border rounded"
          rows={4}
        ></textarea>
        <div className="flex flex-row gap-2">
          <Link
            href="/s/dashboard/division"
            className="bg-red-500 flex-1 text-white font-bold py-2 px-4 rounded hover:bg-red-600 w-full"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 flex-2 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}
