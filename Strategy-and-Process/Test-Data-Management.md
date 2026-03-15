# 📊 Test Data Management (TDM) Plan

## 1. Objective
To ensure that all testing levels have access to high-quality, compliant, and diverse test data without compromising Production security (PII/PHI).

---

## 2. Data Categories & Sources

| Data Type | Example | Source | Management Strategy |
| :--- | :--- | :--- | :--- |
| **Transactional** | Credit Card, SSN | Synthetic | Generated using Mockaroo/Faker to avoid PII. |
| **Conditional** | Expired Accounts | Sub-setting | Copied from Prod, then scrambled and modified. |
| **Reference** | Currency Codes | Static | Configured once per environment. |
| **High Volume** | 1M+ Records | Scripted | SQL scripts to populate the DB for load testing. |

---

## 3. PII Masking Protocals (GDPR/HIPAA)
For an 8-year experienced QA, privacy is paramount. We use the following techniques:
- **Shuffling:** Randomizing the order of values in a column (e.g., swapping Last Names).
- **Substitution:** Replacing real names with fictitious ones.
- **Nulling/Masking:** Replacing part of the data with `X` (e.g., XXX-XX-6789).
- **Date Shifting:** Adding/Subtracting a random range of days to birthdays.

---

## 4. Environment-Wise Data Strategy
- **QA Env:** Stable, small dataset for functional sanity.
- **Staging Env:** 1:1 Mirror of Prod (Scrubbed) for UAT and Regression.
- **Sandbox:** Empty DB for Developers to test fresh migrations.

---

## 5. Automation of TDM
- **Cleanup Scripts:** Python/SQL scripts that reset the account balance to $5000 every midnight.
- **On-Demand Data:** Using a 'Data-as-a-Service' API where QA can request a "User with 5 active orders" via a POST call.
