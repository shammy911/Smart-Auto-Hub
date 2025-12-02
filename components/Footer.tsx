import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Smart AutoHub</h3>
            <p className="text-sm opacity-90">Your trusted platform for finding the perfect vehicle.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vehicles" className="hover:text-primary transition">
                  Browse Vehicles
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-primary transition">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>077 232 9595</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>sameeraautotraders@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>109 Sunethradevi Rd, Nugegoda</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition" aria-label="LinkedIn">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Sameera Auto Traders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
