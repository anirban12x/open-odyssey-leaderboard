import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#101010] text-gray-300 py-10 mt-10 
    border-t-2 border-t-purple-600">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div className="footer-col">
            <h4 className="text-white text-xl font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-400">Open Odyssey 1.0</a></li>
              <li><a href="#" className="hover:text-red-400">Event Details</a></li>
              <li><a href="#" className="hover:text-red-400">Organizers</a></li>
              <li><a href="#" className="hover:text-red-400">Contribute</a></li>
            </ul>
          </div>

          {/* Get Help Section */}
          <div className="footer-col">
            <h4 className="text-white text-xl font-semibold mb-4">Get Help</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-400">FAQ</a></li>
              <li><a href="#" className="hover:text-red-400">Rules & Guidelines</a></li>
              <li><a href="#" className="hover:text-red-400">Technical Support</a></li>
              <li><a href="#" className="hover:text-red-400">Contact Us</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="footer-col">
            <h4 className="text-white text-xl font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-400">Leaderboard</a></li>
              <li><a href="#" className="hover:text-red-400">Project Submissions</a></li>
              <li><a href="#" className="hover:text-red-400">Mentorship Program</a></li>
              <li><a href="#" className="hover:text-red-400">Workshop Materials</a></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="footer-col">
            <h4 className="text-white text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-400"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-red-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-red-400"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-red-400"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
