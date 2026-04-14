# Procash Login Feature Test Plan

## Application Overview

Test plan for the Login feature of the Promo Cashback 2.0.0 application at http://172.24.169.172/loyalty/auth-login. The login page contains a Personal Number (spinbutton) input, a Password input, a CAPTCHA section (consisting of a refresh button, an Enter Captcha text input, and a CAPTCHA image), and a Sign In button. Valid credentials are Personal Number: 90145697 and Password: 90145697. CAPTCHA is bypassed/injected with the value "test aja" for test purposes.

## Test Scenarios

### 1. Login Feature

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-01: Successful Login with Valid Credentials and Injected Captcha

**File:** `tests/procash/tc01-valid-login.spec.ts`

**Steps:**
  1. Navigate to http://172.24.169.172/loyalty/auth-login
    - expect: The login page is displayed with the 'Sign In' heading, Personal Number input, Password input, CAPTCHA section, and Sign In button visible
  2. Click on the Personal Number spinbutton field (ref=e19) and type '90145697'
    - expect: The value '90145697' appears in the Personal Number field
  3. Click on the Password textbox (ref=e21) and type '90145697'
    - expect: The password is entered and displayed as masked characters
  4. Click on the 'Enter Captcha' textbox (ref=e28) and type 'test aja' to inject the captcha value
    - expect: The value 'test aja' appears in the captcha input field
  5. Click the 'Sign In' button (ref=e31)
    - expect: The application processes the login request
    - expect: The user is redirected away from the login page to the authenticated/dashboard area
    - expect: No error messages are displayed

#### 1.2. TC-02: Login Fails with Invalid Credentials

**File:** `tests/procash/tc02-invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to http://172.24.169.172/loyalty/auth-login
    - expect: The login page is displayed with all form elements: Personal Number, Password, CAPTCHA, and Sign In button
  2. Click on the Personal Number spinbutton field and type '00000000' (an invalid personal number)
    - expect: The value '00000000' appears in the Personal Number field
  3. Click on the Password textbox and type 'wrongpassword123' (an invalid password)
    - expect: The password is entered and displayed as masked characters
  4. Click on the 'Enter Captcha' textbox and type 'test aja' to inject the captcha value
    - expect: The value 'test aja' appears in the captcha input field
  5. Click the 'Sign In' button
    - expect: The application does NOT redirect the user to the dashboard
    - expect: An error notification or message is displayed indicating invalid credentials (e.g., 'Invalid username or password', 'Login failed', or similar)
    - expect: The user remains on the login page at http://172.24.169.172/loyalty/auth-login

#### 1.3. TC-03: Login Fails When Required Fields Are Empty

**File:** `tests/procash/tc03-empty-fields.spec.ts`

**Steps:**
  1. Navigate to http://172.24.169.172/loyalty/auth-login
    - expect: The login page is displayed with all form fields empty
  2. Leave the Personal Number field blank (do not enter any value)
    - expect: The Personal Number field remains empty
  3. Leave the Password field blank (do not enter any value)
    - expect: The Password field remains empty
  4. Leave the 'Enter Captcha' field blank (do not enter any value)
    - expect: The captcha field remains empty
  5. Click the 'Sign In' button
    - expect: The form is NOT submitted successfully
    - expect: Validation messages or error indicators appear on the required fields (Personal Number, Password, and/or Captcha)
    - expect: The user remains on the login page
    - expect: No navigation to the dashboard or authenticated area occurs
