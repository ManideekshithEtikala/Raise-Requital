// UserContext.js
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser ] = useState(null); // User data state

  return (
    <UserContext.Provider value={{ user, setUser  }}>
      {children}
    </UserContext.Provider>
  );
};