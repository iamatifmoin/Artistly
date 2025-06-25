"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import optionsData from "@/data/options.json";

interface FilterSidebarProps {
  onFiltersChange: (filters: {
    categories: string[];
    locations: string[];
    feeRanges: string[];
  }) => void;
  activeFilters: {
    categories: string[];
    locations: string[];
    feeRanges: string[];
  };
}

export function FilterSidebar({ onFiltersChange, activeFilters }: FilterSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (type: 'categories' | 'locations' | 'feeRanges', value: string, checked: boolean) => {
    const newFilters = { ...activeFilters };
    if (checked) {
      newFilters[type] = [...newFilters[type], value];
    } else {
      newFilters[type] = newFilters[type].filter(item => item !== value);
    }
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      locations: [],
      feeRanges: []
    });
  };

  const totalFilters = activeFilters.categories.length + activeFilters.locations.length + activeFilters.feeRanges.length;

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {totalFilters > 0 && (
              <Badge variant="secondary" className="ml-2">
                {totalFilters}
              </Badge>
            )}
          </div>
        </Button>
      </div>

      {/* Filter Sidebar */}
      <div className={`lg:block ${isExpanded ? 'block' : 'hidden'} space-y-6`}>
        {/* Active Filters */}
        {totalFilters > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Filters</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[...activeFilters.categories, ...activeFilters.locations, ...activeFilters.feeRanges].map((filter) => (
                  <Badge key={filter} variant="secondary" className="flex items-center space-x-1">
                    <span>{filter}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => {
                        if (activeFilters.categories.includes(filter)) {
                          handleFilterChange('categories', filter, false);
                        } else if (activeFilters.locations.includes(filter)) {
                          handleFilterChange('locations', filter, false);
                        } else if (activeFilters.feeRanges.includes(filter)) {
                          handleFilterChange('feeRanges', filter, false);
                        }
                      }}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {optionsData.categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={activeFilters.categories.includes(category)}
                    onCheckedChange={(checked) => 
                      handleFilterChange('categories', category, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {optionsData.locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={activeFilters.locations.includes(location)}
                    onCheckedChange={(checked) => 
                      handleFilterChange('locations', location, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`location-${location}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fee Range Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Fee Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {optionsData.feeRanges.map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fee-${range}`}
                    checked={activeFilters.feeRanges.includes(range)}
                    onCheckedChange={(checked) => 
                      handleFilterChange('feeRanges', range, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`fee-${range}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {range}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}