# Test Documentation: Healthcare Patient Booking

## 1. Feature / Module Name
**Module:** Patient Onboarding & Appointment Lifecycle
**Scope:** New Patient Registration, Doctor Search, Appointment Scheduling, and Reminders.

---

## 2. Testing Strategy & Coverage Approach
The Healthcare module strategy focuses on **Data Integrity** and **Scheduling Logic Precision**.
- **Goal:** To ensure patients can register accurately and book appointments without conflicts or data leaks.
- **Coverage:**
  - **Functional:** Patient KYC (Know Your Customer) flow, slot availability real-time check.
  - **Logic:** Prevention of double-booking, handling time-zone differences.
  - **Data Integrity:** Ensuring medical history/details are saved correctly.
  - **Compliance (Simulated):** Basic PII protection and sensitive field masking.
- **Heuristics:** "The Last Minute Booker" and "The Forgetful Patient" (modifying/canceling appointments frequently).

---

## 3. High-Level Test Scenarios
1. Verify new patient registration with personal and insurance details.
2. Verify doctor search by Specialty, Availability, and Proximity.
3. Verify booking a "New" appointment for an available slot.
4. Verify system prevents booking on already occupied slots (Double booking).
5. Verify rescheduling an existing appointment.
6. Verify appointment cancellation and refund/notification logic.
7. Verify automated SMS/Email reminders for upcoming visits.

---

## 4. Detailed Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Priority | Test Type |
|:---|:---|:---|:---|:---|:---|:---|
| TC-HEA-001 | Patient Registration | 1. Enter Name, DOB, SSN. 2. Upload ID. | DOB: 1990-01-01 | Registration successful; Patient ID generated. | High | Functional |
| TC-HEA-002 | Search Doctor by Specialty | 1. Select 'Cardiology'. 2. Click Search. | Specialty: Cardiology | List of Cardiologists only. | High | Functional |
| TC-HEA-003 | Slot Availability Sync | 1. Check Dr. Smith's slots. 2. Booked slot hidden? | Slot: 10:00 AM | Booked slots appear as 'Unavailable'. | High | Functional |
| TC-HEA-004 | Successful Booking | 1. Select Slot. 2. Confirm. | Slot: 2:00 PM | Booking Confirmed; Confirmation SMS sent. | High | Functional |
| TC-HEA-005 | Double Booking Prevention| 1. Two users attempt same slot. | User A/B, Same slot | Only the first user succeeds; Second gets "Slot taken". | High | Logic/Conc. |
| TC-HEA-006 | Insurance Validation | 1. Enter invalid insurance ID. | ID: 999999 | Error: "Insurance provider not recognized." | Medium | Negative |
| TC-HEA-007 | Mandatory Medical History | 1. Skip 'Allergies' field. 2. Save. | N/A | Prompt: "Please specify allergies or 'None'." | Medium | Functional |
| TC-HEA-008 | Appointment Reschedule | 1. Select active booking. 2. Change date. | New Date: Tomorrow | Old slot freed; New slot confirmed. | High | Functional |
| TC-HEA-009 | Cancellation (Within 24hr)| 1. Cancel same-day appt. | N/A | Warning about cancellation fee shown. | Medium | Business Rule|
| TC-HEA-010 | Past Date Booking | 1. Try to book for yesterday. | Date: 2020-01-01 | Calendar prevents selection of past dates. | Medium | Boundary |
| TC-HEA-011 | Telehealth vs In-person | 1. Select 'Telehealth'. 2. Confirm. | Mode: Video | Zoom/Video link generated in confirmation. | High | Functional |
| TC-HEA-012 | Multi-specialty search | 1. Search for 'Heart' and 'Pediatrics' | Tags: Heart, Kids | Results match both keywords effectively. | Low | Usability |
| TC-HEA-013 | File Upload (Medical Rep) | 1. Attach 10MB PDF report. | File: lab_results.pdf | File saved to profile; accessible to Doctor. | Medium | Functional |
| TC-HEA-014 | Duplicate Registration | 1. Try to register with same SSN. | SSN: XXX-XX-6789 | Error: "Patient already registered." | High | Security |
| TC-HEA-015 | Time zone conversion | 1. Patient in GMT. 2. Dr in EST. | N/A | App shows slot in Patient's local time. | High | Edge Case |
| TC-HEA-016 | Age verification | 1. Register guest as 'Minor'. | Age: 5 | Prompt for 'Parental/Guardian' details. | Medium | Functional |
| TC-HEA-017 | Emergency Contact Check | 1. Submit without Emergency Ph. | N/A | Validation error: "Required field." | Low | Functional |
| TC-HEA-018 | Bulk Booking (Group) | 1. Book for self + 2 family. | N/A | Three separate/linked slots reserved. | Medium | Functional |
| TC-HEA-019 | Notification Delivery | 1. Check reminder 1hr before. | N/A | Push/SMS received on patient device. | High | Functional |
| TC-HEA-020 | Doctor Profile View | 1. Click Doctor Name. | Dr. Alice | View bio, rating, and clinic address. | Low | Usability |

