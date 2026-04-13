# SauceDemo Login Test Plan

## Application Overview

Comprehensive test plan for login functionality on SauceDemo website (https://www.saucedemo.com/). This covers authentication, validation, error handling, and user management scenarios for the e-commerce demo application.

## Test Scenarios

### 1. Login Functionality Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Login - Standard User

**File:** `tests/login-functionality/successful-standard-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
    - expect: Username and password fields are visible
    - expect: Login button is clickable
  2. Enter 'standard_user' in username field
    - expect: Username is entered correctly
    - expect: Field accepts the input
  3. Enter 'secret_sauce' in password field
    - expect: Password is entered correctly
    - expect: Password is masked/hidden
  4. Click Login button
    - expect: User is redirected to inventory page
    - expect: URL contains '/inventory.html'
    - expect: Products page loads with items displayed
    - expect: No error messages shown

#### 1.2. Failed Login - Locked Out User

**File:** `tests/login-functionality/locked-out-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Enter 'locked_out_user' in username field
    - expect: Username is entered correctly
  3. Enter 'secret_sauce' in password field
    - expect: Password is entered correctly
  4. Click Login button
    - expect: Error message 'Epic sadface: Sorry, this user has been locked out.' appears
    - expect: User remains on login page
    - expect: URL is still saucedemo.com (no redirect)
    - expect: Red border appears on input fields
  5. Click error message close button (X)
    - expect: Error message disappears
    - expect: Input fields return to normal styling
    - expect: Form is ready for new input

#### 1.3. Failed Login - Invalid Password

**File:** `tests/login-functionality/invalid-password.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Enter 'standard_user' in username field
    - expect: Username is entered correctly
  3. Enter 'wrong_password' in password field
    - expect: Invalid password is entered
  4. Click Login button
    - expect: Error message 'Epic sadface: Username and password do not match any user in this service' appears
    - expect: User remains on login page
    - expect: Red border appears on input fields
  5. Click error message close button
    - expect: Error message disappears
    - expect: Form is cleared and ready for retry

#### 1.4. Failed Login - Invalid Username

**File:** `tests/login-functionality/invalid-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Enter 'invalid_user' in username field
    - expect: Invalid username is entered
  3. Enter 'secret_sauce' in password field
    - expect: Correct password is entered
  4. Click Login button
    - expect: Error message 'Epic sadface: Username and password do not match any user in this service' appears
    - expect: User remains on login page
    - expect: Red border appears on input fields

### 2. Form Validation Tests

**Seed:** `tests/seed.spec.ts`

#### 2.1. Empty Username Validation

**File:** `tests/form-validation/empty-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Leave username field empty
    - expect: Username field is empty
  3. Enter 'secret_sauce' in password field
    - expect: Password is entered
  4. Click Login button
    - expect: Error message 'Epic sadface: Username is required' appears
    - expect: User remains on login page
    - expect: Red border appears on username field
  5. Click error message close button
    - expect: Error message disappears
    - expect: Form validation styling is reset

#### 2.2. Empty Password Validation

**File:** `tests/form-validation/empty-password.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Enter 'standard_user' in username field
    - expect: Username is entered correctly
  3. Leave password field empty
    - expect: Password field is empty
  4. Click Login button
    - expect: Error message 'Epic sadface: Password is required' appears
    - expect: User remains on login page
    - expect: Red border appears on password field
  5. Click error message close button
    - expect: Error message disappears
    - expect: Form validation styling is reset

#### 2.3. Empty Username and Password Validation

**File:** `tests/form-validation/empty-both-fields.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Leave both username and password fields empty
    - expect: Both fields are empty
  3. Click Login button
    - expect: Error message 'Epic sadface: Username is required' appears (username validation takes priority)
    - expect: User remains on login page
    - expect: Red border appears on both fields

### 3. Special User Types Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. Problem User Login

**File:** `tests/special-users/problem-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Enter 'problem_user' in username field
    - expect: Username is entered correctly
  3. Enter 'secret_sauce' in password field
    - expect: Password is entered correctly
  4. Click Login button
    - expect: User successfully logs in
    - expect: Redirected to inventory page
    - expect: Note: Problems may manifest in inventory functionality, not login

#### 3.2. Performance Glitch User Login

**File:** `tests/special-users/performance-glitch-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Enter 'performance_glitch_user' in username field
    - expect: Username is entered correctly
  3. Enter 'secret_sauce' in password field
    - expect: Password is entered correctly
  4. Click Login button
    - expect: User successfully logs in (may be slower than normal)
    - expect: Redirected to inventory page
    - expect: Login process may take longer than standard_user

#### 3.3. Visual User Login

**File:** `tests/special-users/visual-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Enter 'visual_user' in username field
    - expect: Username is entered correctly
  3. Enter 'secret_sauce' in password field
    - expect: Password is entered correctly
  4. Click Login button
    - expect: User successfully logs in
    - expect: Redirected to inventory page
    - expect: Note: Visual issues may appear in inventory page, not login

#### 3.4. Error User Login

**File:** `tests/special-users/error-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page loads successfully
  2. Enter 'error_user' in username field
    - expect: Username is entered correctly
  3. Enter 'secret_sauce' in password field
    - expect: Password is entered correctly
  4. Click Login button
    - expect: User successfully logs in
    - expect: Redirected to inventory page
    - expect: Note: Errors may occur during cart/checkout operations, not login

### 4. UI/UX Tests

**Seed:** `tests/seed.spec.ts`

#### 4.1. Login Page Layout and Elements

**File:** `tests/ui-ux/login-page-layout.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Page title is 'Swag Labs'
    - expect: Swag Labs logo/heading is visible
    - expect: Username textbox is present and has placeholder 'Username'
    - expect: Password textbox is present and has placeholder 'Password'
    - expect: Login button is visible and clickable
    - expect: Accepted usernames list is displayed
    - expect: Password information is displayed
  2. Verify form accessibility
    - expect: Username field has proper labeling
    - expect: Password field has proper labeling
    - expect: Form elements are keyboard navigable
    - expect: Tab order is logical (username → password → login button)

#### 4.2. Error Message UI Behavior

**File:** `tests/ui-ux/error-message-behavior.spec.ts`

**Steps:**
  1. Trigger any login error (e.g., empty username)
    - expect: Error message appears above the login form
    - expect: Error message has distinctive styling
    - expect: Red border appears on relevant input fields
    - expect: Close button (X) is visible on error message
  2. Click the close button on error message
    - expect: Error message disappears
    - expect: Input field styling returns to normal
    - expect: Form is ready for new input
  3. Trigger a different error after closing first error
    - expect: New error message appears correctly
    - expect: Previous error message does not interfere

#### 4.3. Password Field Security

**File:** `tests/ui-ux/password-security.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Password field is present
  2. Enter password in password field
    - expect: Password characters are masked/hidden (showing dots or asterisks)
    - expect: Password is not visible in plain text
  3. Inspect page source/developer tools
    - expect: Password field has type='password' attribute
    - expect: Password value is not exposed in DOM

### 5. Cross-Browser and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 5.1. Login Session Verification

**File:** `tests/edge-cases/session-verification.spec.ts`

**Steps:**
  1. Successfully login with standard_user
    - expect: User is redirected to inventory page
  2. Navigate back to login page (https://www.saucedemo.com/)
    - expect: User is automatically redirected to inventory page (if session management is implemented)
    - expect: OR user sees login page if no session management
  3. Refresh inventory page
    - expect: User remains logged in
    - expect: OR user is redirected to login page if session expired

#### 5.2. Input Field Limits and Sanitization

**File:** `tests/edge-cases/input-limits.spec.ts`

**Steps:**
  1. Enter extremely long username (500+ characters)
    - expect: Field handles long input gracefully
    - expect: No application crash or error
    - expect: Appropriate validation or truncation occurs
  2. Enter special characters in username field (!@#$%^&*())
    - expect: Field accepts or rejects special characters appropriately
    - expect: No security vulnerabilities exposed
  3. Enter SQL injection attempt ('OR 1=1 --)
    - expect: Input is properly sanitized
    - expect: No database errors or security breaches
  4. Enter XSS attempt (<script>alert('test')</script>)
    - expect: Script is not executed
    - expect: Input is properly escaped/sanitized
