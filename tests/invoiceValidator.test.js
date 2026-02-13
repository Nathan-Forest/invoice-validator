/**
 * Tests for Invoice Validator
 */

const InvoiceValidator = require('../src/validators/invoiceValidator');
const Invoice = require('../src/models/Invoice');
const LineItem = require('../src/models/LineItem');

describe('InvoiceValidator', () => {
  
  describe('validate - complete validation', () => {
    
    test('should pass validation for valid invoice', () => {
      const invoice = new Invoice({
        invoiceNumber: 'INV-001',
        invoiceDate: '2024-01-15',
        vendorName: 'ABC Company',
        customerName: 'XYZ Corp',
        lineItems: [
          new LineItem({ description: 'Laptop', quantity: 2, unitPrice: 1000, lineTotal: 2000 })
        ],
        subtotal: 2000,
        taxRate: 10,
        taxAmount: 200,
        total: 2200
      });
      
      const result = InvoiceValidator.validate(invoice);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.errorCount).toBe(0);
    });
    
    test('should fail validation for invoice with missing fields', () => {
      const invoice = new Invoice({
        invoiceNumber: '',
        invoiceDate: '2024-01-15',
        vendorName: '',
        customerName: 'XYZ Corp',
        lineItems: [],
        subtotal: 0,
        taxRate: 0,
        taxAmount: 0,
        total: 0
      });
      
      const result = InvoiceValidator.validate(invoice);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
  
  describe('validateRequiredFields', () => {
    
    test('should detect missing invoice number', () => {
      const invoice = new Invoice({
        invoiceNumber: '',
        invoiceDate: '2024-01-15',
        vendorName: 'ABC Company',
        customerName: 'XYZ Corp'
      });
      
      const errors = InvoiceValidator.validateRequiredFields(invoice);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].field).toBe('invoiceNumber');
      expect(errors[0].severity).toBe('error');
    });
    
    test('should detect multiple missing fields', () => {
      const invoice = new Invoice({
        invoiceNumber: '',
        invoiceDate: '',
        vendorName: '',
        customerName: ''
      });
      
      const errors = InvoiceValidator.validateRequiredFields(invoice);
      
      expect(errors).toHaveLength(4);
    });
    
    test('should pass when all required fields present', () => {
      const invoice = new Invoice({
        invoiceNumber: 'INV-001',
        invoiceDate: '2024-01-15',
        vendorName: 'ABC Company',
        customerName: 'XYZ Corp'
      });
      
      const errors = InvoiceValidator.validateRequiredFields(invoice);
      
      expect(errors).toHaveLength(0);
    });
  });
  
  describe('validateLineItems', () => {
    
    test('should fail when no line items', () => {
      const invoice = new Invoice({
        lineItems: []
      });
      
      const errors = InvoiceValidator.validateLineItems(invoice);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain('at least one line item');
    });
    
    test('should detect invalid quantity', () => {
      const invoice = new Invoice({
        lineItems: [
          new LineItem({ description: 'Item', quantity: -5, unitPrice: 10 })
        ]
      });
      
      const errors = InvoiceValidator.validateLineItems(invoice);
      
      const quantityError = errors.find(e => e.field.includes('quantity'));
      expect(quantityError).toBeDefined();
      expect(quantityError.message).toContain('greater than 0');
    });
    
    test('should detect negative price', () => {
      const invoice = new Invoice({
        lineItems: [
          new LineItem({ description: 'Item', quantity: 1, unitPrice: -10 })
        ]
      });
      
      const errors = InvoiceValidator.validateLineItems(invoice);
      
      const priceError = errors.find(e => e.field.includes('unitPrice'));
      expect(priceError).toBeDefined();
      expect(priceError.message).toContain('negative');
    });
    
    test('should detect missing description', () => {
      const invoice = new Invoice({
        lineItems: [
          new LineItem({ description: '', quantity: 1, unitPrice: 10 })
        ]
      });
      
      const errors = InvoiceValidator.validateLineItems(invoice);
      
      const descError = errors.find(e => e.field.includes('description'));
      expect(descError).toBeDefined();
    });
  });
  
  describe('validateCalculations', () => {
    
    test('should detect incorrect subtotal', () => {
      const invoice = new Invoice({
        lineItems: [
          new LineItem({ description: 'Item', quantity: 2, unitPrice: 50 })
        ],
        subtotal: 90, // Should be 100
        taxRate: 10,
        taxAmount: 9,
        total: 99
      });
      
      const errors = InvoiceValidator.validateCalculations(invoice);
      
      const subtotalError = errors.find(e => e.field === 'subtotal');
      expect(subtotalError).toBeDefined();
      expect(subtotalError.message).toContain('mismatch');
    });
    
    test('should detect incorrect tax', () => {
      const invoice = new Invoice({
        lineItems: [
          new LineItem({ description: 'Item', quantity: 2, unitPrice: 50 })
        ],
        subtotal: 100,
        taxRate: 10,
        taxAmount: 5, // Should be 10
        total: 105
      });
      
      const errors = InvoiceValidator.validateCalculations(invoice);
      
      const taxError = errors.find(e => e.field === 'taxAmount');
      expect(taxError).toBeDefined();
    });
    
    test('should pass for correct calculations', () => {
      const invoice = new Invoice({
        lineItems: [
          new LineItem({ description: 'Item', quantity: 2, unitPrice: 50 })
        ],
        subtotal: 100,
        taxRate: 10,
        taxAmount: 10,
        total: 110
      });
      
      const errors = InvoiceValidator.validateCalculations(invoice);
      
      expect(errors).toHaveLength(0);
    });
  });
});