# Requirement Traceability Matrix (RTM) - Banking Module

## 📌 Project Overview
**Project:** Apex Global Banking (v2.4)
**Target Date:** 2024-Q3
**QA Lead:** [Your Name]

---

## 📊 Traceability Matrix

| Req ID | Business Requirement | Priority | Test Case ID(s) | Status | Defects Linked |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BR-BK-001** | User must be able to add a third-party beneficiary. | P0 | TC-BNK-001 | ✅ Pass | None |
| **BR-BK-002** | System must prevent fund transfer if balance is insufficient. | P0 | TC-BNK-003, TC-BVA-002 | ✅ Pass | None |
| **BR-BK-003** | Daily txn limit should be capped at $50,000 for standard users. | P1 | TC-BNK-006, TC-BVA-003 | ⚠️ Warning | BUG-009 (Limit check delayed by 2s) |
| **BR-BK-004** | All transactions must trigger a real-time SMS/Email alert. | P1 | TC-BNK-016 | ✅ Pass | None |
| **BR-BK-005** | Transaction history must allow filtering by date and category. | P2 | TC-BNK-007, TC-BNK-017 | ✅ Pass | None |
| **BR-BK-006** | System must support multi-currency conversion at spot rate. | P1 | TC-BNK-015, TC-BVA-010 | ❌ Fail | BUG-005 (Rounding error) |
| **BR-BK-007** | Session must time out after 10 minutes of inactivity. | P0 | TC-BNK-012 | ✅ Pass | None |

---

## 📈 Summary Metrics
- **Total Requirements:** 7
- **Requirements Covered:** 7 (100%)
- **Successful Tests:** 5
- **Failed Requirements:** 1
- **In-Progress:** 1

---
### Legend:
- **P0:** Business Critical (Blocker)
- **P1:** High (Must have)
- **P2:** Medium (Nice to have)
