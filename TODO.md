# TODO for Login and Signup Validation and Error Handling

- [x] Update src/app/(auth)/login/page.tsx
  - Add email format validation using react-hook-form pattern validation
  - Handle signIn errors by checking response.error and display user-friendly error message
  - Display error message in UI below the form fields

- [x] Update src/app/(auth)/signup/page.tsx
  - Add validation to ensure password matches rePassword using custom validation rule
  - Optionally add simple password strength validation (e.g., minimum length)
  - Ensure error messages are clear and user-friendly in the UI

- [ ] Testing
  - Test login with invalid email/password to verify error message display
  - Test signup with mismatched passwords and invalid data to verify validation
  - Verify no console errors or UI breakage after changes
