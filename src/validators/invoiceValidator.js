/**
 * Invoice Validator
 * Contains all validation logic for invoices
 */
const CalculationUtils = require('../utils/calculationUtils');
const DateValidator = require('./dateValidator');
class InvoiceValidator {
  
  /**
   * Validate an entire invoice
   * @param {Invoice} invoice - The invoice to validate
   * @returns {Object} Validation result with errors array
   */
  static validate(invoice) {
    const errors = [];
    
    // Validate required fields
    errors.push(...this.validateRequiredFields(invoice));

    // Validate required fields
    errors.push(...this.validateRequiredFields(invoice));

    // Validate date
    errors.push(...this.validateDate(invoice));
    
    // Validate line items
    errors.push(...this.validateLineItems(invoice));
    
    // Validate calculations
    errors.push(...this.validateCalculations(invoice));
    
    return {
      isValid: errors.length === 0,
      errors: errors,
      errorCount: errors.length
    };
    
  }
  
  /**
   * Validate required fields are present
   */
  static validateRequiredFields(invoice) {
    const errors = [];
    const requiredFields = [
      'invoiceNumber',
      'invoiceDate',
      'vendorName',
      'customerName'
    ];
    
    for (const field of requiredFields) {
      if (!invoice[field] || invoice[field].trim() === '') {
        errors.push({
          field: field,
          message: `${field} is required`,
          severity: 'error'
        });
      }
    }
    
    return errors;
  }
  
  /**
   * Validate line items exist and have required data
   */
  static validateLineItems(invoice) {
    const errors = [];
    
    // Check if line items exist
    if (!invoice.lineItems || invoice.lineItems.length === 0) {
      errors.push({
        field: 'lineItems',
        message: 'Invoice must have at least one line item',
        severity: 'error'
      });
      return errors;
    }
    
    // Validate each line item
    invoice.lineItems.forEach((item, index) => {
      if (!item.description || item.description.trim() === '') {
        errors.push({
          field: `lineItems[${index}].description`,
          message: `Line item ${index + 1} missing description`,
          severity: 'error'
        });
      }
      
      if (item.quantity <= 0) {
        errors.push({
          field: `lineItems[${index}].quantity`,
          message: `Line item ${index + 1} must have quantity greater than 0`,
          severity: 'error'
        });
      }
      
      if (item.unitPrice < 0) {
        errors.push({
          field: `lineItems[${index}].unitPrice`,
          message: `Line item ${index + 1} cannot have negative price`,
          severity: 'error'
        });
      }
    });
    
    return errors;
  }
  
  /**
   * Validate calculations (subtotal, tax, total)
   */
  static validateCalculations(invoice) {
    const errors = [];
    
    // Calculate expected subtotal from line items
    const expectedSubtotal = invoice.lineItems.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);
    
    // Check if subtotal matches (with small tolerance for floating point)
    const tolerance = 0.01;
    if (Math.abs(invoice.subtotal - expectedSubtotal) > tolerance) {
      errors.push({
        field: 'subtotal',
        message: `Subtotal mismatch. Expected: ${expectedSubtotal.toFixed(2)}, Got: ${invoice.subtotal.toFixed(2)}`,
        severity: 'error'
      });
    }
    
    // Validate tax calculation
    const expectedTax = expectedSubtotal * (invoice.taxRate / 100);
    if (Math.abs(invoice.taxAmount - expectedTax) > tolerance) {
      errors.push({
        field: 'taxAmount',
        message: `Tax calculation incorrect. Expected: ${expectedTax.toFixed(2)}, Got: ${invoice.taxAmount.toFixed(2)}`,
        severity: 'warning'
      });
    }
    
    // Validate total
    const expectedTotal = expectedSubtotal + expectedTax;
    if (Math.abs(invoice.total - expectedTotal) > tolerance) {
      errors.push({
        field: 'total',
        message: `Total mismatch. Expected: ${expectedTotal.toFixed(2)}, Got: ${invoice.total.toFixed(2)}`,
        severity: 'error'
      });
    }
    
    return errors;
  }
  /**
   * Validate invoice date
   */
  static validateDate(invoice) {
    const errors = [];
    
    const dateValidation = DateValidator.validateInvoiceDate(invoice.invoiceDate);
    
    if (!dateValidation.isValid) {
      errors.push({
        field: 'invoiceDate',
        message: dateValidation.message,
        severity: 'error'
      });
    }
    
    return errors;
  }
}

module.exports = InvoiceValidator;