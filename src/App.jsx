import { useAuth } from "./components/auth/auth-context";
import { Navbar } from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
// import { useContext } from "react";
import "./App.css";
const queryClient = new QueryClient();
import { AuthenticatedApp } from "./authenticated-app";

import { UnauthenticatedApp } from "./unauthenticated-app";
function App() {
  const { user } = useAuth();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </QueryClientProvider>
    </>
  );
}

export default App;
