"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, X, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useSearch } from "@/hooks/use-search"
import { SearchResults } from "@/components/search-results"
import { useState, useRef, useEffect } from "react"

export function Header() {
  const { items } = useCart()
  const { user, logout } = useAuth()
  const { searchQuery, setSearchQuery, searchResults, isSearching, clearSearch } = useSearch()
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowResults(value.length > 0)
  }

  const handleClearSearch = () => {
    clearSearch()
    setShowResults(false)
  }

  const handleResultClick = () => {
    setShowResults(false)
  }

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
          >
            EcoMart
          </Link>

          {/* Navigation in the center */}
          <nav className="hidden md:flex flex-1 justify-center items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600">HOME</Link>
            <a
              href="/"
              className="text-sm font-medium hover:text-green-600 cursor-pointer"
              onClick={e => {
                e.preventDefault();
                if (window.location.pathname === "/") {
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.href = "/#products";
                }
              }}
            >
              PRODUCTS
            </a>
            <Link href="/orders" className="text-sm font-medium hover:text-green-600">MY ORDERS</Link>
          </nav>

          {/* Icons and profile on the right */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Search Icon - opens search bar as before */}
            <div ref={searchRef} className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowResults(true)}>
                <Search className="h-5 w-5" />
              </Button>
              {showResults && (
                <div className="absolute right-0 mt-2 w-64 z-50">
                  <div className="relative">
                    <Input
                      placeholder="Search eco-friendly products..."
                      className="pl-10 pr-10 border-green-200 focus:border-green-400 text-sm sm:text-base"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      autoFocus
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={handleClearSearch}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <SearchResults
                    results={searchResults}
                    isLoading={isSearching}
                    query={searchQuery}
                    onResultClick={handleResultClick}
                  />
                </div>
              )}
            </div>
            {/* Favorite Icon - for future functionality */}
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            {/* Cart Icon - as before */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {/* Profile/User section with hover dropdown */}
            {user && (
              <div className="relative group">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">{user.name}</div>
                  {user.role === "admin" && (
                    <Link href="/admin">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </div>
            )}
            {!user && (
              <div className="flex items-center space-x-1">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6 text-green-700" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileNavOpen(false)}>
          <div
            className="fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white shadow-lg p-6 flex flex-col gap-6 animate-slide-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                onClick={() => setMobileNavOpen(false)}
              >
                EcoMart
              </Link>
              <button
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link href="/cart" onClick={() => setMobileNavOpen(false)} className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart
                {itemCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Link>
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                    {user.role === "admin" && (
                      <Badge variant="secondary" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                  {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setMobileNavOpen(false)}>
                      Admin Panel
                    </Link>
                  )}
                  {user.role !== "admin" && (
                    <Link href="/orders" onClick={() => setMobileNavOpen(false)}>
                      My Orders
                    </Link>
                  )}
                  <button
                    className="text-left text-red-600 mt-2"
                    onClick={() => {
                      logout()
                      setMobileNavOpen(false)
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileNavOpen(false)}>
                    Login
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileNavOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
