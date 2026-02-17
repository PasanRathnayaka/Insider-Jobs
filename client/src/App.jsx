import { SearchProvider } from "./context/SearchProvider"
import { AuthProvider } from "./context/AuthProvider"
import AppRoutes from "./routes/AppRoutes.jsx"
import { MobileMenuProvider } from "./context/MobileMenuProvider.jsx"
import AuthModal from "./components/AuthModal.jsx"



function App() {

  return (
    <>

      <AuthProvider>
            <MobileMenuProvider>
              <SearchProvider>
                <AuthModal />

                <AppRoutes />

              </SearchProvider>
            </MobileMenuProvider>
      </AuthProvider>

    </>
  )
}

export default App
