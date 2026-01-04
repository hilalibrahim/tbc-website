# Invoice System Setup Guide

This guide will help you set up the complete invoice system for your TBC Marketing website.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- npm or yarn package manager

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Prisma ORM
- jsPDF for PDF generation
- Zod for validation
- bcryptjs for password hashing
- And other dependencies

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/tbc_marketing?schema=public"

# NextAuth (for future authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**Important:** Replace the DATABASE_URL with your actual PostgreSQL connection string.

## Step 3: Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Create database migration
npm run db:migrate

# Seed database with initial data
npm run db:seed
```

The seed script will create:
- Admin user (email: `admin@tbc.com`, password: `admin123`)
- Sample packages
- Sample projects
- Sample testimonials
- Sample lead

**⚠️ Change the admin password after first login!**

## Step 4: Verify Installation

Start the development server:

```bash
npm run dev
```

The application should start on `http://localhost:3000`

## Step 5: Access Prisma Studio (Optional)

To view and manage your database through a GUI:

```bash
npm run db:studio
```

This opens Prisma Studio at `http://localhost:5555`

## API Endpoints

### Invoices

- `GET /api/invoices` - Get all invoices (with optional `?status=DRAFT` filter)
- `GET /api/invoices/[id]` - Get single invoice
- `POST /api/invoices` - Create new invoice
- `PATCH /api/invoices/[id]` - Update invoice
- `DELETE /api/invoices/[id]` - Delete invoice
- `GET /api/invoices/[id]/pdf` - Download invoice as PDF

### Payments

- `GET /api/payments` - Get all payments (with optional `?invoiceId=xxx` filter)
- `GET /api/payments/[id]` - Get single payment
- `POST /api/payments` - Create new payment
- `PATCH /api/payments` - Update payment status
- `DELETE /api/payments/[id]` - Delete payment

### Leads

- `GET /api/leads` - Get all leads (with optional `?status=NEW` filter)
- `POST /api/leads` - Create new lead (from contact form)

## Invoice Features

### 1. Invoice Generation
- Automatic invoice number generation (format: `INV-YYYY-XXXX`)
- Support for multiple line items
- Tax and discount calculations
- Custom payment terms

### 2. PDF Export
- Professional PDF invoices
- Includes company info, client details, items, totals
- Downloadable via `/api/invoices/[id]/pdf`

### 3. Payment Tracking
- Track multiple payments per invoice
- Automatic invoice status updates
- Payment method tracking
- Transaction ID storage

### 4. Status Management
- DRAFT - Initial state
- SENT - Invoice sent to client
- VIEWED - Client viewed invoice
- PAID - Fully paid
- OVERDUE - Past due date
- CANCELLED - Invoice cancelled
- REFUNDED - Payment refunded

## Admin Components

### InvoiceList Component
Located at `components/admin/InvoiceList.tsx`

Features:
- List all invoices with filters
- Status-based filtering
- Quick actions (View, Download PDF)
- Responsive table design

### InvoiceForm Component
Located at `components/admin/InvoiceForm.tsx`

Features:
- Create new invoices
- Edit existing invoices
- Add/remove line items
- Real-time total calculations
- Tax and discount support

## Usage Examples

### Create Invoice from Order

```typescript
import { createInvoiceFromOrder } from '@/lib/invoice-helpers'

// Create invoice from an existing order
const invoice = await createInvoiceFromOrder(orderId)
```

### Generate Invoice PDF

```typescript
import { generateInvoicePDF } from '@/lib/pdf-generator'

const pdfBuffer = await generateInvoicePDF(invoice)
// Use pdfBuffer to send email, save to file, etc.
```

### Create Invoice via API

```typescript
const response = await fetch('/api/invoices', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    leadId: 'lead-id-here',
    issueDate: '2024-01-15',
    dueDays: 30,
    items: [
      {
        description: 'SEO Optimization Service',
        quantity: 1,
        unitPrice: 999.00
      }
    ],
    taxRate: 0,
    discount: 0,
    currency: 'USD'
  })
})
```

## Database Schema

The invoice system includes these models:

- **Invoice** - Main invoice record
- **InvoiceItem** - Line items on invoice
- **Payment** - Payment records
- **Order** - Order records (linked to invoices)
- **Lead** - Client/lead information

See `prisma/schema.prisma` for complete schema definition.

## Next Steps

1. **Add Authentication** - Implement NextAuth.js for admin access
2. **Email Integration** - Send invoices via email
3. **Payment Gateway** - Integrate Stripe/PayPal for online payments
4. **Client Portal** - Allow clients to view and pay invoices
5. **Recurring Invoices** - Set up automatic recurring invoices
6. **Invoice Reminders** - Automated overdue invoice reminders

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check database credentials

### Prisma Client Errors
- Run `npm run db:generate` after schema changes
- Restart development server

### PDF Generation Issues
- Ensure jsPDF is installed: `npm install jspdf`
- Check browser console for errors

## Support

For issues or questions, check:
- Prisma Documentation: https://www.prisma.io/docs
- Next.js Documentation: https://nextjs.org/docs
- jsPDF Documentation: https://github.com/parallax/jsPDF

