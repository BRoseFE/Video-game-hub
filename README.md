# Video Game Discovery - React

A responsive React application for discovering and browsing video games using the RAWG Video Games Database API.
This project focuses on reusable component architecture, typed API data, custom React hooks, responsive UI design, and secure API integration using Vercel serverless functions.

---

## 🌐 Live Website

[VideoGameHub](https://video-game-discovery-app-wine.vercel.app/)

---

## ✨ Features

- Search for games using the RAWG API
- Filter games by genre
- Filter games by gaming platform
- Sort games by relevance, date added, name, release date, popularity, and average rating
- Display Metacritic scores
- Display supported platform icons
- Visual rating indicators based on game ratings
- Responsive game grid across desktop, tablet, and mobile layouts
- Light and dark colour modes
- Loading skeletons while API requests are processed
- API error handling
- Responsive navigation and search interface
- Cropped API images with local placeholder fallback
- Protected RAWG API key using Vercel environment variables and serverless functions

---

## 🔌 API & Data Flow

The application retrieves game and platform data from the **RAWG Video Games Database API** through a small Vercel serverless API layer.

| Endpoint         | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| `/api/games`     | Retrieves games and applies search, genre, platform, and sorting parameters |
| `/api/platforms` | Retrieves the parent platform list used by the platform selector            |

The frontend communicates only with the application's `/api` endpoints.

```text
React Application
        │
        ▼
     Axios
        │
        ├── /api/games
        │
        └── /api/platforms
                │
                ▼
       Vercel Serverless Functions
                │
                ▼
            RAWG API
```

The RAWG API key is stored as a Vercel environment variable and accessed server-side using `process.env.RAWG_API_KEY`.

This prevents the API key from being included in the client-side React bundle or committed to the repository.

---

## 🧠 Design & Engineering Decisions

- **Custom data-fetching hook**
  API requests are centralized through a generic `useData<T>` hook. This manages loading state, errors, response data, and request cancellation while allowing different API resources to remain type-safe.

- **Specialized API hooks**
  Hooks such as `useGames` and `usePlatforms` build on top of the data-fetching layer, keeping API logic separate from presentation components.

- **Infinite scrolling with React Query**
  React Query's `useInfiniteQuery` manages paginated game requests, allowing additional games to load as the user scrolls instead of fetching the entire catalogue upfront. The hook tracks available pages and exposes pagination state and methods for retrieving subsequent results.

- **Automatic pagination**
  Pagination is driven by the API's response metadata. The `getNextPageParam` configuration determines the next page to request and identifies when no additional results are available. An `IntersectionObserver` triggers `fetchNextPage` when the user reaches the bottom of the game grid, providing a seamless browsing experience without traditional pagination controls.

- **Server-state caching**
  React Query caches API responses and manages their freshness and lifecycle. Cached results can be reused when revisiting previously requested data, reducing unnecessary network requests. Cache behaviour is controlled through query options such as `staleTime` and `gcTime`.

- **Global client state with Zustand**
  Zustand manages shared game query preferences through a centralized `GameQuery` interface. This includes search text, selected genre, selected platform, and sorting preferences. Components can access and update these values through a shared store without requiring prop drilling or additional context providers.

- **Separation of server state and client state**
  React Query manages server state, including fetched game data, pagination, loading states, and request errors. Zustand manages client-side UI preferences and filter selections. Keeping these responsibilities separate avoids duplicating API response data in the global store.

- **Query-based cache management**
  React Query query keys incorporate the active search text, genre, platform, and sorting preferences. When Zustand updates these values, the query key changes and React Query retrieves the corresponding results. Each filter combination maintains its own cache, preventing results from different searches or filters from being mixed together.

- **Pagination reset on filter changes**
  Changing the search text, genre, platform, or sorting preference initiates a new query. Infinite scrolling starts from the first page of the updated result set, ensuring that previously loaded pages from another filter combination are not displayed alongside the new results.

- **Request deduplication and pagination safeguards**
  React Query tracks in-flight requests and helps prevent redundant requests for the same query. Pagination triggers check whether another page is available and whether a page request is already in progress, reducing duplicate fetches during rapid scrolling.

- **Pagination-aware loading and error states**
  Initial loading and subsequent page loading are handled separately. Skeleton components provide feedback while the first batch of games loads, while additional pages can display a smaller loading indicator without removing existing game cards. Errors can be handled independently for initial requests and subsequent page requests.

- **Serverless API layer**
  Vercel serverless functions act as a lightweight backend between the React application and RAWG. This keeps the API credential server-side while allowing the frontend to remain a static React application.

- **Component reuse**
  UI responsibilities are divided across focused components such as game cards, platform selectors, genre lists, search inputs, sorting controls, loading skeletons, and platform indicators.

- **Responsive layout**
  Chakra UI responsive properties are used to adapt the application layout and game grid to different viewport sizes without maintaining separate desktop and mobile implementations.

- **Image processing**
  RAWG image URLs are transformed through a shared utility to request appropriately cropped images. A local placeholder is used when an image is unavailable.

- **Request cancellation**
  `AbortController` supports cancellation of in-flight requests when the associated operation is no longer needed. Request cancellation is coordinated with the data-fetching approach to avoid unnecessary network activity and stale results.

- **TypeScript data models**
  API responses, game query parameters, and component data are represented using TypeScript interfaces and generic types, providing type safety as data moves through the application.

---

## 🧱 Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **TanStack React Query** — Server-state management, caching, pagination, and infinite scrolling
- **Zustand** — Global client-side state management
- **Chakra UI**
- **Axios**
- **React Icons**
- **next-themes**
- **Vercel Serverless Functions**
- **RAWG Video Games Database API**
- **ESLint**

Chakra UI is used for the application's responsive component system and layout primitives. React Query manages server state, caching, and paginated data fetching, while Zustand maintains shared client-side query preferences. API communication is implemented using Axios and dedicated hooks, with Vercel serverless functions handling requests to RAWG. The project leverages TypeScript throughout to ensure type safety and maintainability across components, hooks, and API interactions.

---

## 📁 Project Structure

```text
api
├── games.ts              # Vercel function for RAWG game requests
└── platforms.ts          # Vercel function for RAWG platform requests

src
├── assets/
│   ├── emojis/           # Rating indicator images
│   ├── logo.webp
│   └── no-image-placeholder.webp
│
├── components/
│   ├── Emoji.tsx
│   ├── GameCard.tsx
│   ├── GameCardContainer.tsx
│   ├── GameCardSkeleton.tsx
│   ├── GameGrid.tsx
│   ├── GameHeading.tsx
│   ├── GenreList.tsx
│   ├── GenreListSkeleton.tsx
│   ├── MetaCritic.tsx
│   ├── NavBar.tsx
│   ├── PlatformIconList.tsx
│   ├── PlatformSelector.tsx
│   ├── SearchInput.tsx
│   ├── SortSelector.tsx
│   │
│   ├── services/
│   │   ├── api-client.ts
│   │   └── image-url.ts
│   │
│   └── ui/
│       ├── color-mode.tsx
│       ├── provider.tsx
│       ├── toaster.tsx
│       └── tooltip.tsx
│
├── data/
│   └── genres.ts         # Centralized genre data
│
├── hooks/
│   ├── useData.ts        # Generic API data hook
│   ├── useGames.ts       # Game API hook
│   ├── useGenres.ts      # Genre data hook
│   └── usePlatforms.ts   # Platform API hook
│
├── App.tsx
├── index.css
├── main.tsx
└── store.ts
```

Components are separated by responsibility, while API communication and data-fetching logic are kept within dedicated services and hooks. The `/api` directory contains the serverless functions responsible for communicating with RAWG.

---

## 🚧 Project Status

This project represents a complete, deployed video game discovery application.

Potential future enhancements could include:

- Dedicated game detail pages
- Game screenshots and trailers
- Pagination or infinite scrolling
- Favourite games or a personal game library
- Additional filtering options
- Improved accessibility
- Automated unit and integration testing
- Persistent user preferences
- Expanded game metadata and details

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Environment Variables

The application requires a RAWG API key for the Vercel serverless functions.

Create a local environment file containing:

```env
RAWG_API_KEY=your_api_key_here
```

For production deployments, configure `RAWG_API_KEY` through the Vercel project environment variables.

**Do not commit API keys or other credentials to the repository.**

### Development

```bash
npm run dev
```

For local development of the Vercel serverless functions, use the Vercel development environment so the `/api` routes and environment variables are available.

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```
