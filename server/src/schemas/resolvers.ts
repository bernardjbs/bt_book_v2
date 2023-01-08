import {Match} from "../models/Match.js";
import { GraphQLScalarType, Kind } from 'graphql';

const resolvers = {
  Query: {
    matches: async () => {
      try {
        const matches = await Match.find();
        return matches;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    }
  },
  
  // Defining Scalar type for Date
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Scalar Type for Date',
    parseValue(value: any) {
      return new Date(value); // Value from the client
    },
    serialize(value: any) {
      const date = new Date(value);
      return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString(); // Value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};

export default resolvers;
