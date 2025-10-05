# AgriChain Connect - Project Overview

**AgriChain Connect** is a proof-of-concept web application that demonstrates a blockchain-powered e-commerce marketplace for the agricultural sector. It's designed to create a transparent, efficient, and trustworthy supply chain by directly connecting farmers and MSMEs (Micro, Small, and Medium Enterprises) with buyers. The platform simulates key blockchain interactions, such as product provenance, secure escrow payments, and supply chain tracking, to showcase how technology can solve real-world problems in agriculture.

## 1. Key Features

- **Role-Based Dashboards:** Tailored interfaces for the four key stakeholders: Farmers/MSMEs, Buyers, Logistics Partners, and Admins.
- **Blockchain-Verified Products:** Every product listed by a farmer is registered as a unique, immutable asset on a simulated blockchain, providing a transparent history (provenance) that buyers can verify.
- **Smart Contract Escrow:** Buyer payments are held in a simulated smart contract. Funds are automatically released to the farmer only after the buyer confirms successful delivery, protecting both parties.
- **End-to-End Traceability:** A detailed tracking page allows users to follow a product's journey from the farm to their doorstep, with critical checkpoints verified on the blockchain.
- **AI-Powered Assistance:** The platform integrates Genkit to provide AI features, including generating product descriptions for farmers and detecting potentially fraudulent listings for admins.
- **Multilingual Support:** The user interface supports multiple languages (English, Hindi, Marathi, and Punjabi) to cater to a diverse user base.

## 2. Technical Architecture

- **Frontend:** Built with **Next.js** (App Router) and **React** for a modern, server-driven user interface.
- **Styling:** Uses **Tailwind CSS** for utility-first styling and **ShadCN** for its pre-built, accessible UI components. The color scheme and theming are centralized in `src/app/globals.css`.
- **State Management:** Leverages **React Context API** for managing global state, including the shopping cart (`CartContext`), product listings (`ProductContext`), and language translations (`LanguageContext`).
- **Generative AI:** Integrates **Genkit** to power AI-driven features. The flows for these features are defined in the `src/ai/flows/` directory.
- **Blockchain Simulation:** The application does not use a live blockchain but simulates interactions (like creating transactions and verifying records) to demonstrate the concepts of provenance and smart contracts.

## 3. User Workflow Diagram Prompt

You can use the following detailed prompt with any AI diagramming tool to generate a clear workflow diagram for all stakeholders.

```
Create a detailed, multi-lane swimlane diagram illustrating the user workflow for "AgriChain Connect," a blockchain-powered agricultural marketplace. Use four main swimlanes, one for each stakeholder: "Farmer/MSME," "Buyer," "Logistics Partner," and "Admin." The diagram should clearly show the sequence of actions, interactions between stakeholders, and key decision points from registration to final payment settlement.

**Workflow Steps to Include:**

1.  **Onboarding & Registration (Farmer):**
    *   Starts with "Sign Up" page.
    *   Enters Phone Number -> Verifies via OTP (simulated).
    *   Verifies Identity with Aadhaar (simulated) -> Profile created.
    *   Action leads to the "Farmer Dashboard."

2.  **Product Listing (Farmer):**
    *   From the dashboard, selects "Add New Product."
    *   Fills out product details (name, category, price, stock).
    *   Optionally uses "AI Generate Description" from keywords.
    *   Uploads a product image.
    *   Submits the form, which triggers a "Create Product on Blockchain" action (simulated transaction).
    *   The product now appears in the "Marketplace."

3.  **Fraud Detection (Admin):**
    *   The AI system automatically analyzes new listings.
    *   If a listing is suspicious (e.g., price anomaly), an "AI Fraud Alert" is generated.
    *   The alert appears on the "Admin Dashboard."
    *   Admin reviews the alert and can choose to "Suspend Listing" or "Dismiss Alert."

4.  **Product Discovery & Purchase (Buyer):**
    *   Buyer visits the "Marketplace" page.
    *   Browses or searches for products.
    *   Views a "Product Detail Page" and can check "Blockchain Provenance" via a QR code/link.
    *   Adds product to cart.
    *   Proceeds to "Checkout," fills in shipping info.
    *   Connects crypto wallet (simulated).
    *   Places order, which triggers "Lock Funds in Escrow Smart Contract" (simulated).
    *   Buyer is redirected to "Order Confirmation" page.

5.  **Order Fulfillment & Logistics (Farmer & Logistics Partner):**
    *   A new order appears on the "Farmer Dashboard."
    *   Farmer prepares the order for shipping.
    *   A shipment is assigned to a "Logistics Partner," appearing on their "Logistics Dashboard."
    *   Logistics Partner picks up the product. The order status updates to "Shipped."
    *   The shipment is tracked, passing through "Checkpoints" which are recorded on the blockchain (simulated).

6.  **Delivery & Payment (Buyer & Farmer):**
    *   The product is delivered to the Buyer.
    *   Buyer confirms delivery (e.g., by simulating a QR code scan on the "Order Tracking" page).
    *   This confirmation triggers the "Release Funds from Escrow" action.
    *   The payment is automatically transferred to the Farmer (simulated).
    *   The workflow for this transaction is complete.
```
