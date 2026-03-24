import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '18eee00ea5ca7a66d0f343af3ccfdf142d91ea18', queries,  });
export default client;
  