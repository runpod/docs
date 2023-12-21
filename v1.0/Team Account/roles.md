---
title: "📛 | Roles"
slug: "roles"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Jul 25 2023 18:35:08 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 06 2023 20:01:45 GMT+0000 (Coordinated Universal Time)"
---

1. **Basic Role:**
   - Users with the "Basic" role have limited permissions in the account. They can use the account and connect to existing pods, but they are restricted from accessing certain functionalities.
   - Permissions:
     - Can use the account.
     - Can connect to and use Pods.
     - Cannot see billing information.
     - Cannot start/stop/create Pods.

2. **Billing Role:**
   - Users with the "Billing" role are specifically responsible for managing billing-related tasks and have access only to the billing page.
   - Permissions:
     - Can view and manage billing-related information and settings.
     - Cannot access other account features or Pod management.

3. **Dev Role:**
   - Users with the "Dev" role have more privileges than "Basic" users and are suitable for developers or team members working on development tasks.
   - Permissions:
     - Inherits all permissions from the "Basic" role (can use the account and connect to Pods).
     - Can start/stop/create Pods in the account.
     - Cannot see billing information.

4. **Admin Role:**
   - Users with the "Admin" role have full control and access to all features and settings within the account. They are typically account administrators or owners.
   - Permissions:
     - Has access to all functionalities and settings in the account.
     - Can manage billing and view billing information.
     - Can start/stop/create Pods.
     - Can modify account settings and permissions.
     - Has complete control over all account resources and users.
