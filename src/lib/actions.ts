// src/lib/actions.ts
"use server";

import {
  suggestContent,
  type SuggestContentOutput,
} from "@/ai/flows/suggest-content";

export async function getSuggestedContent(
  userActivity: string
): Promise<SuggestContentOutput> {
  try {
    const result = await suggestContent({ userActivity });
    return result;
  } catch (error) {
    console.error("Error getting suggested content:", error);
    return {
      suggestedContent:
        "We couldn't generate suggestions at this time. Please try again later.",
    };
  }
}
