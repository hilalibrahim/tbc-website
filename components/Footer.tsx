import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-dark border-t border-gray-800 relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Company Info */}
          <div>
               <Image
                         src="/logotbc.png"
                         alt="Logo"
                         width={150}
                         height={60}
                         className="h-auto w-auto filter invert"
                         priority
                       />
            <p className="text-gray-300 leading-relaxed">
              Building digital solutions with precision and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-heading text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/services" className="hover:text-accent transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-accent transition-colors duration-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-lg font-heading text-white">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li>Email: info@marketingagency.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} The Big Connection | Pitstopia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
