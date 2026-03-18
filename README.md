# 📊 Invoice Validator & Calculator

A professional JavaScript invoice validation and calculation tool designed to detect errors and verify financial data integrity. Built with modern JavaScript (ES6+) and comprehensive test coverage.

## 🎯 Project Overview

This project demonstrates practical skills in:
- Financial data validation
- Automated calculation verification
- Error detection and reporting
- Test-driven development with Jest
- Clean, maintainable code architecture

**Perfect for:** Accounts payable automation, invoice processing systems, and financial software applications.

---

## ✨ Features

### Core Validation
- ✅ **Required Field Validation** - Ensures all critical invoice data is present
- ✅ **Line Item Validation** - Verifies quantities, prices, and descriptions
- ✅ **Date Validation** - Prevents future-dated or invalid invoices
- ✅ **Calculation Verification** - Automatically detects math errors in subtotals, tax, and totals

### Automated Calculations
- 🧮 **Subtotal Calculation** - Automatically calculates from line items
- 🧮 **Tax Calculation** - Applies tax rates with precision
- 🧮 **Total Calculation** - Combines subtotal and tax accurately
- 🧮 **Floating Point Handling** - Properly rounds currency to 2 decimal places

### Professional Utilities
- 💰 **Currency Formatting** - Formats numbers with currency symbols and thousand separators
- 📅 **Date Formatting** - Standardizes date formats (YYYY-MM-DD)
- 📝 **Error Reporting** - Detailed, actionable error messages
- 🎯 **Severity Levels** - Distinguishes between errors and warnings

---

## 🛠️ Technology Stack

- **Runtime:** Node.js v24+
- **Language:** JavaScript (ES6+)
- **Testing:** Jest (40 automated tests, 90% code coverage)
- **Version Control:** Git

---

## 📦 Installation

### Prerequisites
- Node.js v14 or higher
- npm (comes with Node.js)

### Setup

1. **Clone the repository**
```bash
   git clone https://github.com/Nathan-Forest/invoice-validator.git
   cd invoice-validator
```

2. **Install dependencies**
```bash
   npm install
```

3. **Run tests**
```bash
   npm test
```

4. **Check test coverage**
```bash
   npm run test:coverage
```

---

## 🚀 Usage

### Basic Example
```javascript
const Invoice = require('./src/models/Invoice');
const LineItem = require('./src/models/LineItem');
const InvoiceValidator = require('./src/validators/invoiceValidator');

// Create an invoice
const invoice = new Invoice({
  invoiceNumber: 'INV-001',
  invoiceDate: '2024-01-15',
  vendorName: 'ABC Company',
  customerName: 'XYZ Corp',
  lineItems: [
    new LineItem({
      description: 'Laptop',
      quantity: 2,
      unitPrice: 1000,
      lineTotal: 2000
    }),
    new LineItem({
      description: 'Mouse',
      quantity: 5,
      unitPrice: 25,
      lineTotal: 125
    })
  ],
  subtotal: 2125,
  taxRate: 10,
  taxAmount: 212.50,
  total: 2337.50
});

// Validate the invoice
const result = InvoiceValidator.validate(invoice);

if (result.isValid) {
  console.log('✓ Invoice is valid!');
} else {
  console.log(`✗ Found ${result.errorCount} error(s):`);
  result.errors.forEach(error => {
    console.log(`  - [${error.severity}] ${error.field}: ${error.message}`);
  });
}
```

### Using Calculation Utilities
```javascript
const CalculationUtils = require('./src/utils/calculationUtils');

// Automatically calculate invoice totals
const totals = CalculationUtils.calculateInvoiceTotals(lineItems, 10);

console.log(`Subtotal: $${totals.subtotal}`);
console.log(`Tax: $${totals.taxAmount}`);
console.log(`Total: $${totals.total}`);
```

