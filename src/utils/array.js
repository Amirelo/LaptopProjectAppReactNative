import {useLanguage} from '../themes/languageTheme';

const language = useLanguage();

export const orderStatusArr = [
  {status: language.arr_status_order_0, color: 'err'},
  {status: language.arr_status_order_1, color: 'process'},
  {status: language.arr_status_order_2, color: 'text'},
  {status: language.arr_status_order_3, color: 'warn'},
  {status: language.arr_status_order_4, color: 'success'},
];

export const addressStatusArr = [
  {status: language.arr_status_address_0, color: 'err'},
  {status: language.arr_status_address_1, color: 'primary'},
  {status: language.arr_status_address_2, color: 'text'},
];

export const exploreSortArr = [
  language.arr_explore_sort_0,
  language.arr_explore_sort_1,
  language.arr_explore_sort_2,
  language.arr_explore_sort_3,
  language.arr_explore_sort_4,
];
