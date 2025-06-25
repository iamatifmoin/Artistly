"use client";

import { Artist } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, CheckCircle, MessageSquare } from "lucide-react";
import Image from "next/image";

interface ArtistCardProps {
  artist: Artist;
  variant?: "grid" | "list";
}

export function ArtistCard({ artist, variant = "grid" }: ArtistCardProps) {
  if (variant === "list") {
    return (
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-border/50 bg-gradient-to-br from-card to-card/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20">
                {artist.image ? (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-purple-600">
                    {artist.name.charAt(0)}
                  </div>
                )}
              </div>
              {artist.isVerified && (
                <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-green-500 bg-background rounded-full" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-600 transition-colors duration-300">
                    {artist.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">
                        {artist.rating} ({artist.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{artist.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{artist.feeRange}</div>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Ask Quote
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {artist.categories.slice(0, 2).map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {artist.categories.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{artist.categories.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-gradient-to-br from-card to-card/50 h-full">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20">
            {artist.image ? (
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-purple-600">
                {artist.name.charAt(0)}
              </div>
            )}
          </div>
          {artist.isVerified && (
            <div className="absolute top-3 right-3">
              <CheckCircle className="h-6 w-6 text-green-500 bg-background rounded-full" />
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{artist.rating}</span>
              <span className="text-xs text-muted-foreground">({artist.reviewCount})</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-600 transition-colors duration-300 mb-2">
              {artist.name}
            </h3>
            
            <div className="flex items-center space-x-1 text-muted-foreground mb-3">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{artist.location}</span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {artist.categories.slice(0, 3).map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {artist.bio}
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="text-lg font-semibold text-foreground">
              {artist.feeRange}
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask for Quote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}