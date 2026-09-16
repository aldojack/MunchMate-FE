# MunchMate

MunchMate helps users discover recipes, plan meals, and derive a shopping list from that plan.

## Language

**Feature ownership**:
The feature that owns a domain concept owns its context, hooks, services, and domain types even when other features consume its state.
_Avoid_: Calling every provider global because it is mounted near the application root.

**Application-wide state**:
State that represents the application shell or cross-cutting presentation, such as the current theme.
_Avoid_: Treating domain state as application-wide solely because multiple features read it.

**Shopping list**:
A feature-owned projection of selected recipes and planner meals into ingredients to buy.
_Avoid_: Treating the shopping list as generic shared state.

**Domain type**:
A type whose meaning is defined by one feature, even when another feature consumes it.
_Avoid_: Keeping feature-owned types global only to make imports shorter.

**Shared UI component**:
A presentation component with more than one genuine consumer or a clearly feature-neutral role.
_Avoid_: Promoting a component to shared UI because it might be reusable later.

**Shared utility**:
A behavior with multiple feature consumers and no domain-specific meaning.
_Avoid_: Keeping genuinely shared behavior inside the first feature that happened to introduce it.

**Shared hook**:
A hook used as an access point by multiple application areas, even when the state it accesses is owned by one feature.
_Avoid_: Promoting every context hook to shared code merely because it uses React context.

**Shopping-list checked state**:
Temporary UI state that may reset when the live shopping-list projection is rebuilt from the meal plan.
_Avoid_: Treating current checked state as persisted shopping progress until that requirement is explicit.

**Recipe**:
The frontend domain model for a meal recipe used by recipe discovery, planning, and shopping-list derivation.
_Avoid_: Calling the application model `RecipeDTO` when no separate API mapping exists.

**Recipe ingredient**:
An ingredient belonging to a recipe and used as the source data for shopping-list items.
_Avoid_: Calling it `RecipeIngredientDTO` unless an explicit API response boundary is introduced.

**Ingredient catalogue item**:
A recipe-owned ingredient option used by the recipe form when selecting ingredients.
_Avoid_: Moving it to shared types merely because its shape is small or reusable-looking.

**Recipe source**:
Attribution metadata describing where a recipe originated.
_Avoid_: Treating recipe attribution as shared content metadata without another independently sourced content type.

## Relationships

- The **Recipe** feature provides recipe data used by the **Planner** and **Shopping list** features.
- The **Planner** feature stores selected meal IDs by day and meal type.
- The **Shopping list** feature derives ingredients from the selected **Planner** meals and their **Recipes**.
- **Theme** is application-wide presentation state consumed by the application shell and pages.
- **Planner** owns days, meal types, and planner state types; **Recipes** owns recipe and ingredient types; **Shopping list** owns its derived list item type.
- The **Recipe form** owns its current form controls; a control becomes shared UI only after another feature genuinely needs it.
- `stringToTitleCase` is shared presentation formatting because both planner and recipe components consume it; `getMealIds` and `combineIngredients` remain feature-owned helpers.
- Context implementations follow domain ownership; only context access hooks used across features remain in the shared `src/hooks` folder.
- `useShoppingContext` is currently shopping-list-local because its consumers are both inside the shopping-list feature; `useMealPlannerContext`, `useRecipeContext`, and `useThemeContext` are shared access hooks based on their current consumers.
- The shopping list is currently a live projection of the meal plan; persistence of checked items is a future requirement that should be designed separately.
- The frontend uses `Recipe` and `RecipeIngredient` as domain names; API-specific response names are reserved for a future mapping layer if needed.
- `Ingredient` is currently the recipe-owned ingredient catalogue type used by the recipe API and recipe form.
- `Source` is currently recipe-owned because recipes are the only sourced content type.
- `DAYS`, `MEAL_TYPES`, and `defaultPlanner` are planner-owned unless another feature independently needs those concepts.

## Example dialogue

> **Dev:** "The shopping list reads planner and recipe state. Should its context live globally?"
> **Domain expert:** "No. It belongs to the shopping-list feature because it owns the shopping-list rules; the dependencies describe where its input comes from, not who owns it."

## Flagged ambiguities

- Provider placement and domain ownership are currently mixed: `ShoppingListProvider` is composed in the application layout but owns shopping-list behavior. The intended rule is domain ownership, with provider composition handled separately.
