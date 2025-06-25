"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import optionsData from "@/data/options.json";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio must be less than 500 characters"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  feeRange: z.string().min(1, "Please select a fee range"),
  location: z.string().min(1, "Please select a location"),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: "Personal Info", description: "Tell us about yourself" },
  { id: 2, title: "Skills & Categories", description: "What do you do?" },
  { id: 3, title: "Pricing & Location", description: "Where and how much?" },
  { id: 4, title: "Review & Submit", description: "Final details" },
];

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      categories: [],
      languages: [],
      feeRange: "",
      location: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", {
      ...data,
      categories: selectedCategories,
      languages: selectedLanguages,
    });
    toast.success(
      "Application submitted successfully! We'll review your profile and get back to you soon."
    );

    // Reset form
    form.reset();
    setSelectedCategories([]);
    setSelectedLanguages([]);
    setCurrentStep(1);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["name", "bio"];
        break;
      case 2:
        if (selectedCategories.length === 0 || selectedLanguages.length === 0) {
          toast.error("Please select at least one category and one language");
          return;
        }
        form.setValue("categories", selectedCategories);
        form.setValue("languages", selectedLanguages);
        break;
      case 3:
        fieldsToValidate = ["feeRange", "location"];
        break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await form.trigger(fieldsToValidate);
      if (!isValid) return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Join as an Artist
            </h1>
            <p className="text-lg text-muted-foreground">
              Share your talent with event planners across India
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${
                      currentStep >= step.id
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 border-transparent text-white"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }
                  `}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  {/* {index < steps.length - 1 && (
                    <div
                      className={`
                      w-full h-0.5 mx-4 transition-all duration-300
                      ${
                        currentStep > step.id
                          ? "bg-gradient-to-r from-purple-500 to-blue-500"
                          : "bg-muted-foreground/30"
                      }
                    `}
                    />
                  )} */}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep - 1].description}
              </p>
            </div>
          </div>

          {/* Form */}
          <Card className="border-border/50 bg-gradient-to-br from-card/50 to-card">
            <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Full Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Professional Bio *
                              <span className="text-sm text-muted-foreground ml-2">
                                ({field.value?.length || 0}/500)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your experience, achievements, and what makes you unique as an artist..."
                                className="min-h-32 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Skills & Categories */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="text-base font-medium mb-4 block">
                          Categories *
                          <span className="text-sm text-muted-foreground ml-2">
                            (Select all that apply)
                          </span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {optionsData.categories.map((category) => (
                            <div
                              key={category}
                              className={`
                                p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105
                                ${
                                  selectedCategories.includes(category)
                                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20"
                                    : "border-border hover:border-purple-300"
                                }
                              `}
                            >
                              <label
                                htmlFor={`category-${category}`}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <Checkbox
                                  id={`category-${category}`}
                                  checked={selectedCategories.includes(
                                    category
                                  )}
                                  onCheckedChange={() =>
                                    toggleCategory(category)
                                  }
                                />
                                <span className="text-sm font-medium">
                                  {category}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                        {selectedCategories.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">
                              Selected categories:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {selectedCategories.map((category) => (
                                <Badge key={category} variant="secondary">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-base font-medium mb-4 block">
                          Languages Spoken *
                          <span className="text-sm text-muted-foreground ml-2">
                            (Select all that apply)
                          </span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {optionsData.languages.map((language) => (
                            <div
                              key={language}
                              className={`
                                p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105
                                ${
                                  selectedLanguages.includes(language)
                                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20"
                                    : "border-border hover:border-purple-300"
                                }
                              `}
                            >
                              <label
                                htmlFor={`language-${language}`}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <Checkbox
                                  id={`language-${language}`}
                                  checked={selectedLanguages.includes(language)}
                                  onCheckedChange={() =>
                                    toggleLanguage(language)
                                  }
                                />
                                <span className="text-sm font-medium">
                                  {language}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                        {selectedLanguages.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">
                              Selected languages:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {selectedLanguages.map((language) => (
                                <Badge key={language} variant="secondary">
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Pricing & Location */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="feeRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Fee Range *
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select your fee range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {optionsData.feeRanges.map((range) => (
                                  <SelectItem key={range} value={range}>
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Location *
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {optionsData.locations.map((location) => (
                                  <SelectItem key={location} value={location}>
                                    {location}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <label className="text-base font-medium mb-4 block">
                          Profile Image (Optional)
                        </label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-purple-300 transition-colors duration-300">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop your image here, or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            JPG, PNG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                          Review Your Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">
                              Personal Information
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Name: {form.watch("name")}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Location: {form.watch("location")}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Fee Range: {form.watch("feeRange")}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-medium text-foreground mb-2">
                              Skills & Languages
                            </h4>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {selectedCategories.map((category) => (
                                <Badge
                                  key={category}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {category}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {selectedLanguages.map((language) => (
                                <Badge
                                  key={language}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-medium text-foreground mb-2">
                            Bio
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {form.watch("bio")}
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Note:</strong> After submission, our team will
                          review your profile within 2-3 business days. You'll
                          receive an email notification once your profile is
                          approved and live on the platform.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="transition-all duration-300"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Submit Application
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
