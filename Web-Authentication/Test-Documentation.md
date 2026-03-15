# Test Documentation: User Authentication Module

## 1. Feature / Module Name
**Module:** User Authentication (Web Application)
**Scope:** User Signup, Login, Password Reset, and Multi-Factor Authentication (MFA).

---

## 2. Testing Strategy & Coverage Approach
The strategy for the Authentication module focuses on **Security-First** and **Data Integrity** principles.
- **Goal:** To ensure only authorized users can access the system while providing a seamless onboarding experience.
- **Coverage:**
  - **Functional:** End-to-end flows for new and returning users.
  - **Security:** Brute force protection, credential handling, and session management.
  - **Compatibility:** Responsiveness across modern browsers (Chrome, Firefox, Safari).
  - **Accessibility:** Keyboard navigation and screen reader support for login fields.
- **Heuristics:** Use of "Goldilocks" data (too small, too big, just right) for field validation.

---

## 3. High-Level Test Scenarios
1. Verify user can create a new account with valid details.
2. Verify user cannot register with an already existing email.
3. Verify successful login with valid credentials (Email & Password).
4. Verify account lockout after multiple failed login attempts.
5. Verify 'Forgot Password' functionality via email link.
6. Verify MFA (OTP) verification for enhanced security.
7. Verify session timeout and logout functionality.

---

## 4. Detailed Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Priority | Test Type |
|:---|:---|:---|:---|:---|:---|:---|
| TC-AUTH-001 | Successful User Signup | 1. Navigate to Signup page. 2. Enter valid details. 3. Click 'Sign Up'. | Name: John Doe, Email: john@example.com, Pass: Password@123 | Account created successfully; Redirected to Dashboard. | High | Functional |
| TC-AUTH-002 | Email format validation | 1. Enter invalid email. 2. Attempt to submit. | Email: john.com | Error message: "Enter a valid email address." | High | Negative |
| TC-AUTH-003 | Password strength check | 1. Enter weak password. 2. Check validation UI. | Pass: 12345 | Error message indicating password complexity requirements. | Medium | Functional |
| TC-AUTH-004 | Duplicate Email Signup | 1. Enter an email already in DB. 2. Click 'Sign Up'. | Email: john@example.com | Error: "Email already exists." | High | Negative |
| TC-AUTH-005 | Successful Login | 1. Navigate to Login. 2. Enter valid credentials. 3. Click 'Login'. | Email: john@example.com, Pass: Password@123 | User logged in; Session established. | High | Functional |
| TC-AUTH-006 | Invalid Password Login | 1. Enter valid email. 2. Enter wrong password. 3. Click 'Login'. | Pass: WrongPass123 | Error: "Invalid credentials." | High | Negative |
| TC-AUTH-007 | Mandatory Field Check | 1. Leave all fields empty. 2. Click 'Sign Up'. | N/A | Inline error messages for all mandatory fields. | Medium | Functional |
| TC-AUTH-008 | Password Visibility Toggle | 1. Enter password. 2. Click 'Eye' icon. | Pass: Password123 | Password mask changes to plain text and back. | Low | Usability |
| TC-AUTH-009 | Forgot Password Link | 1. Click 'Forgot Password'. 2. Submit valid email. | Email: john@example.com | Success msg: "Password recovery link sent." | High | Functional |
| TC-AUTH-010 | Reset Link Expiry | 1. Use an expired reset link. | Expired Token | Error: "Link has expired." | Medium | Edge Case |
| TC-AUTH-011 | Account Lockout (Brute Force) | 1. Enter wrong pass 5 times. | N/A | Account locked for 30 mins; Warning sent to email. | High | Security |
| TC-AUTH-012 | MFA OTP Verification | 1. Login with valid creds. 2. Enter valid OTP. | OTP: 654321 | Successful entry to application. | High | Functional |
| TC-AUTH-013 | Expired OTP Entry | 1. Enter OTP after 5 mins. | OTP: 123456 (old) | Error: "OTP expired. Request new one." | Medium | Negative |
| TC-AUTH-014 | SQL Injection in Login | 1. Enter SQL payload in Login field. | User: ' OR 1=1 -- | System prevents access and treats as invalid input. | High | Security |
| TC-AUTH-015 | XSS in Name field | 1. Enter `<script>alert(1)</script>` | Name: `<script>...` | Script is sanitized; No alert dialog pops up. | High | Security |
| TC-AUTH-016 | Remember Me functionality | 1. Check 'Remember Me'. 2. Login. 3. Restart browser. | N/A | User remains logged in during the next session. | Medium | Functional |
| TC-AUTH-017 | Logout Session Invalidation | 1. Login. 2. Click 'Logout'. 3. Navigate back. | N/A | Redirected back to Login; Browser back button fails. | High | Security |
| TC-AUTH-018 | Case Sensitivity of Password| 1. Register with 'Pass123'. 2. Login with 'pass123'. | Pass: pass123 | Login fails (Passwords should be case-sensitive). | Medium | Functional |
| TC-AUTH-019 | Trim Whitespace in Email | 1. Add spaces before/after email. | Email: " user@ex.com " | System trims spaces and logs in successfully. | Low | Usability |
| TC-AUTH-020 | Concurrent Session Limit | 1. Login on 10 devices. | N/A | System limits or notifies about multiple sessions. | Medium | Boundary |

