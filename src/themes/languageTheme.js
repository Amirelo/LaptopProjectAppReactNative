import {NativeModules} from 'react-native';

const languageTheme = {
  en: {
    login_text_header: 'Welcome To Computer Store',
    login_text_sub_header: 'Sign In To Continue',
    login_text_other_signin_option: 'Or Sign In With',
    login_button_signin: 'Sign In',
    login_button_forgot_password: 'Forgot Password',
    login_button_google_signin: 'Google',
    login_button_signup_1: "Don't have an account?",
    login_button_signup_2: 'Sign Up here',

    verify_text_description: 'We will send a verification code to your email',
    verify_text_code_description: 'Please verify before the timer expire',
    verify_button_send: 'Send',
    verify_button_signin_1: 'Already have an account?',
    verify_button_signin_2: 'Sign In here',
    

    placeholder_username: 'Username',
    placeholder_password: 'Password',
    placeholder_email: 'Email',
    placeholder_verify: 'Verification code',

    err_empty: 'Fields cannot be empty',
    err_signin_wrong: 'Wrong username or password',
    err_nav: 'Invalid navigation',
    err_verify_code: 'Invalid Verification Code',
  },
};

export const useLanguage = () => {
  const {localeIdentifier} = NativeModules.I18nManager;
  let locale = localeIdentifier.slice(0,2);
  let language = languageTheme[locale];
  return language;
};
