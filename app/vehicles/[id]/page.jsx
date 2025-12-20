"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, MessageSquare, Loader2, Heart, X, ChevronRight, ArrowLeft } from 'lucide-react'
import ChatBot from "@/components/ChatBot"
import { vehicleAPI } from "../../../lib/api/vehicles"
import { localStorageAPI } from "@/lib/storage/localStorage.js"


export default function VehicleDetailsPage({ params: paramsPromise }) {
  const params = use(paramsPromise)
  //const vehicle = vehiclesData[params.id] || vehiclesData["1"]
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [monthlyPayment, setMonthlyPayment] = useState(0)
  //const [loanAmount, setLoanAmount] = useState(vehicle.price)
  const [loanAmount, setLoanAmount] = useState(0)
  const [downPayment, setDownPayment] = useState(0)
  const [loanTerm, setLoanTerm] = useState(5)

  const [isFavourite, setIsFavourite] = useState(false)

  // Mock images array for gallery - in production, this would come from vehicle data
  const vehicleImages = [
    vehicle?.image || "/placeholder.svg",
    "/vehicle-angle-.jpg?height=400&width=600&query=vehicle front angle",
    "/vehicle-angle-.jpg?height=400&width=600&query=vehicle side angle",
    "/vehicle-angle-.jpg?height=400&width=600&query=vehicle interior",
  ]

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true)
      const result = await vehicleAPI.getVehicleById(params.id)

      if(result.success) {
        setVehicle(result.data)
        setLoanAmount(result.data.price)

        // Track recently viewed vehicles in localStorage
        localStorageAPI.addRecentlyViewed(params.id)
        setIsFavourite(localStorageAPI.isFavourite(params.id))
      } else {
        setError(result.error)
      }
      setLoading(false)
    }

    fetchVehicle()
  }, [params.id])


  const calculatePayment = () => {
    const principal = loanAmount - downPayment
    const monthlyRate = 0.06 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyPaymentCalc =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    setMonthlyPayment(monthlyPaymentCalc)
  }

  const toggleFavourite = () => {
    if (isFavourite) {
      localStorageAPI.removeFavourite(params.id)
      setIsFavourite(false)
    } else {
      localStorageAPI.addFavourite(params.id)
      setIsFavourite(true)
    }
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicleImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicleImages.length) % vehicleImages.length)
  }

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && lightboxOpen) {
        closeLightbox()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [lightboxOpen])


  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-16 h-16 animate-spin text-primary" /> 
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The vehicle you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/vehicles">Back to Vehicle Listing</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition p-2 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Previous button */}
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 transition p-3 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Current image */}
          <div className="max-w-6xl max-h-[90vh] p-4">
            <img
              src={vehicleImages[currentImageIndex] || "/placeholder.svg"}
              alt={`${vehicle?.name} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4">
              {currentImageIndex + 1} / {vehicleImages.length}
            </p>
          </div>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 transition p-3 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/vehicles">
            <ArrowLeft size={18} className="mr-2" />
            Back to Search
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div 
              className="bg-muted rounded-lg overflow-hidden mb-4 h-80 cursor-pointer group relative"
              onClick={() => openLightbox(0)}  
            >
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay hint on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold bg-black/50 px-4 py-2 rounded-lg">
                  Click to enlarge
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {vehicleImages.slice(1, 4).map((img, i) => (
                <div
                  key={i}
                  className="bg-muted rounded h-20 cursor-pointer hover:ring-2 hover:ring-primary transition"
                  onClick={() => openLightbox(i + 1)}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`thumbnail ${i + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-4xl font-bold">{vehicle?.name || 'Vehicle'}</h1>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleFavourite}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Heart className={`w-5 h-5 ${isFavourite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavourite ? "Saved" : "Save"}
                </Button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">LKR {vehicle?.price?.toLocaleString?.() || 'N/A'}</span>
                <span
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    vehicle?.status === "Available"
                      ? "bg-green-500/20 text-green-700"
                      : vehicle?.status === "Shipped" 
                        ? "bg-yellow-500/20 text-yellow-700"
                        : "bg-red-500/20 text-red-700"
                  }`}
                >
                  {vehicle?.status || 'Unknown'}
                </span>
              </div>
              <p className="text-lg text-muted-foreground">{vehicle?.location || 'N/A'}</p>
            </div>

            {/* Key Details Table */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Vehicle Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Make</p>
                  <p className="font-semibold">{vehicle?.make || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-semibold">{vehicle?.model || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold">{vehicle?.year || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-semibold">{vehicle?.type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-semibold">{vehicle?.mileage ? vehicle.mileage.toLocaleString() : 'N/A'} km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-semibold">{vehicle?.transmission || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-semibold">{vehicle?.fuelType || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button asChild className="flex-1 h-12" size="lg">
                <Link href="/consultation">Book an Appointment</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 h-12 bg-transparent" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-lg border border-border p-6 mb-12">
          <h3 className="font-bold text-xl mb-4">Description</h3>
          <p className="text-foreground leading-relaxed">{vehicle?.description || 'No description available'}</p>
        </div>

        {/* Leasing Calculator */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-border p-8 mb-12">
          <h3 className="font-bold text-2xl mb-6">Estimate Your Monthly Payment</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Loan Amount (LKR)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Down Payment (LKR)</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full px-4 py-3 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Loan Term (Years)</label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full px-4 py-3 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((year) => (
                  <option key={year} value={year}>
                    {year} {year === 1 ? "year" : "years"}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button onClick={calculatePayment} className="w-full h-12">
                Calculate Payment
              </Button>
            </div>
          </div>

          {monthlyPayment > 0 && (
            <div className="mt-6 p-4 bg-primary/20 rounded-lg border border-primary/30">
              <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Payment</p>
              <p className="text-3xl font-bold text-primary">
                LKR {monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Based on 6% annual interset rate.
                Actual rates may vary.
              </p>
            </div>
          )}
        </div>

        {/* Similar Vehicles Section */}
        <div className="mb-12">
          <h3 className="font-bold text-2xl mb-6">Similar Vehicles you might like</h3>
          <div className="bg-card rounded-lg border border-border p-6 text-center">
            <p className="text-muted-foreground">
              Check out our{" "}
              <Link href="/vehicles" className="text-primary font-semibold hover:underline">
                full inventory
              </Link>{" "}
              for more options
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        {/* <div className="mb-12">
          <h3 className="font-bold text-2xl mb-6">Customer Reviews</h3>

          <div className="space-y-4 mb-8">
            {vehicle?.reviews && Array.isArray(vehicle.reviews) && vehicle.reviews.length > 0 ? (
              vehicle.reviews.map((review, idx) => (
                <div key={idx} className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold">{review?.author || 'Anonymous'}</p>
                    <div className="flex gap-1">
                      {[...Array(review?.rating || 0)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground">{review?.text || 'No review text'}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No reviews available yet</p>
            )}
          </div>

          <Button variant="outline" className="w-full h-12 bg-transparent">
            Write a Review (Sign in required)
          </Button>
        </div> */}
      </div>

      {/* Chatbot Icon */}
      <ChatBot />

      <Footer />
    </div>
  )
}
