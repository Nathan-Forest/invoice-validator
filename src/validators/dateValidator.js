/**
 * Date Validator
 * Validates date formats and business rules for dates
 */

class DateValidator {
  
  /**
   * Check if a date string is valid
   * @param {string} dateString - Date string to validate
   * @returns {boolean} True if valid date
   */
  static isValidDate(dateString) {
    if (!dateString || dateString.trim() === '') {
      return false;
    }
    
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
  
  /**
   * Check if date is in the past
   * @param {string} dateString - Date to check
   * @returns {boolean} True if date is in the past
   */
  static isInPast(dateString) {
    if (!this.isValidDate(dateString)) {
      return false;
    }
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight
    
    return date < today;
  }
  
  /**
   * Check if date is in the future
   * @param {string} dateString - Date to check
   * @returns {boolean} True if date is in the future
   */
  static isInFuture(dateString) {
    if (!this.isValidDate(dateString)) {
      return false;
    }
    
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return date > today;
  }
  
  /**
   * Validate invoice date (should not be in future)
   * @param {string} dateString - Invoice date
   * @returns {Object} Validation result
   */
  static validateInvoiceDate(dateString) {
    if (!this.isValidDate(dateString)) {
      return {
        isValid: false,
        message: 'Invoice date is not a valid date'
      };
    }
    
    if (this.isInFuture(dateString)) {
      return {
        isValid: false,
        message: 'Invoice date cannot be in the future'
      };
    }
    
    return {
      isValid: true,
      message: 'Invoice date is valid'
    };
  }
}

module.exports = DateValidator;