'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product descriptions based on keywords provided by a farmer.
 *
 * generateProductDescription - An async function that takes keywords as input and returns a generated product description.
 * GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * GenerateProductDescriptionOutput - The output type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Keywords describing the product, separated by commas. Example: organic, fresh, locally grown, pesticide-free'
    ),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A detailed and appealing product description generated from the provided keywords.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling product descriptions for agricultural products.

  Based on the following keywords, generate an appealing and informative product description.

  Keywords: {{{keywords}}}

  The description should highlight the key features and benefits of the product, and be written in a way that is engaging and persuasive to potential buyers.
  The description should be at least 50 words long.
  `,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
