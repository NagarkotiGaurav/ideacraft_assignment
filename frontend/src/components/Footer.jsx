import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-yellow-500 text-black px-10 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Host + Logo */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Host</h3>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="IdeaCraft Logo" className="h-10" />
          </div>
          <p className="text-sm mt-2">Your approved supplier of merchandise</p>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-2">
            <li>Clothing</li>
            <li>Travel</li>
            <li>Office</li>
            <li>Clocks & Watches</li>
            <li>Accessories</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact us</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              <p>
                Building No./Flat No.: 1011–1018, 10th Floor, Tower 4,<br />
                DLF Corporate Greens,<br />
                Southern Peripheral Road, Sector 74A,<br />
                GURGAON, Gurugram, Haryana, 122004
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:jcb@ideacraft.com">jcb@ideacraft.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+911246010900">+91-124-6010900</a>
            </div>
          </div>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Contact</li>
            <li>FAQ's</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>Shipping Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
