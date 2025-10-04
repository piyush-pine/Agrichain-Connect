'use server';

/**
 * @fileOverview Detects potentially fraudulent product listings based on various factors.
 *
 * - detectFraudulentListing - A function that handles the fraud detection process.
 * - DetectFraudulentListingInput - The input type for the detectFraudulentListing function.
 * - DetectFraudulentListingOutput - The return type for the detectFraudulentListing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectFraudulentListingInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The description of the product listing.'),
  price: z.number().describe('The price of the product.'),
  imageUrl: z
    .string()
    .describe(
      'URL of the product image. Should be a data URI that includes a MIME type and uses Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
    ),
  listingTimestamp: z
    .string()
    .describe('The timestamp when the listing was created.'),
  sellerId: z.string().describe('The ID of the seller who posted the listing.'),
  averageMarketPrice: z
    .number()
    .describe('The average market price for similar products.'),
});

export type DetectFraudulentListingInput = z.infer<
  typeof DetectFraudulentListingInputSchema
>;

const DetectFraudulentListingOutputSchema = z.object({
  isFraudulent: z
    .boolean()
    .describe(
      'Whether the listing is potentially fraudulent based on the analysis.'
    ),
  fraudReason: z
    .string()
    .describe('The reason why the listing is flagged as potentially fraudulent.'),
  confidenceScore: z
    .number()
    .describe(
      'A score between 0 and 1 indicating the confidence level of the fraud detection.'
    ),
});

export type DetectFraudulentListingOutput = z.infer<
  typeof DetectFraudulentListingOutputSchema
>;

export async function detectFraudulentListing(
  input: DetectFraudulentListingInput
): Promise<DetectFraudulentListingOutput> {
  return detectFraudulentListingFlow(input);
}

const detectFraudulentListingPrompt = ai.definePrompt({
  name: 'detectFraudulentListingPrompt',
  input: {schema: DetectFraudulentListingInputSchema},
  output: {schema: DetectFraudulentListingOutputSchema},
  prompt: `You are an AI agent specializing in detecting fraudulent product listings on an e-commerce marketplace.

  Analyze the following product listing information to determine if it is potentially fraudulent:

  Product Description: {{{productDescription}}}
  Price: {{{price}}}
  Image: {{media url=imageUrl}}
  Listing Timestamp: {{{listingTimestamp}}}
  Seller ID: {{{sellerId}}}
  Average Market Price: {{{averageMarketPrice}}}

  Consider factors such as:
  - Unusually low prices compared to the average market price.
  - Suspicious product descriptions (e.g., too good to be true, generic).
  - The seller's history and reputation.
  - Any anomalies or inconsistencies in the listing information.

  Determine if the listing is fraudulent, provide a reason for your determination, and assign a confidence score.

  Output in JSON format:
  {
    "isFraudulent": true/false,
    "fraudReason": "Explanation of why the listing is fraudulent",
    "confidenceScore": 0.0-1.0
  }`,
});

const detectFraudulentListingFlow = ai.defineFlow(
  {
    name: 'detectFraudulentListingFlow',
    inputSchema: DetectFraudulentListingInputSchema,
    outputSchema: DetectFraudulentListingOutputSchema,
  },
  async input => {
    const {output} = await detectFraudulentListingPrompt(input);
    return output!;
  }
);
