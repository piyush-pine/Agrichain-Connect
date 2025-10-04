'use server';

/**
 * @fileOverview Translates a product listing from one language to another.
 *
 * - translateProductListing - A function that handles the product listing translation process.
 * - TranslateProductListingInput - The input type for the translateProductListing function.
 * - TranslateProductListingOutput - The return type for the translateProductListing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateProductListingInputSchema = z.object({
  text: z.string().describe('The product listing text to translate.'),
  targetLanguage: z.string().describe('The target language for the translation (e.g., en, hi, mr).'),
});
export type TranslateProductListingInput = z.infer<typeof TranslateProductListingInputSchema>;

const TranslateProductListingOutputSchema = z.object({
  translatedText: z.string().describe('The translated product listing text.'),
});
export type TranslateProductListingOutput = z.infer<typeof TranslateProductListingOutputSchema>;

export async function translateProductListing(input: TranslateProductListingInput): Promise<TranslateProductListingOutput> {
  return translateProductListingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateProductListingPrompt',
  input: {schema: TranslateProductListingInputSchema},
  output: {schema: TranslateProductListingOutputSchema},
  prompt: `Translate the following text into {{targetLanguage}}:\n\n{{text}}`,
});

const translateProductListingFlow = ai.defineFlow(
  {
    name: 'translateProductListingFlow',
    inputSchema: TranslateProductListingInputSchema,
    outputSchema: TranslateProductListingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
