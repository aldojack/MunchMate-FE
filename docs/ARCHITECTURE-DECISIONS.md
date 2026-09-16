# Architecture Decisions — MunchMate-FE

## Grilling Session Summary

This document captures 23 architectural decisions made during the grilling session on 2026-08-19 to 2026-08-20, refining the folder structure, ownership boundaries, and naming conventions.

## Ownership & Boundaries

### 1. Domain Ownership

**Decision:** Features own their domain types, hooks, and context implementations, even when other features consume the state.

**Principle:** "Feature ownership" describes which feature's rules would change if the concept changed, not which feature happens to import it.

---

### 2. Context Placement

**Decision:** `ThemeContext` is application-wide and owned by `app/`. `RecipeContext`, `MealPlannerContext`, and `ShoppingListContext` are feature-owned and placed within their respective features.

**Provider composition** remains coordinated at the app boundary even though each provider is feature-owned.

---

### 3. Hook Placement

**Decision:** Hooks remain in shared `src/hooks/` if they are used across multiple features:

- `useMealPlannerContext` → shared
- `useRecipeContext` → shared
- `useThemeContext` → shared
- `useShoppingContext` → feature-local (shopping-list only)

**Principle:** Usage-based classification, not implementation type. Context hooks are shared only when multiple features consume them.

---

### 4. Feature Dependencies

**Decision:** The shopping-list feature may depend on planner and recipe shared context hooks for now.

**Future refactor:** Revisit Bulletproof React's stricter feature-boundary approach by composing these dependencies at the app layer and passing explicit data into `ShoppingListProvider`.

---

### 5. Shopping List Projection

**Decision:** The shopping list is a live projection of the meal plan. Checked items represent temporary UI state and may reset when the meal plan changes.

**Future requirement:** Persistence of checked items is a separate design decision, not part of the initial architecture.

---

## Types & Constants

### 6. Domain Type Naming

**Decision:** Remove the `DTO` suffix from domain types:

- `RecipeDTO` → `Recipe`
- `RecipeIngredientDTO` → `RecipeIngredient`

**Principle:** "DTO" is meaningful only when an explicit API response mapping exists. Currently the frontend uses these as domain models directly.

**API naming:** Reserve `Response` or `DTO` terminology for a future mapping layer if the backend and frontend models diverge.

---

### 7. Type Ownership Classification

#### Recipe-owned:

- `Ingredient` (catalogue item used in recipe form)
- `Recipe` (frontend recipe model)
- `RecipeIngredient` (ingredient within a recipe)
- `Source` (recipe attribution)
- `MeasurementUnit` (ingredient unit system)

#### Planner-owned:

- `Planner`
- `DayPlanner`
- `DaysType`
- `MealType`

#### Shopping-list-owned:

- `ShoppingListItem`

---

### 8. Global Types Directory

**Decision:** Remove `src/types/` once all types have been moved to their owning features.

**Principle:** "Shared only when genuinely shared" — do not keep a global types directory as a dumping ground.

---

### 9. Ingredient Type Reuse

**Decision:** Shopping-list items extend `RecipeIngredient` to add `isChecked`:

```tsx
type ShoppingListItem = { isChecked: boolean } & RecipeIngredient;
```

**Principle:** Cross-feature type consumption is allowed; types belong with the feature that defines their meaning.

---

### 10. Planner Constants Ownership

**Decision:** Move `DAYS`, `MEAL_TYPES`, and `defaultPlanner` to `features/planner/constants.ts`.

**Condition:** Only if these constants are not independently needed by other features.

**Global constants:** `src/constants/` should be removed unless genuinely application-wide constants emerge.

---

## Components & Styling

### 11. Shared UI Components

**Decision:**

- `Button` → `components/ui/Button/` (genuinely reusable)
- `Header` and `Layout` → `app/` (application shell)
- `FormInput`, `FormButton`, `FormSelect` → stay with recipe form for now

**Promotion rule:** A component becomes shared UI only after a second genuine consumer needs it, not because it could theoretically be reused.

---

### 12. Recipe Form Components

**Decision:** Keep form controls inside the recipe feature until another feature demonstrates a need.

**Future:** Move individual controls to `components/ui/` only when a second consumer requires them.

---

## Naming Conventions

### 13. Feature Directories

**Decision:** Use kebab-case for feature directory names:

- `features/shopping-list/` ✓
- `features/recipes/` ✓
- `features/planner/` ✓

**Component names:** React component files and folders retain PascalCase: `ShoppingListDrawer`, `RecipeCard`.

---

### 14. API vs. Services

**Decision:** Rename HTTP request modules to indicate their purpose:

- `services/recipeServices.ts` → `api/recipes.ts`
- `services/ingredientServices.ts` → `api/ingredients.ts`

**Principle:** These files are API clients, not domain services. No separate "service" layer is created until domain orchestration requires one.

---

## Utilities & Infrastructure

### 15. Shared Utilities Classification

#### Global (`src/utils/`):

- `localStorageUtil.ts` (generic infrastructure)
- `stringUtils.ts` (domain-neutral formatting: `stringToTitleCase`)

#### Feature-local:

- `features/planner/utils/getMealIds.ts` (planner domain)
- `features/shopping-list/utils/combineIngredients.ts` (shopping-list domain)

**Principle:** Domain utilities live with their feature; only domain-neutral infrastructure remains global.

---

### 16. Global Utilities Retention

**Decision:** Keep `src/utils/` for genuinely shared, domain-neutral code.

**Deprecation:** Do not create a `lib` directory unless reusable infrastructure grows beyond the current scope.

