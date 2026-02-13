/**
 * Demo file to test our invoice validator
 */

const Invoice = require('./models/Invoice');
const LineItem = require('./models/LineItem');
const InvoiceValidator = require('./validators/invoiceValidator');

// Create a valid invoice
console.log('=== Testing VALID Invoice ===\n');

const validInvoice = new Invoice({
  invoiceNumber: 'INV-001',
  invoiceDate: '2024-01-15',
  vendorName: 'ABC Company',
  customerName: 'XYZ Corp',
  lineItems: [
    new LineItem({
      description: 'Laptop',
      quantity: 2,
      unitPrice: 1000,
      lineTotal: 2000
    }),
    new LineItem({
      description: 'Mouse',
      quantity: 5,
      unitPrice: 25,
      lineTotal: 125
    })
  ],
  subtotal: 2125,
  taxRate: 10,
  taxAmount: 212.50,
  total: 2337.50,
  currency: 'USD'
});

const validResult = InvoiceValidator.validate(validInvoice);
console.log('Validation Result:', validResult);
console.log('\n' + '='.repeat(50) + '\n');

// Create an INVALID invoice (missing fields, wrong calculations)
console.log('=== Testing INVALID Invoice ===\n');

const invalidInvoice = new Invoice({
  invoiceNumber: '', // Missing!
  invoiceDate: '2024-01-15',
  vendorName: 'ABC Company',
  customerName: '', // Missing!
  lineItems: [
    new LineItem({
      description: 'Laptop',
      quantity: 2,
      unitPrice: 1000,
      lineTotal: 2000
    }),
    new LineItem({
      description: '', // Missing description!
      quantity: -1, // Negative quantity!
      unitPrice: 25,
      lineTotal: 125
    })
  ],
  subtotal: 2125, // Wrong calculation!
  taxRate: 10,
  taxAmount: 100, // Wrong tax!
  total: 1099, // Wrong total!
  currency: 'USD'
});

const invalidResult = InvoiceValidator.validate(invalidInvoice);
console.log('Validation Result:', invalidResult);
console.log('\nErrors found:');
invalidResult.errors.forEach((error, index) => {
  console.log(`${index + 1}. [${error.severity}] ${error.field}: ${error.message}`);
});