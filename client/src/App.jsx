import { SearchProvider } from "./context/SearchProvider"
import { AuthProvider } from "./context/AuthProvider"
import AppRoutes from "./routes/AppRoutes.jsx"
import { MobileMenuProvider } from "./context/MobileMenuProvider.jsx"
import AuthModal from "./components/AuthModal.jsx"
import { JobProvider } from "./context/JobProvider.jsx"
import { ApplicationProvider } from "./context/ApplicationProvider.jsx"


function App() {

  return (
    <>

      <AuthProvider>
        <JobProvider>
          <ApplicationProvider>
            <MobileMenuProvider>
              <SearchProvider>
                <AuthModal />

                <AppRoutes />

              </SearchProvider>
            </MobileMenuProvider>
          </ApplicationProvider>
        </JobProvider>
      </AuthProvider>

    </>
  )
}

export default App
