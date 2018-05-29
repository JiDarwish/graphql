import { gql } from 'apollo-server';

export default gql`
  type Query {
    amILoggedIn(token: String!): LoggedInInfo!
  }

  type LoggedInInfo {
    username: String
    _id: String
    success: Boolean!
  }

  type AuthPayload {
    success: Boolean!
    token: String
    error: String
  }

  type Mutation {
    signUp(username: String! password: String!): AuthPayload
    logIn(username: String! password: String!): AuthPayload
  }
`;