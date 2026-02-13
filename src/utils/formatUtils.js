/**
 * Formatting Utilities
 * Helper functions for formatting data for display
 */

class FormatUtils {
  
  /**
   * Format a number as currency
   * @param {number} amount - The amount to format
   * @param {string} currency - Currency code (default: 'USD')
   * @returns {string} Formatted currency string
   */
  static formatCurrency(amount, currency = 'USD') {
    const symbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'AUD': 'A$',
      'CAD': 'C$'
    };
    
    const symbol = symbols[currency] || currency;
    const formattedNumber = this.formatNumber(amount, 2);
    
    return `${symbol}${formattedNumber}`;
  }
  
  /**
   * Format a number with thousand separators
   * @param {number} value - Number to format
   * @param {number} decimals - Number of decimal places (default: 2)
   * @returns {string} Formatted number
   */
  static formatNumber(value, decimals = 2) {
    const fixed = value.toFixed(decimals);
    const parts = fixed.split('.');
    
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return parts.join('.');
  }
  
  /**
   * Format a date to YYYY-MM-DD
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted date string
   */
  static formatDate(date) {
    const d = new Date(date);
    
    if (isNaN(d.getTime())) {
      return 'Invalid Date';
    }
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  
  /**
   * Format validation errors for display
   * @param {Array} errors - Array of error objects
   * @returns {string} Formatted error report
   */
  static formatValidationReport(errors) {
    if (errors.length === 0) {
      return '✓ Validation passed - No errors found';
    }
    
    let report = `✗ Validation failed - ${errors.length} error(s) found:\n\n`;
    
    errors.forEach((error, index) => {
      const icon = error.severity === 'error' ? '❌' : '⚠️';
      report += `${index + 1}. ${icon} [${error.field}]\n`;
      report += `   ${error.message}\n\n`;
    });
    
    return report;
  }
}

module.exports = FormatUtils;