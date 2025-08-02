export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-gray-700">
        
        {/* Left Section: Contact Information */}
        <div className="space-y-6 text-gray-300">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Contact Ticket Master
          </h1>
          <p className="text-lg text-gray-400">
            Have questions about your bookings, upcoming events, or need help? Reach out via email, phone, or the form — we're here to help!
          </p>

          <div className="space-y-3">
            <p className="text-lg text-gray-200 font-semibold">
              Email:{" "}
              <a
                href="mailto:support@ticketmaster.com"
                className="text-blue-400 hover:text-blue-500 transition"
              >
                support@ticketmaster.com
              </a>
            </p>

            <p className="text-lg text-gray-200 font-semibold">
              Phone: <span className="text-blue-400">+1 888-TKT-MSTR</span>
            </p>
          </div>

          <a
            href="./faq"
            className="inline-block text-blue-400 font-medium underline hover:text-blue-500 transition"
          >
            Browse Frequently Asked Questions
          </a>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">Customer Support Hours</h2>
              <p className="text-gray-400">Monday to Saturday, 10 AM – 8 PM</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Vendor & Partnership Inquiries</h2>
              <p className="text-gray-400">Interested in hosting events with us? Let’s connect.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Press & Media</h2>
              <p className="text-lg text-gray-200 font-semibold">
                Email:{" "}
                <a
                  href="mailto:media@ticketmaster.com"
                  className="text-blue-400 hover:text-blue-500 transition"
                >
                  media@ticketmaster.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="bg-gray-800/60 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-900 text-gray-300"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-900 text-gray-300"
              />
            </div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-900 text-gray-300"
            />
            <div className="grid grid-cols-3 gap-4">
              <select className="w-full p-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-900 text-gray-300">
                <option value="+1">+1</option>
                <option value="+91">+91</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="text"
                placeholder="Phone Number"
                className="col-span-2 w-full p-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-900 text-gray-300"
              />
            </div>
            <textarea
              placeholder="Tell us how we can assist you (e.g. ticket issue, refund request, event details)..."
              className="w-full p-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-900 text-gray-300"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Submit Inquiry
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            By reaching out, you agree to our{" "}
            <a href="#" className="text-blue-400 underline hover:text-blue-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 underline hover:text-blue-500">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
