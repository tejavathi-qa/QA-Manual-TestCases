# Test Documentation: E-commerce Product Flow

## 1. Feature / Module Name
**Module:** E-commerce Core Journey
**Scope:** Product Search, Shopping Cart, Checkout Process, and Payment Integration.

---

## 2. Testing Strategy & Coverage Approach
The E-commerce module strategy focuses on **Conversion funnel integrity** and **Data Consistency**.
- **Goal:** To ensure a frictionless path from product discovery to successful order placement.
- **Coverage:**
  - **Functional:** Product filtering, cart persistence, coupon calculation, and payment success.
  - **Business Logic:** Inventory checks (out-of-stock), tax calculations, and shipping rules.
  - **Negative:** Invalid credit cards, expired coupons, and stock depletion during checkout.
  - **Performance (Manual observation):** Search result loading time and cart update responsiveness.
- **Heuristics:** "The Greedy Shopper" (adding/removing items rapidly) and "The Indecisive User" (abandoning cart at various stages).

---

## 3. High-Level Test Scenarios
1. Verify user can search for products using keywords and categories.
2. Verify 'Add to Cart' functionality for single and multiple items.
3. Verify Cart updates (Quantity, Price, Remove item) correctly.
4. Verify Checkout flow for Guest and Registered users.
5. Verify Discount/Coupon application logic.
6. Verify Payment processing via Credit Card and Digital Wallets.
7. Verify Order Confirmation and Inventory reduction post-purchase.

---

## 4. Detailed Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Priority | Test Type |
|:---|:---|:---|:---|:---|:---|:---|
| TC-ECO-001 | Basic Product Search | 1. Enter keyword in search bar. 2. Press Enter. | Keyword: "iPhone 15" | Relevant products displayed; Results count matches DB. | High | Functional |
| TC-ECO-002 | Search with no results | 1. Enter non-existent product. | Keyword: "xyz123abc" | Message: "No products found." | Medium | Negative |
| TC-ECO-003 | Filter by Price Range | 1. Apply price filter ($500-$1000). | Price: 500-1000 | Only products within range are shown. | High | Functional |
| TC-ECO-004 | Add Item to Cart | 1. Click 'Add to Cart' on product. | Product: Laptop | Mini-cart increments; Notification shows. | High | Functional |
| TC-ECO-005 | Update Quantity in Cart | 1. Change qty from 1 to 5. | Qty: 5 | Total price updates dynamically. | High | Functional |
| TC-ECO-006 | Remove Item from Cart | 1. Click 'Remove'. | Product in cart | Item removed; Subtotal decreases. | High | Functional |
| TC-ECO-007 | Cart Persistence | 1. Add items. 2. Logout. 3. Login. | N/A | Items still present in cart. | Medium | Functional |
| TC-ECO-008 | Max Quantity Limitation | 1. Try to add 1000 items. | Qty: 1000 | Error: "Max purchase limit reached." | Medium | Boundary |
| TC-ECO-009 | Out of Stock handling | 1. Select 'Out of Stock' item. | N/A | 'Add to Cart' button disabled or shows 'Notify me'. | High | Functional |
| TC-ECO-010 | Invalid Coupon Code | 1. Enter expired code at checkout. | Code: EXPIRED50 | Error: "Invalid or expired coupon." | Medium | Negative |
| TC-ECO-011 | Successful Coupon Apply| 1. Enter valid code. | Code: SAVE10 | Total price reduced by 10%. | High | Functional |
| TC-ECO-012 | Tax Calculation | 1. Check tax at checkout. | Region: NY (8.8%) | Tax calculated accurately based on shipping address. | High | Functional |
| TC-ECO-013 | Checkout as Guest | 1. Proceed to payment without login. | Guest Info | Flow allows purchase completion. | Medium | Functional |
| TC-ECO-014 | Credit Card Success | 1. Enter valid card details. | Card: 4111... | Payment success page; Order ID generated. | High | Functional |
| TC-ECO-015 | Invalid Card Format | 1. Enter 15-digit Visa card. | Card: 1234... | Error: "Enter a valid card number." | High | Negative |
| TC-ECO-016 | Declined Transaction | 1. Use card with insufficient funds.| Declined Card | Error: "Transaction declined. Try another method." | High | Negative |
| TC-ECO-017 | Order History Sync | 1. Complete purchase. 2. Check Profile. | N/A | New order appears in 'My Orders' immediately. | Medium | Functional |
| TC-ECO-018 | Handling special chars | 1. Search for "T-shirt & Jeans". | Sp. Char: & | System handles escape chars without crashing. | Low | Functional |
| TC-ECO-019 | Sorting Results (Price) | 1. Sort by "Price: Low to High". | N/A | Cheapest item appears first. | Medium | Usability |
| TC-ECO-020 | Mini-cart UI Sync | 1. Add item on Product page. | N/A | Mini-cart in Header updates without refresh. | Medium | Functional |

---

## 5. Negative Test Cases
- **TC-NEG-001:** Attempt to checkout with an empty cart.
- **TC-NEG-002:** Proceeding to payment with an expired credit card.
- **TC-NEG-003:** Entering a negative number in the 'Set Quantity' input field.
- **TC-NEG-004:** Applying a coupon that is valid for a different product category.

## 6. Edge Case Testing
- **TC-EDGE-001:** Shipping to a Restricted Zone (PO Box or International if not supported).
- **TC-EDGE-002:** User modifies cart quantity in two different tabs simultaneously.
- **TC-EDGE-003:** Network disconnection during the critical "Processing Payment" state.

## 7. Boundary Value Test Cases
- **TC-BVA-001:** Order total exactly at the 'Free Shipping' threshold (e.g., $50.00).
- **TC-BVA-002:** Order total $0.01 below the 'Free Shipping' threshold.
- **TC-BVA-003:** Adding the maximum allowed units of all products in the flagship category.

## 8. Risk-Based Test Cases
- **TC-RISK-001:** Verify PII (Personally Identifiable Information) encryption during Checkout. (High Risk)
- **TC-RISK-002:** Verify that stock is locked during the checkout session to prevent double-sale. (High Risk)
- **TC-RISK-003:** Verify Refund logic triggered by Payment Gateway failure. (High Risk)

## 9. Regression Test Cases
- **TC-REG-001:** Verify 'Search' functionality after updating the Category Hierarchy.
- **TC-REG-002:** Verify Payment Gateway icons display correctly after a Header update.

## 10. Possible Bugs or Failure Conditions
1. **Quantity Desync:** Database stores 10 items, but UI allows adding 11 if two people checkout at once.
2. **Rounding Errors:** Total price showing decimals like `$100.0000001` due to floating point math in tax calc.
3. **Session Loss:** Cart items disappearing if the user switches from Wi-Fi to Mobile Data during checkout.

---

## 11. Traceability Mapping (RTM)

| Requirement ID | Requirement Description | Test Case IDs | Status |
|:---|:---|:---|:---|
| REQ-ECO-01 | Product Discovery | TC-ECO-001, 002, 003, 018, 019 | Passed |
| REQ-ECO-02 | Cart Management | TC-ECO-004, 005, 006, 007, 008, 020 | Passed |
| REQ-ECO-03 | Checkout Logic | TC-ECO-010, 011, 012, 013 | Passed |
| REQ-ECO-04 | Payment Processing | TC-ECO-014, 015, 016 | Passed |
| REQ-ECO-05 | Fulfillment/Inventory | TC-ECO-009, 017 | Passed |
