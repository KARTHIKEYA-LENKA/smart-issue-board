# Smart Issue Board

## Overview
Smart Issue Board is a simple issue tracking application built to simulate real-world issue management workflows. The application allows users to authenticate, create issues, detect similar issues, track issue status, and manage issue lifecycle efficiently.

This project was developed as part of an internship assignment to demonstrate practical problem-solving, backend data modeling, and workflow design.

---

## Tech Stack Used
- **Frontend:** React (Functional Components, Hooks)
- **Backend & Database:** Firebase Firestore
- **Authentication:** Firebase Email/Password Authentication
- **Hosting:** Vercel
- **Code Hosting:** GitHub

---

## Authentication Flow
Users can sign up and log in using email and password. Firebase Authentication securely manages user sessions. The logged-in user's email is displayed and used to associate issues with their creator.

---

## Firestore Data Structure
A single collection named `issues` is used.

Each issue document contains:
- `title` – Issue summary
- `description` – Detailed explanation
- `priority` – Low / Medium / High
- `status` – Open / In Progress / Done
- `assignedTo` – Assigned user or team
- `createdBy` – Logged-in user email
- `createdAt` – Server timestamp

---

## Similar Issue Detection
To detect similar issues, the application uses a keyword-based comparison approach:
- Issue titles are broken into meaningful keywords.
- Existing issue titles are compared using overlapping keywords.
- If two or more keywords match, the issue is considered similar.
- The user is warned and allowed to either continue or cancel.

This approach is simple, explainable, and avoids over-engineering while still providing intelligent behavior.

---

## Issue Lifecycle Rule
A business rule is enforced where an issue cannot move directly from **Open** to **Done**.
The allowed workflow is:
Open → In Progress → Done

A friendly message is shown if a user attempts to skip the workflow.

---

## Challenges Faced
- Understanding Firestore querying and updates
- Designing similarity detection without external AI APIs
- Enforcing workflow rules in a user-friendly way

---

## Future Improvements
- Role-based access (Admin / User)
- Advanced similarity detection using NLP
- Pagination for large issue lists
- Better UI and UX enhancements

---

## Conclusion
This project focuses on clarity, correctness, and real-world reasoning rather than over-engineering. The design decisions prioritize maintainability, usability, and practical problem-solving.
