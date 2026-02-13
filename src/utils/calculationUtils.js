/**
 * Calculation Utilities
 * Helper functions for invoice calculations
 */

class CalculationUtils {
  
  /**
   * Calculate subtotal from line items
   * @param {Array} lineItems - Array of line items
   * @returns {number} Calculated subtotal
   */
  static calculateSubtotal(lineItems) {
    if (!lineItems || lineItems.length === 0) {
      return 0;
    }
    
    return lineItems.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);
  }
  
  /**
   * Calculate tax amount from subtotal and tax rate
   * @param {number} subtotal - The subtotal amount
   * @param {number} taxRate - Tax rate as percentage (e.g., 10 for 10%)
   * @returns {number} Calculated tax amount
   */
  static calculateTax(subtotal, taxRate) {
    return subtotal * (taxRate / 100);
  }
  
  /**
   * Calculate total (subtotal + tax)
   * @param {number} subtotal - The subtotal amount
   * @param {number} taxAmount - The tax amount
   * @returns {number} Total amount
   */
  static calculateTotal(subtotal, taxAmount) {
    return subtotal + taxAmount;
  }
  
  /**
   * Calculate all invoice totals at once
   * @param {Array} lineItems - Array of line items
   * @param {number} taxRate - Tax rate as percentage
   * @returns {Object} Object with subtotal, taxAmount, and total
   */
  static calculateInvoiceTotals(lineItems, taxRate) {
    const subtotal = this.calculateSubtotal(lineItems);
    const taxAmount = this.calculateTax(subtotal, taxRate);
    const total = this.calculateTotal(subtotal, taxAmount);
    
    return {
      subtotal: this.roundToTwoDecimals(subtotal),
      taxAmount: this.roundToTwoDecimals(taxAmount),
      total: this.roundToTwoDecimals(total)
    };
  }
  
  /**
   * Round number to 2 decimal places (for currency)
   * @param {number} value - Number to round
   * @returns {number} Rounded number
   */
  static roundToTwoDecimals(value) {
    return Math.round(value * 100) / 100;
  }
  
  /**
   * Check if two numbers are equal within tolerance
   * Useful for comparing floating point numbers
   * @param {number} value1 - First number
   * @param {number} value2 - Second number
   * @param {number} tolerance - Acceptable difference (default 0.01)
   * @returns {boolean} True if numbers are equal within tolerance
   */
  static areNumbersEqual(value1, value2, tolerance = 0.01) {
    return Math.abs(value1 - value2) <= tolerance;
  }
}

module.exports = CalculationUtils;