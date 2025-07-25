"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSuggestedContent } from "@/lib/actions";
import { Wand2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function ContentSuggestions() {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    setLoading(true);
    setSuggestion("");
    const userActivity =
      "The user has been browsing posts about 'React', 'Next.js', and 'AI'. They seem interested in web development and technology.";
    try {
      const result = await getSuggestedContent(userActivity);
      setSuggestion(result.suggestedContent);
    } catch (error) {
      setSuggestion("Failed to load suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-accent" />
          <span>For You</span>
        </CardTitle>
        <CardDescription>AI-powered content suggestions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSuggest} disabled={loading} className="w-full">
          {loading ? "Generating..." : "Suggest New Content"}
        </Button>
        {loading && (
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {suggestion && !loading && (
          <div className="mt-4 p-3 border rounded-lg bg-secondary/30">
            <p className="text-sm text-secondary-foreground">{suggestion}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
