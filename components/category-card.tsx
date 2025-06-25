"use client";

import { Category } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-gradient-to-br from-card to-card/50"
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className={cn(
          "w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r flex items-center justify-center transition-transform duration-300 group-hover:rotate-12",
          category.color
        )}>
          {IconComponent && <IconComponent className="h-8 w-8 text-white" />}
        </div>
        <h3 className="text-xl font-semibold text-foreground group-hover:text-purple-600 transition-colors duration-300 mb-2">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {category.description}
        </p>
      </CardContent>
    </Card>
  );
}