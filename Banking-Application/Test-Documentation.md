# Test Documentation: Banking Fund Transfer

## 1. Feature / Module Name
**Module:** Financial Transactions & History
**Scope:** Intra-bank Transfer, Inter-bank (ACH/Wire) Transfer, Beneficiary Management, and Statement Generation.

---

## 2. Testing Strategy & Coverage Approach
The Banking module strategy focuses on **Transactional Integrity** and **Zero-Downtime Reliability**.
- **Goal:** To ensure every cent is accounted for and no unauthorized transfers occur.
- **Coverage:**
  - **Functional:** Flow of funds between accounts, real-time balance updates.
  - **Security:** Multi-Factor Auth for transfers, Session hijacking, Rate limiting.
  - **Negative:** Insufficient funds, Transfer to frozen accounts, Invalid routing numbers.
  - **Compliance:** Audit trail logging (Verify every action is tracked).
- **Heuristics:** "The Penny Pincher" (transferring $0.01) and "The High Roller" (transferring at the daily limit).

---

## 3. High-Level Test Scenarios
1. Verify user can add and activate a new Beneficiary.
2. Verify 'Same Bank' transfer (Instant) with valid credentials.
3. Verify 'Other Bank' transfer (Standard/Express) with Routing/IFSC codes.
4. Verify system prevents transfer if Balance < (Amount + Fees).
5. Verify transaction history reflects pending, successful, and failed states.
6. Verify daily/monthly transfer limits are enforced.
7. Verify PDF/CSV export of transaction statements.

---

## 4. Detailed Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Priority | Test Type |
|:---|:---|:---|:---|:---|:---|:---|
| TC-BNK-001 | Add Beneficiary | 1. Enter Acct #, Name, IFSC. 2. Verify OTP. | Acct: 12345678 | Beneficiary added to 'Active' list. | High | Functional |
| TC-BNK-002 | Internal Transfer Success | 1. Select Own Acct. 2. Enter amt. 3. Confirm. | Amt: $500.00 | Balances update in both accounts instantly. | High | Functional |
| TC-BNK-003 | Insufficient Funds | 1. Transfer $1000 with $900 balance. | Amt: $1000.00 | Error: "Insufficient funds for transfer." | High | Negative |
| TC-BNK-004 | External Transfer (ACH) | 1. Enter Routing #. 2. Submit. | Routing: 021000021 | Transaction initiated; Shows as 'Pending'. | High | Functional |
| TC-BNK-005 | Invalid Routing Number | 1. Enter random 9 digits. | Routing: 000000000 | Error: "Invalid ABA Routing number." | Medium | Negative |
| TC-BNK-006 | Daily Limit Enforced | 1. Attempt transfer of $50,001 (Limit: 50k). | Amt: $50,001 | Error: "Transaction exceeds daily limit." | High | Boundary |
| TC-BNK-007 | Transaction History Sync | 1. Complete transfer. 2. Open History. | N/A | Entry shows correct Timestamp and Ref ID. | High | Functional |
| TC-BNK-008 | Statement Export (PDF) | 1. Select 'Last Month'. 2. Click PDF. | N/A | PDF downloads with correct transactions. | Medium | Functional |
| TC-BNK-009 | Transfer to Frozen Account | 1. Input a blocked account #. | Acct: 99887766 | Error: "Account is restricted." | High | Negative |
| TC-BNK-010 | Zero Amount Transfer | 1. Enter $0.00 in amount. | Amt: $0.00 | 'Transfer' button disabled or Error: "> 0". | Low | Boundary |
| TC-BNK-011 | Special Chars in Remarks | 1. Add "Rent for Oct & Nov!" | Remarks: & ! | System processes transaction correctly. | Low | Functional |
| TC-BNK-012 | Session Timeout (Transfer) | 1. Input data. 2. Wait 15 mins. 3. Click Submit. | N/A | Redirected to Login; No money deducted. | High | Security |
| TC-BNK-013 | Back Button During Process | 1. Click Confirm. 2. Press Browser Back. | N/A | "Processing" screen maintained or re-auth. | Medium | Logic |
| TC-BNK-014 | Multi-Tab Transfer | 1. Open 2 tabs. 2. Transfer in both. | $100 in each | Concurrent logic ensures balance isn't over-drawn. | High | Logic/Conc. |
| TC-BNK-015 | Correct Fee Calculation | 1. Choose Express Wire. | Amt: $1000 | Fee (e.g., $15) added to total deduction. | Medium | Functional |
| TC-BNK-016 | SMS Alert Verification | 1. Perform transaction. 2. Check SMS. | N/A | "Debited with $X. Ref: Y" received in < 60s. | High | Functional |
| TC-BNK-017 | Search in History | 1. Filter by "Rent". | Keyword: "Rent" | Only rent-related entries shown. | Low | Usability |
| TC-BNK-018 | Future Dated Transfer | 1. Select date: Next Monday. | Date: +7 Days | Scheduled transfer appears in 'Upcoming' list. | Medium | Functional |
| TC-BNK-019 | Cancel Scheduled Transfer | 1. View Upcoming. 2. Click Cancel. | N/A | Transfer removed; No funds deducted. | Medium | Functional |
| TC-BNK-020 | Account Type Logic | 1. Transfer from Savings to CD. | N/A | System checks if withdrawal is allowed from CD. | High | Business Rule|

