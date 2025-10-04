import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-feedback.ts';
import '@/ai/flows/generate-product-description.ts';
import '@/ai/flows/detect-fraudulent-listings.ts';
import '@/ai/flows/translate-product-listing.ts';