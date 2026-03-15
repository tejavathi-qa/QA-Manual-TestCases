# 🐛 Professional Defect Registry (Bug Log)

## 📌 Overview
This registry tracks high-impact defects identified during the testing of various modules. Each entry includes Root Cause, Severity, and the 'Senior QA' recommendation for fixes.

---

## 🛠 Active Defect Log

| Bug ID | Title | Module | Severity | Status | RCA Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-001** | **Race Condition on Multi-Click** | Banking | Critical | Open | Rapid clicking on 'Confirm' button bypasses frontend debounce, resulting in duplicate transactions in the DB. |
| **BUG-002** | **PII Leak in Logs** | Healthcare | High | Resolved | Patient SSN was being logged in plaintext within the application server logs during 500 internal errors. |
| **BUG-003** | **IDOR on Opportunity Edit** | CRM | Critical | Fix Verified | Replacing AccountID in the URL allows a 'Sales Exec' to edit Opportunities belonging to other regions. |
| **BUG-004** | **JWT Token Not Revoked on Logout** | Web-Auth | Medium | Open | Session token remains active in the backend for 15 mins after user clicks 'Logout'. |
| **BUG-005** | **Rounding Error in FX Calc** | Banking | High | In Progress | 1.999 USD is being truncated to 1.99 instead of 2.00 during Euro conversion, causing ledger imbalance. |

---

## 📝 Detailed Defect Spec (Example: BUG-001)

### Description:
A race condition exists where if a user double-clicks the 'Submit' button on a slow network, the transaction is processed twice because the backend doesn't check for idempotency.

### Steps to Reproduce:
1. Navigate to 'Fund Transfer'.
2. Enter valid details.
3. Using 'Network Throttling' (Fast 3G), click the 'Submit' button twice rapidly.

### Expected Result:
System should disable the button after the first click and the backend should reject the second request (HTTP 409 Conflict).

### Actual Result:
Two separate Transaction IDs are generated, and the user's balance is deducted twice.

### Recommendations:
- **Frontend:** Implement a global 'Loading State' that disables interactive elements during API calls.
- **Backend:** Implement **Idempotency Keys** (X-Idempotency-Key) for all mutation requests.
