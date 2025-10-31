# Ranker 🎯

Ranker is a web application that allows users to **create rankings** and **vote on rankings made by others**. For now, the project will focus only on the **Frontend** part, while the backend may be introduced in future versions.

---

## 📑 Index

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Getting Started](#-getting-started)
- [🧪 Running Tests](#-running-tests)
- [📌 Roadmap](#-roadmap)
  - [Version 0.1.0 — Data Management](#-version-010--data-management)
  - [Version 0.2.0 — App with UI](#-version-020--app-with-ui)
  - [Version 0.3.0 — Firestore & Validation](#-version-030--firestore--validation)
  - [Version 0.4.0 — Users](#-version-040--users)
  - [Version 0.5.0 — Redux & State Management](#-version-050--redux--state-management)
  - [Version 0.5.1 — Unit Testing](#-version-051--unit-testing)
  - [Version 0.6.0 — Core User Experience](#-version-060--core-user-experience)
  - [Version 0.6.1 — Error Handling & Accessibility](#-version-061--error-handling--accessibility)
  - [Version 0.7.0 — User Customization](#-version-070--user-customization)
  - [Version 0.7.1 — Analytics & Comparison](#-version-071--analytics--comparison)
  - [Version 0.8.0 — Mobile Optimization](#-version-080--mobile-optimization)
  - [Version 0.8.1 — Mobile Enhancements](#-version-081--mobile-enhancements)
  - [Version 0.9.0 — AI Rank Creation](#-version-090--ai-rank-creation)
  - [Version 0.9.1 — AI Enhancements](#-version-091--ai-enhancements)
  - [Version 0.10.0 — End-to-End Testing](#-version-0100--end-to-end-testing)
- [⚙️ Technical Documentation](#-technical-documentation)
  - [📌 Domain Model](#-domain-model)
    - [User](#user)
    - [Rank](#rank)
    - [Tier](#tier)
    - [Option](#option)
    - [Vote](#vote)
    - [Assignment](#assignment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Features

- Create custom rankings on any topic.
- Vote on rankings created by other users.
- Manage entities (Ranks, Tiers, Options, Votes, Assignments).
- Associate Ranks and Votes with users (future release).
- Responsive UI optimized for desktop and mobile (future release).
- Customization options for colors and voting rules (future release).
- Side-by-side vote comparison and rank statistics (future release).
- AI-powered rank creation and suggestions (future release).

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript

### Backend

- No backend for now (planned for future versions)

---

## 📂 Project Structure

- `/frontend` — React + TypeScript frontend
- `/docs` — Documentation and guides

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run by default on `http://localhost:3000`.

---

## 🧪 Running Tests

### Frontend (Jest)

```bash
cd frontend
npm test
```

---

## 📌 Roadmap

### ✅ Version 0.1.0 — Data Management
- Build a **data management interface** to visualize and manipulate core entities (Rank, Tier, Option, Vote, Assignment).
- Use in-memory storage.
- Ensure entities can be created and managed manually through the UI.

### ✅ Version 0.2.0 — App with UI
- Transition from raw data management to early app structure.
- Implement basic ranking interactions (assign Options to Tiers within Votes).
- Add optional descriptions and images to entities.

### ✅ Version 0.3.0 — Firestore & Validation
- Introduce **Firestore** as persistence.
- Refactor data flow to support queries and mutations.
- Implement **validation logic** at the services layer.

### ✅ Version 0.4.0 — Users
- Add a **login screen**.
- Associate **Ranks and Votes with users**.
- Restrict editing so only the owner can modify their entities.
- Clean UI separation between **Edit** and **View** modes.

### ✅ Version 0.5.0 — Redux & State Management

- Introduce **Redux Toolkit** for centralized state management.
- Normalize entities with **createEntityAdapter** (ranks, tiers, options, votes, assignments).
- Implement **async thunks** for API calls (`fetchRank`, `fetchAssignments`, `submitVote`).
- Add slice-level **loading**, **error**, and **success** statuses.

### ✅ Version 0.5.1 — Unit Testing

- Add **unit tests** for reducers, selectors, and key UI components.
- Mock Firestore and async thunks to ensure deterministic tests.
- Validate Redux logic with simulated API data and mock store.

### 🚧 Version 0.6.0 — Core User Experience

- Improve **VoteCard** and **AssignmentCard** visuals (entity name overlay, layout, buttons).
- Introduce a more engaging **vote button** with visual feedback.
- Display the **Voting Board** on the Assignments tab to show voting progress.
- Intruduce general visual enhancements

### 🔮 Version 0.6.1 — Error Handling & Accessibility

- Create dedicated pages for **Loading**, **Error**, and **Non-existent entities**.
- Add a global **ErrorBoundary** with user-friendly messages and retry actions.
- Show **toast notifications** for background errors or network issues.
- Apply **accessibility and visual polish improvements** across the app.

### 🔮 Version 0.7.0 — User Customization

- Implement **user customization choices**:
  - Range of colors to derive colors for all options and tiers.
  - Option to enforce only one tier per rank.

### 🔮 Version 0.7.1 — Analytics & Comparison

- Add ability to **compare two votes side by side** for the same rank.
- Provide **statistics on votes** for each rank.

### 🔮 Version 0.8.0 — Mobile Optimization

- Build a fully **responsive mobile experience**.
- Optimize layouts and components for small screens.

### 🔮 Version 0.8.1 — Mobile Enhancements

- Refine touch interactions, spacing, and scroll behavior.
- Improve **performance and caching** for mobile use.

### 🔮 Version 0.9.0 — AI Rank Creation

- Create a **Rank based on a description**.
- Automatically generate **tiers** for a Rank based on its description.

### 🔮 Version 0.9.1 — AI Enhancements

- Automatically generate **options** for a Rank based on its description.
- Add **AI-based recommendations** for tier arrangement and ranking balance.

### 🔮 Version 0.10.0 — End-to-End Testing

- Introduce **end-to-end tests** with Cypress or Playwright.
- Test full user flows (login, creating rank, voting, viewing results).

---

## ⚙️ Technical Documentation

## 📌 Domain Model

High‑level relations: **Rank** has many **Tiers**, **Options**, and **Votes**. A **Vote** includes many **Assignments**. Each **Assignment** maps one **Option** to one **Tier** within that **Vote**.

![Domain Entities](https://raw.githubusercontent.com/BrunoMNDantas/Ranker/main/docs/DomainEntities.png)

---

### User

Represents a user.

**Attributes**

- `id: string`
- `creationDate: Date`
- `lastUpdateDate: Date`
- `username: string`
- `imageUrl: string`
- `color: string`

**Relationships**

- **has many** `Rank`
- **has many** `Tier`
- **has many** `Option`
- **has many** `Vote`
- **has many** `Assignment`

**Example**: User = "Paul"

---

### Rank

Represents a ranking definition.

**Attributes**

- `id: string`
- `ownerId: string` (FK → User)
- `creationDate: Date`
- `lastUpdateDate: Date`
- `title: string`
- `description: string`
- `imageUrl: string`
- `color: string`

**Relationships**

- **belongs to** `User`
- **has many** `Tier`
- **has many** `Option`
- **has many** `Vote`

**Example**: Rank = "Best Programming Languages"

---

### Tier

Defines a level/category inside a Rank.

**Attributes**

- `id: string`
- `rankId: string` (FK → Rank)
- `ownerId: string` (FK → User)
- `creationDate: Date`
- `lastUpdateDate: Date`
- `order: number`
- `title: string`
- `description: string`
- `imageUrl: string`
- `color: string`

**Relationships**

- **belongs to** `User`
- **belongs to** `Rank`
- **used by** `Assignment` to map `Option → Tier` within a `Vote`

**Example**: Tiers = `S`, `A`, `B`, `C` (with `order` controlling vertical position)

---

### Option

An item that can be classified into a Tier.

**Attributes**

- `id: string`
- `rankId: string` (FK → Rank)
- `ownerId: string` (FK → User)
- `creationDate: Date`
- `lastUpdateDate: Date`
- `order: number`
- `title: string`
- `description: string`
- `imageUrl: string`
- `color: string`

**Relationships**

- **belongs to** `User`
- **belongs to** `Rank`
- **used by** `Assignment` to map `Option → Tier` within a `Vote`

**Example**: Options = `Java`, `Python`, `JavaScript` (with `order` supporting custom listing)

---

### Vote

A user's submission for a Rank (one completed arrangement of Options into Tiers).

**Attributes**

- `id: string`
- `rankId: string` (FK → Rank)
- `ownerId: string` (FK → User)
- `creationDate: Date`
- `lastUpdateDate: Date`

**Relationships**

- **belongs to** `User`
- **belongs to** `Rank`
- **includes many** `Assignment`

**Example**: A user’s vote for "Best Programming Languages".

---

### Assignment

Links an `Option` to a `Tier` **within a particular **``.

**Attributes**

- `id: string`
- `voteId: string` (FK → Vote)
- `tierId: string` (FK → Tier)
- `optionId: string` (FK → Option)
- `creationDate: Date`
- `lastUpdateDate: Date`
- `order: number`

**Relationships**

- **belongs to** `User`
- **belongs to** `Vote`
- **belongs to** `Tier`
- **belongs to** `Option`
- **maps** `Option → Tier` in the context of a single `Vote`

**Example**: Assignments: `(Python → S)`, `(Java → A)`, `(JavaScript → B)` where the `order` can preserve the left-to-right placement within the Tier.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

