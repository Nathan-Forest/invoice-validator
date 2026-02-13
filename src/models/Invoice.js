/**
 * Invoice Model
 * Represents the structure of an invoice
 */

class Invoice {
  constructor(invoiceData) {
    // Required fields
    this.invoiceNumber = invoiceData.invoiceNumber || '';
    this.invoiceDate = invoiceData.invoiceDate || '';
    this.vendorName = invoiceData.vendorName || '';
    this.customerName = invoiceData.customerName || '';
    
    // Line items array
    this.lineItems = invoiceData.lineItems || [];
    
    // Financial fields
    this.subtotal = invoiceData.subtotal || 0;
    this.taxRate = invoiceData.taxRate || 0;
    this.taxAmount = invoiceData.taxAmount || 0;
    this.total = invoiceData.total || 0;
    
    // Optional fields
    this.currency = invoiceData.currency || 'AUD';
    this.paymentTerms = invoiceData.paymentTerms || '';
  }
}

module.exports = Invoice;