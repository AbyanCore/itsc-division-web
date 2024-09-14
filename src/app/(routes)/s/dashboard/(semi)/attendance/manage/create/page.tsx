import BackButton from "@/component/BackButton";
import { createAttendance } from "@/server-action/dashboardAttendanceAction";

export default async function dashboardAttendanceCreatePage({searchParams}: {searchParams: any}) {
    const isError: boolean = searchParams.error != null;
  return (
    <div className="w-screen h-screen">
      <h1 className="font-bold text-2xl w-full text-center">
        Create Attendance
      </h1>
      <form className="max-w-md mx-auto" action={createAttendance}>
        {isError && (
          <p className="text-red-500 rounded">
            {searchParams.error}
          </p>
        )}
        <input
          name="name"
          type="text"
          placeholder="title"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="description"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          name="start_at"
          type="datetime-local"
          placeholder="start at"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          name="end_at"
          type="datetime-local"
          placeholder="end at"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <div className="flex flex-row gap-2">
          <BackButton className="bg-red-500 flex-1 text-white font-bold py-2 px-4 rounded hover:bg-red-600 w-full">
            Back
          </BackButton>
          <button
            type="submit"
            className="bg-blue-500 flex-2 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Create Attendance
          </button>
        </div>
      </form>
    </div>
  );
}
