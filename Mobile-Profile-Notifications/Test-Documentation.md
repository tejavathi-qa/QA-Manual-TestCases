# Test Documentation: Mobile Profile & Notifications

## 1. Feature / Module Name
**Module:** User Profile & Push Notifications (Mobile App)
**Scope:** Profile Editing, Avatar Upload, Privacy Settings, and Notification handling (In-app and Push).

---

## 2. Testing Strategy & Coverage Approach
The Mobile module strategy focuses on **Interruption** and **Synchronization** behaviors.
- **Goal:** To ensure profile data stays consistent across devices and notifications are delivered timely without draining battery.
- **Coverage:**
  - **Functional:** CRUD operations on profile, Notification toggle logic.
  - **Interruption:** Handling incoming calls/SMS while editing profile.
  - **Device-Specific:** Permission handling (Camera for avatar, Notification settings).
  - **Network:** Profile updates on low-bandwidth (2G/Edge) and offline mode.
- **Heuristics:** "The Minimalist" (skipping all optional fields) and "The Social Butterfly" (uploading large high-res images).

---

## 3. High-Level Test Scenarios
1. Verify user can view and edit personal information (Name, Bio, Phone).
2. Verify profile avatar upload from Gallery and Camera.
3. Verify password change and account security settings.
4. Verify Push Notification delivery when the app is in Background/Killed state.
5. Verify In-app notification visibility during active usage.
6. Verify 'Do Not Disturb' (DND) or 'Silent' mode compliance.
7. Verify Deep Linking: Clicking a notification opens the correct screen.

---

## 4. Detailed Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Priority | Test Type |
|:---|:---|:---|:---|:---|:---|:---|
| TC-MOB-001 | Edit Profile Name | 1. Navigate to Profile. 2. Edit Name. 3. Save. | Name: Jane Doe | SUCCESS toast shown; UI updates. | High | Functional |
| TC-MOB-002 | Avatar Upload (Gallery) | 1. Click Profile Image. 2. Select from Gallery. | Image: jpeg (2MB) | Image crops and uploads successfully. | Medium | Functional |
| TC-MOB-003 | Avatar Upload (Camera) | 1. Click Profile Image. 2. Take photo. | Live Photo | Camera opens; Photo saved to profile. | Medium | Functional |
| TC-MOB-004 | Deny Camera Permission | 1. Trigger Avatar change. 2. Deny permission. | N/A | App shows "Permission required" message. | High | Security |
| TC-MOB-005 | Phone Number Validation | 1. Enter alphabet in Phone field. | Data: "abc123" | Keyboard should be numeric; Error if invalid. | Medium | Functional |
| TC-MOB-006 | Push Notification (Killed) | 1. Kill app. 2. Trigger notification. | N/A | Notification appears in System Tray. | High | Functional |
| TC-MOB-007 | Push Notification (BG) | 1. Put app in background. 2. Trigger. | N/A | Notification appears; Badge count updates. | High | Functional |
| TC-MOB-008 | Notification Toggle (Off) | 1. Turn off 'Promotions' toggle. 2. Trigger. | N/A | No notification received for that category. | High | Functional |
| TC-MOB-009 | Deep Link Notification | 1. Click 'New Message' notification. | N/A | App opens directly to 'Chat' screen. | High | Usability |
| TC-MOB-010 | Profile Update (Offline) | 1. Turn off Wi-Fi. 2. Edit bio. 3. Save. | Bio: "Hello!" | App shows "Offline" alert or queues update. | Medium | Negative |
| TC-MOB-011 | Battery Optimization check| 1. Enable 'Low Power Mode'. 2. Check Push. | N/A | Notifications should still arrive (priority). | Low | Edge Case |
| TC-MOB-012 | Interruption (Phone Call) | 1. Edit profile. 2. Receive call. | N/A | Profile state preserved after call ends. | Medium | Functional |
| TC-MOB-013 | Large File Upload | 1. Try to upload 50MB image. | Image: 50MB | Error: "File size exceeds 5MB limit." | Medium | Boundary |
| TC-MOB-014 | Change Password (Success) | 1. Enter Old/New pass. 2. Save. | Pass: ***** | User logged out or prompted to re-auth. | High | Security |
| TC-MOB-015 | Change Password (Mismatch)| 1. Enter mismatched new passwords. | Pass1 != Pass2 | Error: "Passwords do not match." | Medium | Negative |
| TC-MOB-016 | Character Limit (Bio) | 1. Enter 501 chars in 500-limit bio. | 501 chars | Input stops or error "Max limit reached." | Low | Boundary |
| TC-MOB-017 | Dark Mode UI Sync | 1. Switch system to Dark Mode. | N/A | Profile UI colors adapt correctly. | Low | Usability |
| TC-MOB-018 | Notification Sound check | 1. Trigger push. 2. Check sound. | Sound: Default | App plays the designated notification sound. | Low | Usability |
| TC-MOB-019 | Multi-device Sync | 1. Edit bio on Phone A. 2. Open Phone B. | N/A | Bio reflects changes on Phone B instantly. | Medium | Functional |
| TC-MOB-020 | Delete Account | 1. Request deletion. 2. Confirm OTP. | N/A | All data wiped; Logged out from all devices. | High | Functional |

