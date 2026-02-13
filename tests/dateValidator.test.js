/**
 * Tests for Date Validator
 */

const DateValidator = require('../src/validators/dateValidator');

describe('DateValidator', () => {
  
  describe('isValidDate', () => {
    
    test('should return true for valid date string', () => {
      expect(DateValidator.isValidDate('2024-01-15')).toBe(true);
    });
    
    test('should return false for invalid date string', () => {
      expect(DateValidator.isValidDate('not-a-date')).toBe(false);
    });
    
    test('should return false for empty string', () => {
      expect(DateValidator.isValidDate('')).toBe(false);
    });
    
    test('should return false for null', () => {
      expect(DateValidator.isValidDate(null)).toBe(false);
    });
  });
  
  describe('validateInvoiceDate', () => {
    
    test('should pass for valid past date', () => {
      const result = DateValidator.validateInvoiceDate('2024-01-15');
      expect(result.isValid).toBe(true);
    });
    
    test('should fail for invalid date', () => {
      const result = DateValidator.validateInvoiceDate('invalid');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('not a valid date');
    });
    
    test('should fail for future date', () => {
      // Date far in the future
      const result = DateValidator.validateInvoiceDate('2030-12-31');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('cannot be in the future');
    });
  });
});