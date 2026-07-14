# Inline Locator Policy

## Default Rule

Reusable selectors MUST be stored in page objects or component objects.

## Inline Locator Exception

Inline locators are permitted only when ALL conditions are true:

- The locator appears in only one spec file
- The locator is used once
- The locator supports a single interaction or assertion
- No reusable business action is associated with the locator
- Extraction would introduce a page object method/property referenced only once

## Prohibited

Inline locators MUST NOT be used for:
- navigation flows
- form interactions
- reusable modals
- shared UI components
- authentication
- multi-step workflows