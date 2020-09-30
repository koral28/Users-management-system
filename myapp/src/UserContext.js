import React from "react";

const UserContext = React.createContext({});
//we have only 1 provider!
export const UserProvider = UserContext.Provider;
//many consumers can use the same UserConsumer! no need to create another one like this!
export const UserConsumer = UserContext.Consumer;

export default UserContext;
