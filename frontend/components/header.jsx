"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, X, Menu } from "lucide-react"
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
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
          >
            EcoMart
          </Link>

          {/* Search bar - always visible, shrinks on mobile */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-8 relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search eco-friendly products..."
                className="pl-10 pr-10 border-green-200 focus:border-green-400 text-sm sm:text-base"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length > 0 && setShowResults(true)}
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
            {showResults && (
              <SearchResults
                results={searchResults}
                isLoading={isSearching}
                query={searchQuery}
                onResultClick={handleResultClick}
              />
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
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
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                  {user.role === "admin" && (
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                {user.role !== "admin" && (
                  <Link href="/orders">
                    <Button variant="ghost" size="sm">
                      My Orders
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={logout} size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
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
