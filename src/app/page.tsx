import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ITSC Division</h1>
          <nav>
            <ul className="flex gap-4 items-center">
              <Link
                className="text-black rounded-md bg-white px-2 py-1"
                href="/login"
              >
                Login
              </Link>
              <Link className="hover:text-blue-200" href="#">
                Home
              </Link>
              <Link href="/contact" className="hover:text-blue-200">
                Contact
              </Link>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to ITSC Division</h2>
          <p className="text-xl mb-8">
            Providing innovative IT solutions for your business
          </p>
          <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100">
            Learn More
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Avaiable Division
          </h2>
          <div className=" overflow-x-auto">
            <div className="gap-4 w-max flex">
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Aplikasi</h3>
                <p>"Kreativitas yang Berkembang dengan Kode-Kode Kreatif."</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">DKV</h3>
                <p>"Merangkul Dunia Melalui Visualisasi yang Memikat."</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Jaringan</h3>
                <p>"Memperluas Jaringan, Memperkuat Koneksi Masa Depan."</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Web</h3>
                <p>
                  "Merancang Dunia Digital, Satu Kode Kreatif pada Satu Klik."
                </p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">IoT</h3>
                <p>"Inovasi yang Mengubah, Solusi yang Menyatukan."</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Game</h3>
                <p>"Coming Soon"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-200 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">About ITSC</h2>
          <p className="text-center max-w-2xl mx-auto">
            ITSC Division is committed to delivering cutting-edge IT solutions
            to help businesses thrive in the digital age. With our team of
            experts, we ensure that your technology needs are met with
            excellence and innovation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <form className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full mb-4 p-2 border rounded"
            />
            <textarea
              placeholder="Your Message"
              className="w-full mb-4 p-2 border rounded"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
