"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/Logo.jpg"
            alt="Sameera Auto Traders Logo"
            width={120}
            height={60}
            className="object-contain"
            priority
          />
          {/* <span className="text-2xl font-bold text-primary">Smart AutoHub</span> */}
          <div className="flex flex-col sm:flex-row sm:items-center leading-tight">
            <span className="text-3xl font-extrabold tracking-wide 
              bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent px-1">
              Smart
            </span>

            <span className="text-3xl font-extrabold text-black sm:ml-1">
              Auto
            </span>

            <span className="text-3xl font-extrabold text-red-700">
              Hub
            </span>
          </div>


        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition">
            Home
          </Link>
          <Link href="/vehicles" className="text-foreground hover:text-primary transition">
            Find a Car
          </Link>
          <Link href="/consultation" className="text-foreground hover:text-primary transition">
            Book Consultation
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition">
            About Us
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block text-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/vehicles" className="block text-foreground hover:text-primary">
              Find a Car
            </Link>
            <Link href="/consultation" className="block text-foreground hover:text-primary">
              Book Consultation
            </Link>
            <Link href="/about" className="block text-foreground hover:text-primary">
              About Us
            </Link>
            <Link href="/contact" className="block text-foreground hover:text-primary">
              Contact
            </Link>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
