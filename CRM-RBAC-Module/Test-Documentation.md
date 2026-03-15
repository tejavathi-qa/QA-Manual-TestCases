# CRM & RBAC Detailed Test Cases

## 📌 Matrix Overview
Testing a SaaS CRM with **Multi-tenancy** and **Hierarchical RBAC**.

---

## 📅 Detailed Test Case Table

| TC ID | Scenario | Pre-conditions | Test Steps | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-CRM-01** | Cross-Tenant Data Leak | Two separate client accounts (Tenant A, Tenant B). | 1. Log in as Tenant A Adm. 2. Capture a Lead ID. 3. Log in as Tenant B. 4. Try to access Tenant A Lead via Direct URL. | **403 Forbidden** or **404 Not Found**. No data from Tenant A visible to B. | Critical |
| **TC-CRM-02** | Role Degradation Sync | Sales Manager downgraded to Sales Exec. | 1. Manager with 10 'Team Leads' is downgraded. 2. Check 'My Leads' view. | Only leads *assigned* to the user are visible. Team leads are hidden. | High |
| **TC-CRM-03** | Custom Permission Override | Create a custom role 'Intern' with 'View Only' but grant 'Delete' on 'Leads'. | 1. Log in as Intern. 2. Attempt to Edit a Contact. 3. Attempt to Delete a Lead. | Edit should fail; Delete should succeed (Testing Permission Granularity). | Medium |
| **TC-CRM-04** | Hierarchy Inheritance | Move a Sales VP to a different Business Unit. | 1. Update User Profile branch. 2. Verify dashboard stats. | Old Branch data vanishes; New Branch data populates instantly. | High |
| **TC-CRM-05** | Audit Trail - RBAC | Admin changes a user's role. | 1. Perform Role change. 2. Go to 'System Audit Logs'. | Log entry shows: Timestamp, AdminID, OldRole, NewRole, TargetUserID. | High |
| **TC-CRM-06** | Field Level Security (FLS) | 'Salary' field hidden for 'Recruiter' role. | 1. Log in as Recruiter. 2. Open Candidate Profile. 3. Check API response for 'salary' key. | UI hides field; JSON response excludes 'salary' key (No sensitive data in payload). | Critical |
| **TC-CRM-07** | Session Conflict (RBAC) | Role change while user is logged in. | 1. User logged in as Admin. 2. System Admin changes them to 'Viewer'. 3. User clicks 'Delete'. | System should force re-auth or reject the action with 'Permissions Changed'. | Medium |

---

## 🔒 Security Focus: IDOR & Privilege Escalation
1. **Vertical Escalation:** Can a 'Viewer' access `/admin/settings` by guessing the URL?
2. **Horizontal Escalation:** Can 'User A' view the invoices of 'User B'?
3. **Ghost Roles:** If a role is deleted, do users assigned to that role lose access immediately?
