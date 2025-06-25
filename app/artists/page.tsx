"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArtistCard } from "@/components/artist-card";
import { FilterSidebar } from "@/components/filter-sidebar";
import { Search, Grid, List, SlidersHorizontal } from "lucide-react";
import { Artist } from "@/types";
import artistsData from "@/data/artists.json";

export default function ArtistsPage() {
  const searchParams = useSearchParams();
  const [artists] = useState<Artist[]>(artistsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    categories: [] as string[],
    locations: [] as string[],
    feeRanges: [] as string[]
  });

  // Set initial category filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && !filters.categories.includes(categoryParam)) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [searchParams, filters.categories]);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      // Search filter
      const matchesSearch = !searchTerm || 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = filters.categories.length === 0 ||
        artist.categories.some(cat => filters.categories.includes(cat));

      // Location filter
      const matchesLocation = filters.locations.length === 0 ||
        filters.locations.includes(artist.location);

      // Fee range filter
      const matchesFeeRange = filters.feeRanges.length === 0 ||
        filters.feeRanges.includes(artist.feeRange);

      return matchesSearch && matchesCategory && matchesLocation && matchesFeeRange;
    });
  }, [artists, searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Discover Artists
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the perfect artist for your event from our curated collection
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search artists, categories, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="transition-all duration-300"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="transition-all duration-300"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              onFiltersChange={setFilters}
              activeFilters={filters}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {filteredArtists.length === 0 ? (
              <div className="text-center py-20">
                <SlidersHorizontal className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No artists found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({ categories: [], locations: [], feeRanges: [] });
                  }}
                  variant="outline"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {filteredArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    variant={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}