---

### 17. Global Configuration

**Decision:** Keep `src/config/api.ts` global for environment-based API URL selection.

**Feature-specific:** HTTP request modules live in `features/recipes/api/`.

---

## Testing & Future Work

### 18. Testing Boundary

**Decision:** Begin Vitest implementation with pure logic:

1. Test utility functions (`stringToTitleCase`, `combineIngredients`, `getMealIds`).
2. Extract and test shopping-list derivation separately.
3. Add provider and component tests afterward.

**Principle:** Fast, deterministic tests first; React integration tests second.

---

### 19. Shopping List Extraction

**Decision:** Extract `getShoppingList` into a pure function for independent testing (marked with TODO).

**Benefit:** Separates shopping-list derivation logic from React provider orchestration.

---

### 20. Shopping List Context Refactor (Future)

**Decision:** Use planner state from `useMealPlannerContext` instead of reading `localStorage` directly (marked with TODO).

**Benefit:** Single source of truth for planner state.

---

### 21. Feature Boundary Refactor (Future)

**Decision:** Revisit composing shopping-list dependencies at the app layer and passing explicit data into the provider (marked with TODO).

**Reference:** Bulletproof React's stricter feature-boundary approach.

---

## Refactor Strategy

### 22. Incremental Refactor Workflow

**Decision:** Move ownership groups one at a time, running build and lint validation after each group.

**Ownership groups:**

1. App shell (Header, Layout → `app/`)
2. Contexts and hooks (by ownership)
3. Types and constants (by ownership)
4. Utilities (split domain-specific)
5. Shared UI components

**Benefit:** Path errors and import issues surface early and are easy to isolate.

---

### 23. Import Path Updates

**Decision:** Update import paths and `@` aliases after moving files, coordinated per ownership group.

**Testing:** `npm run build && npm run lint` after each group.

---

## Summary Table

| Item                    | Current                         | Target                                               | Notes                          |
| ----------------------- | ------------------------------- | ---------------------------------------------------- | ------------------------------ |
| `Header`                | `components/shared/`            | `app/`                                               | App shell                      |
| `Layout`                | `components/shared/`            | `app/`                                               | App shell                      |
| `Button`                | `components/shared/Button/`     | `components/ui/Button/`                              | Genuinely shared               |
| `Form*`                 | `components/shared/Form/`       | `features/recipes/components/AddRecipeForm/`         | Recipe-specific for now        |
| `ThemeContext`          | `context/`                      | `app/providers/`                                     | App-wide                       |
| `MealPlannerContext`    | `context/`                      | `features/planner/context/`                          | Planner-owned                  |
| `RecipeContext`         | `features/recipes/context/`     | (stays)                                              | Already placed correctly       |
| `ShoppingListContext`   | `context/`                      | `features/shopping-list/context/`                    | Shopping-list-owned            |
| `useMealPlannerContext` | `hooks/`                        | (stays)                                              | Shared access hook             |
| `useRecipeContext`      | `hooks/`                        | (stays)                                              | Shared access hook             |
| `useThemeContext`       | `hooks/`                        | (stays)                                              | Shared access hook             |
| `useShoppingContext`    | `hooks/`                        | `features/shopping-list/hooks/`                      | Local to shopping-list         |
| Recipe types            | `types/`                        | `features/recipes/types.ts`                          | Recipe-owned                   |
| Planner types           | `types/`                        | `features/planner/types.ts`                          | Planner-owned                  |
| `ShoppingListItem`      | `types/`                        | `features/shopping-list/types.ts`                    | Shopping-list-owned            |
| `DAYS`, `MEAL_TYPES`    | `constants/constants.ts`        | `features/planner/constants.ts`                      | Planner vocabulary             |
| `defaultPlanner`        | `features/planner/constants.ts` | (stays)                                              | Already placed                 |
| `recipeServices.ts`     | `features/recipes/services/`    | `features/recipes/api/recipes.ts`                    | API request module             |
| `ingredientServices.ts` | `features/recipes/services/`    | `features/recipes/api/ingredients.ts`                | API request module             |
| `getMealIds`            | `utils/helperFunction.ts`       | `features/planner/utils/getMealIds.ts`               | Planner domain logic           |
| `combineIngredients`    | `utils/helperFunction.ts`       | `features/shopping-list/utils/combineIngredients.ts` | Shopping-list logic            |
| `stringToTitleCase`     | `utils/helperFunction.ts`       | `src/utils/stringUtils.ts`                           | Shared formatting              |
| `localStorageUtil`      | `utils/`                        | (stays)                                              | Shared infrastructure          |
| `src/config/api.ts`     | (current)                       | (stays)                                              | Global API config              |
| `src/types/`            | (current)                       | (remove)                                             | Move all types to features     |
| `src/constants/`        | (current)                       | (remove)                                             | Move all constants to features |

---

## TODOs in Code

The following TODOs have been placed in the codebase to guide future work:

1. **ShoppingListContext.tsx**: Revisit Bulletproof React's stricter feature-boundary approach.
2. **ShoppingListContext.tsx**: Extract shopping-list derivation into a pure function.
3. **ShoppingListContext.tsx**: Use planner state from context instead of `localStorage`.
4. **ShoppingListContext.tsx**: Add unit tests for derivation, provider actions, and regeneration.

---

## Next Steps

1. Create target folder structure.
2. Move ownership groups incrementally.
3. Update imports per group.
4. Validate build and lint after each group.
5. Implement Vitest configuration and initial tests.
6. Add GitHub Actions CI for lint and unit tests.
