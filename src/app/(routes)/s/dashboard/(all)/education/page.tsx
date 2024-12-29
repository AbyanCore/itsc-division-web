"use client";

import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";

const datas: Array<{
  id: number;
  title: string;
  description: string;
  image: string;
  division: string;
  date: string;
}> = [
  {
    id: 1,
    title: "Introduction to IoT",
    description: "Learn the basics of Internet of Things.",
    image: "https://picsum.photos/seed/iot-intro/800/450",
    division: "Beginner",
    date: "2023-01-15",
  },
  {
    id: 2,
    title: "Advanced IoT Applications",
    description: "Explore advanced applications of IoT.",
    image: "https://picsum.photos/seed/iot-advanced/800/450",
    division: "Advanced",
    date: "2023-02-20",
  },
  {
    id: 3,
    title: "IoT Security",
    description: "Understand the security aspects of IoT.",
    image: "https://picsum.photos/seed/iot-security/800/450",
    division: "Intermediate",
    date: "2023-03-10",
  },
  {
    id: 4,
    title: "IoT in Healthcare",
    description: "Discover how IoT is transforming healthcare.",
    image: "https://picsum.photos/seed/iot-healthcare/800/450",
    division: "Intermediate",
    date: "2023-04-05",
  },
  {
    id: 5,
    title: "IoT and Smart Homes",
    description: "Learn about IoT applications in smart homes.",
    image: "https://picsum.photos/seed/iot-smart-homes/800/450",
    division: "Beginner",
    date: "2023-05-25",
  },
];

const dashboardEducationPage = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <nav className="fixed rounded-xl z-10 p-2 w-full h-fit backdrop-blur-xl">
        <form className="flex flex-row items-center gap-2">
          <input
            name="search"
            id="search"
            className="border rounded-lg p-2"
            placeholder="Search"
          />
          <button className="rounded-lg p-2 bg-blue-500 text-white">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </form>
      </nav>
      <div className="w-full h-full flex flex-col p-1 mt-[5vh] overflow-y-auto">
        {datas.map((data) => (
          <div key={data.id} className="flex flex-row">
            <div className="flex flex-col items-center">
              <span className="w-4 h-4 bg-black rounded-full" />
              <span className="w-1 h-full bg-gray-500" />
            </div>
            <div>
              <h1>{data.title}</h1>
              <h2>{data.description}</h2>
              <h3>{data.division}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashboardEducationPage;
