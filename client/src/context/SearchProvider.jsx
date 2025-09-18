import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

  const [currentSearched, setCurrentSearched] = useState(
    {
      searchedTitle: "",
      searchedLocation: ""
    }
  );



  return (
    <SearchContext.Provider
      value={
        {
          currentSearched, setCurrentSearched,
        }
      }
    >
      {children}
    </SearchContext.Provider>
  )

}

export const useSearch = () => useContext(SearchContext);