---

## 5. Negative Test Cases
- **TC-NEG-001:** Attempt to book an appointment for a Doctor who has 'Leave' status on that day.
- **TC-NEG-002:** Entering symbols like `!@#$%` in the 'Symptoms' description field.
- **TC-NEG-003:** Uploading a corrupt JPEG file as a medical report.
- **TC-NEG-004:** Bypassing the 'Payment' step (if applicable) for a premium consultation.

## 6. Edge Case Testing
- **TC-EDGE-001:** Leap Year booking (Feb 29th) handling.
- **TC-EDGE-002:** System behavior when the 'Doctor' cancels the appointment from their portal.
- **TC-EDGE-003:** Booking during a Daylight Savings Time (DST) transition hour.

## 7. Boundary Value Test Cases
- **TC-BVA-001:** Patient Age exactly 0 (Newborn registration).
- **TC-BVA-002:** Patient Age exactly 120 (Senior registration).
- **TC-BVA-003:** Booking a slot at the very start of the day (e.g., 08:00 AM) and end of the day (e.g., 08:00 PM).

## 8. Risk-Based Test Cases
- **TC-RISK-001:** Verify HIPAA compliance: Ensuring medical notes are not visible to administrative staff. (High Risk)
- **TC-RISK-002:** Verify that PII (SSN, Phone) is encrypted at rest in the database. (High Risk)
- **TC-RISK-003:** Verify that an expired session does not leave patient health data on the screen. (Medium Risk)

## 9. Regression Test Cases
- **TC-REG-001:** Verify 'Search Doctor' still functions after a database schema migration.
- **TC-REG-002:** Verify that the 'Cancel' button is still available on the Dashboard after a UI redesign.

## 10. Possible Bugs or Failure Conditions
1. **Clock Drift:** Server time is 5 minutes behind, allowing patients to book slots that have technically already started.
2. **Infinite Loading:** Search spinner never stops if the 'Specialty' API returns an empty array.
3. **Data Overwrite:** Editing Patient A's details somehow updating Patient B's record due to incorrect ID passing.

---

## 11. Traceability Mapping (RTM)

| Requirement ID | Requirement Description | Test Case IDs | Status |
|:---|:---|:---|:---|
| REQ-HEA-01 | Patient Management | TC-HEA-001, 007, 014, 016, 017 | Passed |
| REQ-HEA-02 | Provider Discovery | TC-HEA-002, 012, 020 | Passed |
| REQ-HEA-03 | Booking Engine | TC-HEA-003, 004, 005, 010, 011 | Passed |
| REQ-HEA-04 | Lifecycle Management | TC-HEA-008, 009 | Passed |
| REQ-HEA-05 | Communications | TC-HEA-015, 019 | Passed |
| REQ-HEA-06 | Documentation | TC-HEA-013 | Passed |
