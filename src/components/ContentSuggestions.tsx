
"use client";

import { useState, useEffect } from "react";
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
import type { Post } from "@/lib/types";

type ContentSuggestionsProps = {
  userId?: string;
  userPosts: Post[];
};

export default function ContentSuggestions({ userId, userPosts }: ContentSuggestionsProps) {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    if (!userId) {
      setSuggestion("Please log in to get suggestions.");
      return;
    }
    setLoading(true);
    setSuggestion("");

    let userActivity = "The user has not posted anything yet.";
    if (userPosts.length > 0) {
      const postContents = userPosts.map(p => p.content).join(", ");
      userActivity = `The user has created posts about the following topics: ${postContents}. They also seem interested in web development and technology.`;
    }
    
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
        <Button onClick={handleSuggest} disabled={loading || !userId} className="w-full">
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
