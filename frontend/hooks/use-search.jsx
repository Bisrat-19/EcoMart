"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { productService } from "@/services/product-service"
import { useDebounce } from "@/hooks/use-debounce"

const SearchContext = createContext(null)

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      try {
        const results = await productService.searchProducts(debouncedSearchQuery)
        setSearchResults(results)

        // Add to search history if results found
        if (results.length > 0) {
          addToSearchHistory(debouncedSearchQuery)
        }
      } catch (error) {
        console.error("Search error:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    performSearch()
  }, [debouncedSearchQuery])

  const addToSearchHistory = (query) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item !== query)
      return [query, ...filtered].slice(0, 5) // Keep only last 5 searches
    })
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        searchHistory,
        clearSearch,
        clearSearchHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
