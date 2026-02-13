import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">Campus Connect</h3>
            <p className="text-sm text-gray-400 mb-4">
              Talk to real students. Get real insights. Choose the right college with confidence.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/colleges" className="text-sm hover:text-indigo-400 transition-colors">
                  Colleges
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="text-sm hover:text-indigo-400 transition-colors">
                  Students
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm hover:text-indigo-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-sm hover:text-indigo-400 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-indigo-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-indigo-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-indigo-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Become a Mentor */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Students</h4>
            <p className="text-sm text-gray-400 mb-4">
              Are you a current student at a new-gen college? Help future students make the right choice.
            </p>
            <Link
              to="/become-mentor"
              className="inline-block text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Become a Mentor
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2025 Campus Connect. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center mt-4 md:mt-0">
            Made with <Heart size={16} className="text-red-500 mx-1 fill-current" /> for students, by students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;