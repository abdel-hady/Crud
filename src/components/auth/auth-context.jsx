import * as React from "react";
import { QueryClient } from "react-query";
import * as auth from "../../auth-provider";
import { client } from "../../utils/api-client";
import { useAsync } from "../../utils/hooks";

async function bootstrapAppData(user) {
  return user;
}

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const {
    data: user,
    error,
    isLoading,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();
  const queryCache = new QueryClient();
  React.useEffect(() => {
    const appDataPromise = bootstrapAppData(user);
    run(appDataPromise);
  }, [run]);

  const login = React.useCallback(
    async (username) => {
      const { token, user } = await auth.login(username);
      setData({ token, user });
    },
    [setData]
  );

  const logout = React.useCallback(() => {
    auth.logout();
    const appDataPromise = bootstrapAppData("");
    run(appDataPromise);
    queryCache.clear();
  }, []);

  const value = React.useMemo(
    () => ({ user, login, logout }),
    [login, logout, user]
  );

  if (isLoading) {
    console.log(isLoading, "Loading");
  }

  if (isError) {
    console.error(isError, error);
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function useClient() {
  const { user } = useAuth();
  const token = user?.token;

  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { AuthProvider, useAuth, useClient };