---

## 5. Negative Test Cases
- **TC-NEG-001:** Attempt to transfer money from a 'Closed' account.
- **TC-NEG-002:** Entering more than 2 decimal places in the amount field (e.g., $10.555).
- **TC-NEG-003:** Using an OTP that has already been used for a previous transaction.
- **TC-NEG-004:** Transferring funds to the same account as the sender.

## 6. Edge Case Testing
- **TC-EDGE-001:** Transaction exactly at 11:59:59 PM (Day boundary for limits).
- **TC-EDGE-002:** Performing a transfer when the Central Bank (Fed) server is down.
- **TC-EDGE-003:** Handling a transfer of $0.01 (Minimum viable transaction).

## 7. Boundary Value Test Cases
- **TC-BVA-001:** Transfer exactly the total available balance (Result should be $0.00).
- **TC-BVA-002:** Transfer $0.01 more than the available balance.
- **TC-BVA-003:** Transfer exactly the single-transaction maximum limit.

## 8. Risk-Based Test Cases
- **TC-RISK-001:** Verify "Man-in-the-Middle" (MitM) protection for transaction payloads. (High Risk)
- **TC-RISK-002:** Verify that failed transfers are automatically rolled back (Atomic transactions). (High Risk)
- **TC-RISK-003:** Verify Anti-Money Laundering (AML) triggers for unusually large transfers (e.g., >$10k). (High Risk)

## 9. Regression Test Cases
- **TC-REG-001:** Verify Beneficiary list still loads after upgrading the Backend API.
- **TC-REG-002:** Verify 'History' filters still work after a CSS layout change.

## 10. Possible Bugs or Failure Conditions
1. **Balance Flicker:** UI shows old balance for 3-5 seconds after a successful transfer.
2. **Double Deduction:** Hitting 'Enter' twice on the confirmation page triggering two API calls.
3. **Truncation:** System rounding $10.999 to $10.99 instead of $11.00, leading to a 1-cent discrepancy.

---

## 11. Traceability Mapping (RTM)

| Requirement ID | Requirement Description | Test Case IDs | Status |
|:---|:---|:---|:---|
| REQ-BNK-01 | Customer Onboarding | TC-BNK-001 | Passed |
| REQ-BNK-02 | Transfer Engine | TC-BNK-002, 003, 004, 006, 010, 014 | Passed |
| REQ-BNK-03 | Financial Records | TC-BNK-007, 008, 017 | Passed |
| REQ-BNK-04 | Security Protocol | TC-BNK-005, 012, 016 | Passed |
| REQ-BNK-05 | Advanced Logic | TC-BNK-009, 011, 013, 015, 018 | Passed |
| REQ-BNK-06 | Business Rules | TC-BNK-019, 020 | Passed |
