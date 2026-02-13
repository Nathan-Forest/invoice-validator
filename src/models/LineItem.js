/**
 * LineItem Model
 * Represents a single line item on an invoice
 */

class LineItem {
  constructor(itemData) {
    this.description = itemData.description || '';
    this.quantity = itemData.quantity || 0;
    this.unitPrice = itemData.unitPrice || 0;
    this.lineTotal = itemData.lineTotal || 0;
  }
  
  /**
   * Calculate the line total (quantity × unit price)
   * @returns {number} The calculated line total
   */
  calculateTotal() {
    return this.quantity * this.unitPrice;
  }
}

module.exports = LineItem;