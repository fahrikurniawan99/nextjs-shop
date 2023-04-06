import * as React from "react";

interface State {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const appContext = React.createContext<State>({
  query: "",
  setQuery: () => {},
});


export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = React.useState<string>("");
  console.log(query);

  const value: State = {
    query,
    setQuery,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

export const useAppContext = () => React.useContext(appContext);