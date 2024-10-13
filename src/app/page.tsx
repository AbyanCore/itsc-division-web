import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed z-20 w-full backdrop-blur-lg backdrop-brightness-[0.25]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">
            ITSC
          </h1>
          <nav>
            <ul className="flex flex-col sm:flex-row sm:gap-6 items-center">
              <li>
                <Link
                  href="/s/dashboard"
                  className="text-blue-400 hover:text-blue-300 transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/static/images/bg.webp"
            alt="bg"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="p-8 rounded-lg inline-block select-none">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500 drop-shadow-2xl">
              ITSC Division
            </h2>
            <p className="text-md md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              Memberdayakan inovasi melalui solusi TI terdepan
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black bg-opacity-70 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">
            Our Innovative Divisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Aplikasi",
                desc: "Kreativitas yang Berkembang dengan Kode-Kode Kreatif.",
                icon: "💻",
              },
              {
                title: "DKV",
                desc: "Merangkul Dunia Melalui Visualisasi yang Memikat.",
                icon: "🎨",
              },
              {
                title: "Jaringan",
                desc: "Memperluas Jaringan, Memperkuat Koneksi Masa Depan.",
                icon: "🌐",
              },
              {
                title: "Web",
                desc: "Merancang Dunia Digital, Satu Kode Kreatif pada Satu Klik.",
                icon: "🌍",
              },
              {
                title: "IoT",
                desc: "Inovasi yang Mengubah, Solusi yang Menyatukan.",
                icon: "🤖",
              },
              {
                title: "Game",
                desc: "Membuka Pintu ke Dunia Interaktif yang Menakjubkan.",
                icon: "🎮",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 p-8 rounded-lg hover:shadow-2xl hover:shadow-gray-800 transition duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative z-10 bg-black bg-opacity-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">
            About ITSC
          </h2>
          <p className="text-center max-w-3xl mx-auto text-lg text-gray-300">
            Divisi ITSC berada di garis depan inovasi teknologi, berkomitmen
            untuk memberikan solusi TI mutakhir yang memberdayakan bisnis untuk
            berkembang di era digital. Tim ahli kami menggabungkan kreativitas
            dengan keahlian teknis untuk memastikan kebutuhan teknologi Anda
            terpenuhi dengan solusi yang unggul dan berpikiran maju.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="py-24 bg-black bg-opacity-50 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Get in Touch
          </h2>
          <form className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
            />
            <textarea
              placeholder="Your Message"
              className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </section> */}
    </main>
  );
}
