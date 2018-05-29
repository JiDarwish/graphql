import { ApolloServer } from 'apollo-server';

import typeDefs from './typeDefs/typeDefs';
import resolvers from './resolvers/resolvers';

export default new ApolloServer({
  typeDefs,
  resolvers,
  context(headers, secret) {
    return { headers, secret };
  }
});