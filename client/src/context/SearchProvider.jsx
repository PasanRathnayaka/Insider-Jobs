import { useContext, useState } from 'react'
import { createContext } from 'react'

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

  const [currentSearched, setCurrentSearched] = useState(
    {
      searchedTitle: "",
      searchedLocation: ""
    }
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");


  return (
    <SearchContext.Provider
      value={
        {
          currentSearched, setCurrentSearched,
          selectedCategory, setSelectedCategory,
          selectedLocation, setSelectedLocation,
        }
      }
    >
      {children}
    </SearchContext.Provider>
  )

}

export const useSearch = () => useContext(SearchContext);


