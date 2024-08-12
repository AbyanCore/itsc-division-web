const ContactPage = () => {
  return (
    <div className="w-screen h-screen">
      <h1 className="font-bold text-2xl w-full text-center">Contact Us</h1>
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
  );
};

export default ContactPage;
