```
MunchMate-FE/
├── .git/
├── .github/
├── .gitignore
├── .husky/
├── .vscode/
├── docs/
│   ├── STANDARDS.md
│   ├── CONTEXT.md
│   ├── ARCHITECTURE-DECISIONS.md
│   └── adr/  (future ADRs)
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── Layout.tsx
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   └── providers/
│   │       └── ThemeContext.tsx
│   │
│   ├── components/
│   │   └── ui/
│   │       └── Button/
│   │           ├── Button.tsx
│   │           └── Button.test.tsx  (future)
│   │
│   ├── config/
│   │   └── api.ts
│   │
│   ├── features/
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── HowItWorks.tsx
│   │   │   │   └── ShoppingListInfo.tsx
│   │   │   └── pages/
│   │   │       └── Home.tsx
│   │   │
│   │   ├── planner/
│   │   │   ├── components/  (existing)
│   │   │   ├── context/
│   │   │   │   └── MealPlannerContext.tsx
│   │   │   ├── pages/
│   │   │   │   └── Planner.tsx
│   │   │   ├── constants.ts  (DAYS, MEAL_TYPES, defaultPlanner)
│   │   │   ├── types.ts  (Planner, DayPlanner, DaysType, MealType)
│   │   │   └── utils/
│   │   │       └── getMealIds.ts
│   │   │
│   │   ├── recipes/
│   │   │   ├── api/
│   │   │   │   ├── recipes.ts  (getAllRecipes, getRecipeById)
│   │   │   │   └── ingredients.ts  (getAllIngredients)
│   │   │   ├── components/
│   │   │   │   ├── AddRecipeForm/
│   │   │   │   │   ├── AddRecipeForm.tsx
│   │   │   │   │   ├── IngredientsSection.tsx
│   │   │   │   │   ├── InstructionsSection.tsx
│   │   │   │   │   ├── RecipeDetailsSection.tsx
│   │   │   │   │   ├── SourceSection.tsx
│   │   │   │   │   └── StepTabs.tsx
│   │   │   │   ├── PlannerModal.tsx
│   │   │   │   ├── RecipeCard.tsx
│   │   │   │   └── RecipeContainer.tsx
│   │   │   ├── context/
│   │   │   │   └── RecipeContext.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useRecipe.ts
│   │   │   ├── pages/
│   │   │   │   ├── FilterRecipes.tsx
│   │   │   │   └── Recipe.tsx
│   │   │   └── types.ts
│   │   │       (Ingredient, Recipe, RecipeIngredient,
│   │   │        Source, MeasurementUnit, ShoppingListItem)
│   │   │
│   │   └── shopping-list/
│   │       ├── components/
│   │       │   ├── ShoppingListDrawer.tsx
│   │       │   └── ShoppingListFab.tsx
│   │       ├── context/
│   │       │   └── ShoppingListContext.tsx
│   │       ├── hooks/
│   │       │   └── useShoppingContext.ts
│   │       ├── types.ts
│   │       │   (ShoppingListItem)
│   │       └── utils/
│   │           ├── combineIngredients.ts
│   │           └── buildShoppingList.ts  (future extraction)
│   │
│   ├── hooks/
│   │   ├── useMealPlannerContext.ts
│   │   ├── useRecipeContext.ts
│   │   └── useThemeContext.ts
│   │
│   ├── utils/
│   │   ├── localStorageUtil.ts
│   │   └── stringUtils.ts
│   │
│   ├── index.css
│   ├── vite-env.d.ts
│   └── planner.json  (test/seed data — review placement)
│
├── Dockerfile
├── eslint.config.js
├── index.html
├── knip.json
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Deleted Directories

- `src/types/` — all types moved to owning features
- `src/constants/` — all constants moved to owning features
- `src/context/` — moved to app or feature context folders
- `src/components/shared/` — restructured:
  - `Button/` → `components/ui/Button/`
  - `Header/` → `app/Header/`
  - `Layout.tsx` → `app/Layout.tsx`
  - `Form/*` → stay with `features/recipes/components/AddRecipeForm/`

## Key Structure Notes

1. **App Shell** (`app/`):
   - Application entry point and routing
   - Global provider setup
   - Application layout and header

2. **Features** (`features/`):
   - Each feature folder is self-contained
   - Internal `api/`, `components/`, `context/`, `hooks/`, `pages/`, `types/`, `utils/`, `constants.ts`
   - No cross-feature imports except through shared hooks and types

3. **Shared Code** (`components/`, `hooks/`, `utils/`, `config/`):
   - `components/ui/` — reusable UI primitives like Button
   - `hooks/` — shared context access hooks used across features
   - `utils/` — domain-neutral utilities (localStorage, string formatting)
   - `config/` — application configuration (API base URL)

4. **Feature Dependencies**:
   - `planner/` owns planner state and vocabulary
   - `recipes/` owns recipe data and form
   - `shopping-list/` derives data from both and owns checked-state logic
   - `home/` is informational, no complex state

## Testing Structure (Future)

```
Each feature/component will have `.test.ts` or `.test.tsx` files colocated:

features/recipes/components/RecipeCard.tsx
features/recipes/components/RecipeCard.test.tsx

features/planner/utils/getMealIds.ts
features/planner/utils/getMealIds.test.ts

src/utils/stringUtils.ts
src/utils/stringUtils.test.ts
```

## Refactor Sequence

1. **Group 1**: App shell (Header, Layout, App.tsx, main.tsx, ThemeContext)
2. **Group 2**: Context implementations and hooks (MealPlannerContext, RecipeContext, ShoppingListContext)
3. **Group 3**: Types and type-dependent utilities (move Recipe types, Planner types, etc.)
4. **Group 4**: Constants and constant-dependent utilities (DAYS, MEAL_TYPES, getMealIds)
5. **Group 5**: Feature utilities (combineIngredients, buildShoppingList)
6. **Group 6**: API modules (recipeServices → recipes.ts, ingredientServices → ingredients.ts)
7. **Cleanup**: Remove `src/types/`, `src/constants/`, `src/components/shared/`, update all imports

---

Ready to start? We can proceed with Group 1, validating each step.
