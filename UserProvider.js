import React, { useContext } from "react";
import { useUserData } from "@nhost/nextjs";
import { gql, useQuery } from "@apollo/client";
import { useUserId } from "@nhost/nextjs";

const GET_USER_QUERY = gql`
  query GetUser($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
      metadata
      avatarUrl
    }
  }
`;

const UserContext = React.createContext(null);

export function UserProvider({ children = null }) {
  const id = useUserId();
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id },
  });
  const user = data?.user;

  if (loading) {
    return null;
  }
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