### Using Format Utilities
```javascript
const FormatUtils = require('./src/utils/formatUtils');

// Format currency
console.log(FormatUtils.formatCurrency(1234567.89, 'USD'));
// Output: $1,234,567.89

// Format dates
console.log(FormatUtils.formatDate('2024-01-15'));
// Output: 2024-01-15
```

---

## 📁 Project Structure
```
invoice-validator/
├── src/
│   ├── models/
│   │   ├── Invoice.js          # Invoice data model
│   │   └── LineItem.js         # Line item data model
│   ├── validators/
│   │   ├── invoiceValidator.js # Main validation logic
│   │   └── dateValidator.js    # Date validation utilities
│   ├── utils/
│   │   ├── calculationUtils.js # Calculation helpers
│   │   └── formatUtils.js      # Formatting utilities
│   ├── index.js                # Demo/test file
│   └── testUtils.js            # Utility testing demo
├── tests/
│   ├── calculationUtils.test.js
│   ├── dateValidator.test.js
│   └── invoiceValidator.test.js
├── package.json
├── .gitignore
└── README.md
```

---

## 🧪 Testing

This project uses **Jest** for comprehensive automated testing.

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

### Test Coverage Results
```
Test Suites: 3 passed, 3 total
Tests:       40 passed, 40 total
Code Coverage: 90.9%
```

**Coverage Breakdown:**
- ✅ **Invoice Model:** 100% coverage
- ✅ **Calculation Utils:** 100% coverage
- ✅ **Invoice Validator:** 97.82% coverage
- ✅ **Date Validator:** 68.18% coverage

---

## 🎯 Key Validation Rules

### Required Fields
- Invoice Number
- Invoice Date
- Vendor Name
- Customer Name
- At least one line item

### Line Item Rules
- Description must be present
- Quantity must be greater than 0
- Unit price cannot be negative
- Line total should equal quantity × unit price

### Calculation Rules
- Subtotal must equal sum of all line totals
- Tax amount must equal subtotal × (tax rate / 100)
- Total must equal subtotal + tax amount
- All amounts rounded to 2 decimal places

### Date Rules
- Invoice date must be a valid date
- Invoice date cannot be in the future

---

## 💡 Example Output

### Valid Invoice
```
Validation Result: { 
  isValid: true, 
  errors: [], 
  errorCount: 0 
}
```

### Invalid Invoice
```
Validation Result: {
  isValid: false,
  errors: [
    {
      field: 'invoiceNumber',
      message: 'invoiceNumber is required',
      severity: 'error'
    },
    {
      field: 'subtotal',
      message: 'Subtotal mismatch. Expected: 2125.00, Got: 999.00',
      severity: 'error'
    }
  ],
  errorCount: 2
}
```

---

## 🎓 What I Learned

Building this project taught me:

- **Object-Oriented Programming:** Creating reusable classes and models
- **Data Validation:** Implementing comprehensive business rules
- **Test-Driven Development:** Writing tests first, code second
- **Floating Point Precision:** Handling currency calculations correctly
- **Error Handling:** Providing clear, actionable error messages
- **Code Organization:** Structuring a maintainable project
- **Git Workflow:** Proper commits and version control

---

## 🚀 Future Enhancements

Potential features to add:
- [ ] Support for multiple currencies with exchange rates
- [ ] Payment terms validation (Net 30, Net 60, etc.)
- [ ] Discount calculations
- [ ] Multi-line tax support (state + local)
- [ ] Export validation reports to PDF
- [ ] API endpoint for web integration
- [ ] Database integration for invoice storage
- [ ] Batch invoice validation

---

## 📝 License

This project is licensed under the MIT License - see below for details:
```
MIT License

Copyright (c) 2024 [Nathan Forest]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Nathan Forest**
- GitHub: [@Nathan-Forest](https://github.com/Nathan-Forest)
- LinkedIn: [Nathan Forest](www.linkedin.com/in/nathan-forest-australia)

---

## 🙏 Acknowledgments

- Inspired by real-world accounts payable automation needs
- Built as a demonstration project for financial software development
- Thanks to the Jest team for excellent testing tools

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
