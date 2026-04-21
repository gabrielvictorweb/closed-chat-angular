# CLAUDE.md

## Project Overview

**Closed Chat** — Privacy-first anonymous chat application with real-time WebSocket communication. Messages are never stored in a database; they exist only in browser memory and are destroyed on disconnect.

**Stack:** Angular 21, Angular Material 21 (Material 3), Tailwind CSS 4, RxJS 7.8, Vitest 4, SSR with Express 5, Faker.js for dev-mode mocks.

## Commands

```bash
npm start        # Start dev server (ng serve) → http://localhost:4200
npm test         # Run unit tests (Vitest)
npm run build    # Production build → dist/
```

## Architecture

Clean Architecture with clear layer separation:

```
Component → Facade → Usecase → Gateway (interface) → Repository (implementation)
                 ↘ State ↗
```

### Directory Structure

```
src/
├── app/
│   ├── components/     # Presentational (dumb) components
│   ├── pages/          # Route-level page components
│   ├── facades/        # Orchestrate state + usecases → reactive streams for components
│   ├── usecases/       # Single-responsibility business logic (execute() method)
│   ├── gateways/       # Abstract interfaces (ports) for Dependency Inversion
│   ├── states/         # BehaviorSubject-based reactive state
│   └── tokens/         # InjectionToken definitions typed to gateway interfaces
├── domain/
│   └── entity/         # Domain entities (plain TS classes, no decorators)
└── infra/
    └── repositories/   # Concrete gateway implementations (adapters)
```

### Layer Contracts

- **Gateways** are TypeScript interfaces (ports). Never import repositories directly in app code.
- **Tokens** (`CHATS_GATEWAY`, `MESSAGES_GATEWAY`) bind interfaces to implementations in `app.config.ts`.
- **Usecases** inject gateways via `@Inject(TOKEN)` in constructors. Each has an `execute()` method returning `Observable<T>`.
- **Facades** combine `State` + `Usecase` via `inject()`, exposing pre-composed observables for components.
- **Repositories** implement gateway interfaces. Use `isDevMode()` to switch between Faker.js mock data and real HTTP/WebSocket calls.

## Code Conventions

### File & Naming

- **Single `.ts` files** — no `.component.ts`, `.service.ts` suffixes. One file per unit.
- **Kebab-case** filenames: `chat-content.ts`, `list-messages.ts`.
- **Test files** co-located with source: `list-chats.spec.ts` next to `list-chats.ts`.

| Artifact     | Convention                      | Example                                    |
| ------------ | ------------------------------- | ------------------------------------------ |
| Components   | PascalCase, kebab-case selector | `ChatContent` → `selector: 'chat-content'` |
| Pages        | Suffixed with `Page`            | `HomePage`, `ChatPage`                     |
| Usecases     | Verb-noun PascalCase            | `ListChats`, `ListMessages`                |
| Facades      | Suffixed with `Facade`          | `ListMessagesFacade`                       |
| Gateways     | Suffixed with `Gateway`         | `ChatGateway`, `MessageGateway`            |
| Repositories | Suffixed with `Repository`      | `ChatRepository`, `MessageRepository`      |
| Entities     | PascalCase, no suffix           | `Chat`, `Message`, `ChatUser`              |
| DI Tokens    | SCREAMING_SNAKE_CASE            | `CHATS_GATEWAY`, `MESSAGES_GATEWAY`        |

### Component Patterns

- **Standalone components** — always `standalone: true`.
- **Inline templates** via `template:` (not `templateUrl:`). Exception: root `App` uses `templateUrl`.
- **`ChangeDetectionStrategy.OnPush`** as default.
- **Signal-based inputs**: `input()`, `input.required()`.
- **Signal-based outputs**: `output()`.
- **Angular control flow**: `@for`, `@if`, `@empty` blocks (not `*ngFor`/`*ngIf`).
- **Self-closing tags**: `<router-outlet />`, `<chat-nav />`.
- **Async pipe** (`| async`) for observable subscriptions in templates.

### Dependency Injection

- **`inject()` function** (preferred) for components, facades, and services.
- **Constructor `@Inject(TOKEN)`** for usecases injecting gateway tokens.
- **All services** use `providedIn: 'root'` for tree-shaking.

### State Management

BehaviorSubject-based reactive state in `states/` folder:

- Expose observables with `$` suffix: `selectedChat$`.
- Mutate via named methods: `selectChat(id)`.

### Styling

- **Tailwind CSS 4** — imported via `@import 'tailwindcss'` in `styles.css`.
- **Angular Material 3** (M3) — themed via `mat.theme()` in `material-theme.scss` with azure/blue palettes.
- Custom theme variable: `--color-dark-bg`.

### Code Style (Prettier)

- Print width: 100
- Single quotes
- Angular HTML parser for `.html` files

## Testing

- **Vitest** as test runner (not Karma/Jasmine).
- `describe`/`it` blocks with `TestBed` from `@angular/core/testing`.
- Global Vitest types enabled (`vitest/globals`).
- Spec files use `.spec.ts` suffix, co-located with source.

## SSR

- Server-side rendering with `@angular/ssr` + Express 5.
- All routes prerendered: `renderMode: RenderMode.Prerender`.
- Client hydration with event replay: `provideClientHydration(withEventReplay())`.

## Routing

Eagerly loaded routes (no lazy loading):

```typescript
{ path: '', component: HomePage }
{ path: 'chat', component: ChatPage }
```

## Dev Mode

Repositories auto-detect `isDevMode()` and generate mock data with Faker.js — no backend required during development.
