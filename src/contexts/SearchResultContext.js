import { createContext } from 'react';

export const SearchResultContext = createContext({
  query: '',  warning: "none", products: {}
});