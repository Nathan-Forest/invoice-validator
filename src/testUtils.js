/**
 * Test our utility functions
 */

const CalculationUtils = require('./utils/calculationUtils');
const FormatUtils = require('./utils/formatUtils');
const DateValidator = require('./validators/dateValidator');
const LineItem = require('./models/LineItem');

console.log('=== Testing Calculation Utilities ===\n');

// Create some line items
const items = [
  new LineItem({ description: 'Laptop', quantity: 2, unitPrice: 1299.99 }),
  new LineItem({ description: 'Mouse', quantity: 5, unitPrice: 24.50 }),
  new LineItem({ description: 'Keyboard', quantity: 3, unitPrice: 89.99 })
];

// Calculate totals
const totals = CalculationUtils.calculateInvoiceTotals(items, 10);
console.log('Line Items:');
items.forEach(item => {
  console.log(`  - ${item.description}: ${item.quantity} × $${item.unitPrice} = $${item.quantity * item.unitPrice}`);
});
console.log('\nCalculated Totals:');
console.log(`  Subtotal: $${totals.subtotal}`);
console.log(`  Tax (10%): $${totals.taxAmount}`);
console.log(`  Total: $${totals.total}`);

console.log('\n' + '='.repeat(50) + '\n');

console.log('=== Testing Format Utilities ===\n');

// Test currency formatting
console.log('Currency Formatting:');
console.log(`  USD: ${FormatUtils.formatCurrency(1234567.89, 'USD')}`);
console.log(`  EUR: ${FormatUtils.formatCurrency(1234567.89, 'EUR')}`);
console.log(`  GBP: ${FormatUtils.formatCurrency(1234567.89, 'GBP')}`);

// Test number formatting
console.log('\nNumber Formatting:');
console.log(`  ${FormatUtils.formatNumber(1234567.891, 2)}`);
console.log(`  ${FormatUtils.formatNumber(999.5, 2)}`);

// Test date formatting
console.log('\nDate Formatting:');
console.log(`  ${FormatUtils.formatDate('2024-01-15')}`);
console.log(`  ${FormatUtils.formatDate(new Date())}`);

console.log('\n' + '='.repeat(50) + '\n');

console.log('=== Testing Date Validator ===\n');

const testDates = [
  '2024-01-15',
  '2025-12-31',
  'invalid-date',
  '2020-06-15'
];

testDates.forEach(date => {
  const validation = DateValidator.validateInvoiceDate(date);
  const icon = validation.isValid ? '✓' : '✗';
  console.log(`${icon} ${date}: ${validation.message}`);
});