---

## 5. Negative Test Cases
- **TC-NEG-001:** Attempt to signup with a password exceeding the max character limit (256+).
- **TC-NEG-002:** Attempt to login with a disabled/deactivated account.
- **TC-NEG-003:** Entering non-numeric characters in the OTP field.
- **TC-NEG-004:** Bypassing authentication by directly entering the Dashboard URL.

## 6. Edge Case Testing
- **TC-EDGE-001:** Signup when the server database is temporarily unreachable (Verify error handling).
- **TC-EDGE-002:** User resets password and simultaneously tries to login with the old password.
- **TC-EDGE-003:** Handling special characters in the 'Name' field (e.g., O'Connor, Smith-Jones).

## 7. Boundary Value Test Cases
- **TC-BVA-001:** Password exactly 8 characters (Min limit).
- **TC-BVA-002:** Password exactly 7 characters (Below Min limit).
- **TC-BVA-003:** Email length at maximum allowed characters (e.g., 100).

## 8. Risk-Based Test Cases
- **TC-RISK-001:** Verify that sensitive data (Passwords) is not stored in plaintext in the DB. (High Risk)
- **TC-RISK-002:** Verify that the 'Reset Password' link cannot be reused. (High Risk)
- **TC-RISK-003:** Verify session hijack protection over HTTPS. (High Risk)

## 9. Regression Test Cases
- **TC-REG-001:** Verify standard login flow after a new UI deployment.
- **TC-REG-002:** Verify that the "Sign up" button is still functional after Footer updates.

## 10. Possible Bugs or Failure Conditions
1. **Race Condition:** Two users trying to register with the same email at the exact same millisecond.
2. **Session Persistence:** Login session not expiring even after the user closes the browser tab.
3. **MFA Bypass:** If the user can navigate to `/dashboard` by manually typing the URL after entering valid credentials but before OTP verification.

---

## 11. Traceability Mapping (RTM)

| Requirement ID | Requirement Description | Test Case IDs | Status |
|:---|:---|:---|:---|
| REQ-AUTH-01 | User Registration | TC-AUTH-001, 002, 003, 004, 007 | Passed |
| REQ-AUTH-02 | User Login | TC-AUTH-005, 006, 008, 011, 014 | Passed |
| REQ-AUTH-03 | Password Recovery | TC-AUTH-009, 010, 018 | Passed |
| REQ-AUTH-04 | Multi-Factor Auth | TC-AUTH-012, 013 | Passed |
| REQ-AUTH-05 | Session Management | TC-AUTH-016, 017, 020 | Passed |
