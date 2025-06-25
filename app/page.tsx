"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/category-card";
import { ArrowRight, Search, Star, Users, Shield, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import categoriesData from "@/data/categories.json";

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: Search,
      title: "Discover Talent",
      description: "Browse through hundreds of verified artists across India",
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "All artists are verified with ratings and reviews",
    },
    {
      icon: Users,
      title: "Easy Booking",
      description: "Direct communication with artist managers",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Safe and secure booking process",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Discover India's
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Finest Artists
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Connecting event planners with talented artists. From singers to
              dancers and speakers - find the perfect performer for your event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 transition-all duration-300 transform hover:scale-105"
                onClick={() => router.push("/artists")}
              >
                Explore Artists
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-100 hover:bg-purple-400 hover:text-purple-900 transition-all duration-300"
                onClick={() => router.push("/onboard")}
              >
                Join as Artist
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect artist for your event from our diverse categories
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() =>
                  router.push(`/artists?category=${category.name}`)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Artistly?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find and book the perfect artist for your event
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Artist?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of event planners who trust Artistly for their
            entertainment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
              onClick={() => router.push("/artists")}
            >
              Start Browsing
              <Zap className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
              onClick={() => router.push("/onboard")}
            >
              List Your Talent
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