---

## 5. Negative Test Cases
- **TC-NEG-001:** Trying to upload a .txt file as a profile avatar.
- **TC-NEG-002:** Entering a future date for 'Date of Birth' (if applicable).
- **TC-NEG-003:** Clearing app cache and checking if push notification tokens are still valid.
- **TC-NEG-004:** Rapidly clicking 'Save Profile' multiple times (API spamming).

## 6. Edge Case Testing
- **TC-EDGE-001:** Profile update during a handover between Wi-Fi and 5G.
- **TC-EDGE-002:** Receiving 50 notifications within 1 minute (Flood testing).
- **TC-EDGE-003:** App behavior when the device storage is 100% full.

## 7. Boundary Value Test Cases
- **TC-BVA-001:** Profile name exactly 1 character.
- **TC-BVA-002:** Profile name at the maximum allowed characters (e.g., 50).
- **TC-BVA-003:** Uploading an image exactly 4.99 MB (Max being 5MB).

## 8. Risk-Based Test Cases
- **TC-RISK-001:** Verify that the "Block User" functionality correctly hides notifications from blocked parties. (High Risk)
- **TC-RISK-002:** Verify that PII (Phone Number/Email) is obscured in the Profile UI by default. (Medium Risk)
- **TC-RISK-003:** Verify that push notifications do not contain sensitive data in the 'Preview' text. (High Risk)

## 9. Regression Test Cases
- **TC-REG-001:** Verify that 'Edit Profile' still works after an OS update (e.g., iOS 16 to 17).
- **TC-REG-002:** Verify that the 'Avatar' display isn't broken on iPad/Tablets.

## 10. Possible Bugs or Failure Conditions
1. **Avatar Cropping:** Image getting stretched or pixelated on high-aspect-ratio screens.
2. **Ghost Notifications:** Receiving a notification for a message that was already deleted.
3. **Time Zone Lag:** Notification showing "Sent at 5:00 PM" when it is currently 4:00 PM due to server/client mismatch.

---

## 11. Traceability Mapping (RTM)

| Requirement ID | Requirement Description | Test Case IDs | Status |
|:---|:---|:---|:---|
| REQ-MOB-01 | Information Profile | TC-MOB-001, 005, 010, 016, 019 | Passed |
| REQ-MOB-02 | Multimedia Handling | TC-MOB-002, 003, 004, 013 | Passed |
| REQ-MOB-03 | Push Infrastructure | TC-MOB-006, 007, 008, 009, 018 | Passed |
| REQ-MOB-04 | User Security | TC-MOB-014, 015, 020 | Passed |
| REQ-MOB-05 | App Resilience | TC-MOB-011, 012, 017 | Passed |
