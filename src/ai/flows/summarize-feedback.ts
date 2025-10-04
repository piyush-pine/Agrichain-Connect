'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing user feedback.
 *
 * - summarizeFeedback - An async function that takes user feedback as input and returns a summary.
 * - SummarizeFeedbackInput - The input type for the summarizeFeedback function.
 * - SummarizeFeedbackOutput - The output type for the summarizeFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFeedbackInputSchema = z.object({
  feedbackText: z
    .string()
    .describe('The text of the user feedback to be summarized.'),
});

export type SummarizeFeedbackInput = z.infer<typeof SummarizeFeedbackInputSchema>;

const SummarizeFeedbackOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the user feedback.'),
});

export type SummarizeFeedbackOutput = z.infer<typeof SummarizeFeedbackOutputSchema>;

export async function summarizeFeedback(input: SummarizeFeedbackInput): Promise<SummarizeFeedbackOutput> {
  return summarizeFeedbackFlow(input);
}

const summarizeFeedbackPrompt = ai.definePrompt({
  name: 'summarizeFeedbackPrompt',
  input: {schema: SummarizeFeedbackInputSchema},
  output: {schema: SummarizeFeedbackOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing user feedback to identify common issues and areas for improvement. Please provide a concise summary of the following feedback:\n\nFeedback: {{{feedbackText}}}`,
});

const summarizeFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeFeedbackFlow',
    inputSchema: SummarizeFeedbackInputSchema,
    outputSchema: SummarizeFeedbackOutputSchema,
  },
  async input => {
    const {output} = await summarizeFeedbackPrompt(input);
    return output!;
  }
);
