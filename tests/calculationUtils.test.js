/**
 * Tests for Calculation Utilities
 */

const CalculationUtils = require('../src/utils/calculationUtils');
const LineItem = require('../src/models/LineItem');

// Describe what we're testing
describe('CalculationUtils', () => {
  
  // Test calculateSubtotal
  describe('calculateSubtotal', () => {
    
    test('should calculate subtotal from line items correctly', () => {
      const items = [
        new LineItem({ description: 'Item 1', quantity: 2, unitPrice: 10 }),
        new LineItem({ description: 'Item 2', quantity: 3, unitPrice: 5 })
      ];
      
      const result = CalculationUtils.calculateSubtotal(items);
      
      expect(result).toBe(35); // 2*10 + 3*5 = 35
    });
    
    test('should return 0 for empty line items', () => {
      const result = CalculationUtils.calculateSubtotal([]);
      expect(result).toBe(0);
    });
    
    test('should return 0 for null line items', () => {
      const result = CalculationUtils.calculateSubtotal(null);
      expect(result).toBe(0);
    });
    
    test('should handle single line item', () => {
      const items = [
        new LineItem({ description: 'Item 1', quantity: 5, unitPrice: 20 })
      ];
      
      const result = CalculationUtils.calculateSubtotal(items);
      expect(result).toBe(100);
    });
  });
  
  // Test calculateTax
  describe('calculateTax', () => {
    
    test('should calculate tax correctly for 10% rate', () => {
      const result = CalculationUtils.calculateTax(100, 10);
      expect(result).toBe(10);
    });
    
    test('should calculate tax correctly for 0% rate', () => {
      const result = CalculationUtils.calculateTax(100, 0);
      expect(result).toBe(0);
    });
    
    test('should calculate tax correctly for decimal rate', () => {
      const result = CalculationUtils.calculateTax(100, 7.5);
      expect(result).toBe(7.5);
    });
    
    test('should handle large amounts', () => {
      const result = CalculationUtils.calculateTax(10000, 10);
      expect(result).toBe(1000);
    });
  });
  
  // Test calculateTotal
  describe('calculateTotal', () => {
    
    test('should add subtotal and tax correctly', () => {
      const result = CalculationUtils.calculateTotal(100, 10);
      expect(result).toBe(110);
    });
    
    test('should handle zero tax', () => {
      const result = CalculationUtils.calculateTotal(100, 0);
      expect(result).toBe(100);
    });
    
    test('should handle decimal amounts', () => {
      const result = CalculationUtils.calculateTotal(99.99, 10.50);
      expect(result).toBeCloseTo(110.49, 2);
    });
  });
  
  // Test roundToTwoDecimals
  describe('roundToTwoDecimals', () => {
    
    test('should round up correctly', () => {
      const result = CalculationUtils.roundToTwoDecimals(10.556);
      expect(result).toBe(10.56);
    });
    
    test('should round down correctly', () => {
      const result = CalculationUtils.roundToTwoDecimals(10.554);
      expect(result).toBe(10.55);
    });
    
    test('should handle whole numbers', () => {
      const result = CalculationUtils.roundToTwoDecimals(10);
      expect(result).toBe(10);
    });
    
    test('should handle negative numbers', () => {
      const result = CalculationUtils.roundToTwoDecimals(-10.556);
      expect(result).toBe(-10.56);
    });
  });
  
  // Test areNumbersEqual
  describe('areNumbersEqual', () => {
    
    test('should return true for equal numbers', () => {
      expect(CalculationUtils.areNumbersEqual(10, 10)).toBe(true);
    });
    
    test('should return true for numbers within tolerance', () => {
      expect(CalculationUtils.areNumbersEqual(10.005, 10.009, 0.01)).toBe(true);
    });
    
    test('should return false for numbers outside tolerance', () => {
      expect(CalculationUtils.areNumbersEqual(10, 10.02, 0.01)).toBe(false);
    });
    
    test('should use default tolerance of 0.01', () => {
      expect(CalculationUtils.areNumbersEqual(10, 10.005)).toBe(true);
    });
  });
  
  // Test calculateInvoiceTotals
  describe('calculateInvoiceTotals', () => {
    
    test('should calculate all totals correctly', () => {
      const items = [
        new LineItem({ description: 'Item 1', quantity: 2, unitPrice: 50 }),
        new LineItem({ description: 'Item 2', quantity: 1, unitPrice: 30 })
      ];
      
      const result = CalculationUtils.calculateInvoiceTotals(items, 10);
      
      expect(result.subtotal).toBe(130);
      expect(result.taxAmount).toBe(13);
      expect(result.total).toBe(143);
    });
    
    test('should handle floating point precision', () => {
      const items = [
        new LineItem({ description: 'Item 1', quantity: 3, unitPrice: 89.99 })
      ];
      
      const result = CalculationUtils.calculateInvoiceTotals(items, 10);
      
      // Check that values are properly rounded to 2 decimals
      expect(result.subtotal).toBe(269.97);
      expect(result.taxAmount).toBe(27);
      expect(result.total).toBe(296.97);
    });
  });
});