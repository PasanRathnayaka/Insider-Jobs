import { SearchProvider } from "./context/SearchProvider"
import { AuthProvider } from "./context/AuthProvider"
import AppRoutes from "./routes/AppRoutes.jsx"
import { MobileMenuProvider } from "./context/MobileMenuProvider.jsx"



function App() {

  return (
    <>

      <AuthProvider>
            <MobileMenuProvider>
              <SearchProvider>

                <AppRoutes />

              </SearchProvider>
            </MobileMenuProvider>
      </AuthProvider>

    </>
  )
}

export default App
