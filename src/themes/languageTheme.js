import {NativeModules} from 'react-native';

const languageTheme = {
  en: {
    header_text_home: 'Home',
    header_text_explore: 'Explore',
    header_text_cart: 'Cart',
    header_text_account: 'Account',
    header_text_favorite: 'Favorite',
    header_text_notification: 'Notification',
    header_text_filter: 'Filter',
    header_text_recipient_info: 'Receipt Info',
    header_text_checkout: 'Checkout',
    header_text_profile: 'Profile',
    header_text_address: 'Address',
    header_text_insert_address: 'New Address',
    header_text_card: 'User Card',
    header_text_insert_card: 'New Card',
    header_text_order: 'User Order',
    header_text_order_details: 'Order Details',
    header_text_promocodes: 'Promocodes',
    header_text_product_detail: 'Product Details',
    header_text_product_ratings: 'Ratings',
    header_text_product_insert_rating: 'New Ratings',
    header_text_update_user: 'Update User Info',
    
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
    verify_button_resend: 'Resend verification code',
    verify_button_verify: 'Verify',

    changePass_button_confirm: 'Confirm',

    signUp_button_confirm: 'Confirm',

    home_text_banner: 'Welcome To Computer Store',
    home_text_popular: 'Popular',
    home_text_best_buy: 'Best Buy',
    home_text_likeable: 'You Might Like',
    home_text_see_more: 'See more',
    
    explore_text_result: 'Result(s)',
    explore_text_filter: 'Filter',

    account_tabHeader_myOrder: 'My Order',
    account_tabSub_myOrder: 'Order(s) In Progress',
    account_tabHeader_adderss: 'Shipping address',
    account_tabSub_adderss: 'Address(s)',
    account_tabHeader_payment: 'Payment Methods',
    account_tabSub_payment: '',
    account_tabHeader_promo: 'Promocodes',
    account_tabSub_promo: 'Promocode(s) Available',
    account_tabHeader_changePass: 'Change Password',
    account_tabSub_changePass: 'Change Your Password',
    account_tabHeader_logout: 'Logout',
    account_tabSub_logout: 'Logout Of Your Account',

    placeholder_username: 'Username',
    placeholder_fullname: 'Fullname',
    placeholder_password: 'Password',
    placeholder_password_confirm: 'Confirm Password',
    placeholder_email: 'Email',
    placeholder_phoneNumber: 'Phone Number',
    placeholder_birthday: 'Birthday',
    placeholder_verify: 'Verification code',

    err_empty: 'Fields cannot be empty',
    err_signin_wrong: 'Wrong username or password',
    err_nav: 'Invalid navigation',
    err_verify_code: 'Invalid Verification Code',
  },
};

export const useLanguage = () => {
  const {localeIdentifier} = NativeModules.I18nManager;
  let locale = localeIdentifier.slice(0, 2);
  let language = languageTheme[locale];
  return language;
};
