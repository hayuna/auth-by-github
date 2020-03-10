import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user");
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <context.Provider value={user}>{children}</context.Provider>;
};

UserProvider.context = context;

export default UserProvider;
