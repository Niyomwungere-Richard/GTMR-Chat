// src/ai/flows/suggest-content.ts
'use server';

/**
 * @fileOverview An AI agent that suggests content to users based on their past activity.
 *
 * - suggestContent - A function that suggests content based on user activity.
 * - SuggestContentInput - The input type for the suggestContent function.
 * - SuggestContentOutput - The return type for the suggestContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestContentInputSchema = z.object({
  userActivity: z
    .string()
    .describe(
      'A description of the user history of activity within the ConnectSphere application.'
    ),
});
export type SuggestContentInput = z.infer<typeof SuggestContentInputSchema>;

const SuggestContentOutputSchema = z.object({
  suggestedContent: z
    .string()
    .describe('The suggested content based on user activity.'),
});
export type SuggestContentOutput = z.infer<typeof SuggestContentOutputSchema>;

export async function suggestContent(input: SuggestContentInput): Promise<SuggestContentOutput> {
  return suggestContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestContentPrompt',
  input: {schema: SuggestContentInputSchema},
  output: {schema: SuggestContentOutputSchema},
  prompt: `You are an expert social media content curator.

You will use the user's past activity to suggest content they might be interested in.

User Activity: {{{userActivity}}}`,
});

const suggestContentFlow = ai.defineFlow(
  {
    name: 'suggestContentFlow',
    inputSchema: SuggestContentInputSchema,
    outputSchema: SuggestContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
