# TaxLens AI 🔍⚖️
> **See Through Every Tax Charge.**
> *An AI-powered GST Auditing Platform built for Indian MSMEs, local shopkeepers, and traders.*

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![GST India](https://img.shields.io/badge/GST-Compliance_India-green)](#)

---

## 📌 Problem Statement
Small shopkeepers, Kirana merchants, and MSMEs across India face daily challenges with Goods and Services Tax (GST):
- **Complex Notifications & Circulars**: Frequent CBIC rate rationalizations and notifications are difficult to interpret without dedicated accountants.
- **HSN & Rate Mismatches**: Unscrupulous or mistaken vendors charge incorrect rates (e.g., 28% instead of 18% on monitors).
- **Inter-State Tax Head Errors**: Vendors frequently charge CGST + SGST on cross-border supplies instead of IGST, leading to input tax credit (ITC) blockages or penalties under GSTR-2B reconciliation.
- **LLM Hallucinations in Tax**: Generic AI chatbots often invent tax rates or quote outdated regulations.

**TaxLens AI** solves this by pairing a **deterministic calculation & statutory verification engine** with a **contextual conversational AI auditor**.

---

## 🚀 Key Features

### 1. 📄 Invoice Upload & OCR Extraction Review
- Supports PDF, PNG, JPG scans, and raw invoice text.
- Parses Header Metadata: Seller/Buyer GSTINs with state code validation, invoice date, and place of supply.
- **Editable Line Items Table**: Allows merchants to inspect and correct extracted descriptions, HSN/SAC codes, quantities, rates, and tax heads before auditing.

### 2. 🧮 Deterministic GST Calculation Engine
- Independently recalculates line-item math (`Qty × Rate - Discount = Taxable Value`).
- Applies exact statutory formulas for CGST, SGST, and IGST based on the place of supply (Intra-state vs Inter-state supply under Section 7 of the IGST Act).
- Flags discrepancy differences with penny-accurate comparison against invoiced totals.

### 3. 🚦 Clear 3-Tier Audit Statuses
- 🟢 **Green — Verified Clean**: Calculations match and HSN rates conform to current schedules.
- 🟡 **Yellow — Review Required**: Ambiguous classifications or missing documentation details.
- 🔴 **Red — Discrepancy Detected**: Calculation error, tax head mismatch, or incorrect rate charged.

### 4. 🤖 Interactive GST AI Auditing Agent
- **Invoice-Connected Context**: The AI agent is aware of the exact invoice, extracted items, and calculated discrepancies.
- **Step-by-step Math Breakdown**: Explains why an item was flagged and calculates the exact overcharge.
- **1-Click Supplier Rectification Draft**: Generates professional WhatsApp or email notes requesting a Credit Note under Section 34 of the CGST Act.

### 5. 📜 Official CBIC Circular & Notification Explainer
- Upload or paste official GST Council / CBIC notifications.
- Translates legal text into 3 clear takeaways, highlights effective dates, and lists required actions for retail merchants.

### 6. 📊 Dashboard & Invoice History
- Overview of audited invoices, monthly trends, and potential tax savings.
- Searchable and filterable archive of past audits.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 4, Lucide React Icons
- **UI Components**: Modern fintech SaaS design inspired by Razorpay & Stripe
- **Architecture**: Decoupled OCR, Deterministic Calculation Engine, and Contextual AI Copilot

---

## 🏁 Quickstart & Local Setup

### Prerequisites
- Node.js 18+ (tested on Node v22.13.0)
- npm or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Parth-kulkarni300/TaxLens-AI.git
   cd TaxLens-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🎯 Hackathon Demonstration Flow

1. **Dashboard Overview**: Check business metrics, clean vs flagged audits, and potential tax savings.
2. **Audit New Invoice**: Click *"Try a sample discrepancy invoice"* to load an inter-state B2B invoice (`INV-2026-089`).
3. **OCR Review**: Inspect parsed line items (Monitors under HSN 8471 charged at 28% with CGST+SGST).
4. **Deep Audit**: Trigger the audit engine to reveal 2 detected issues:
   - Rate overcharge of **₹4,600** (statutory 18% vs charged 28%).
   - Inter-state tax head error (charged CGST+SGST instead of IGST).
5. **AI Auditor Agent**: Ask the copilot *"Why did you flag the rate on computer monitors?"* or click *"Draft a supplier message"*.
6. **Report Generation**: Click *"Download report"* or share the discrepancy summary directly with the supplier.

---

## 📜 Disclaimer
*TaxLens AI is an assistive technology platform designed to detect invoice discrepancies and explain GST regulations. It does not constitute formal legal or chartered accounting advice.*
