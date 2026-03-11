import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'https://content.tinajs.io/2.2/content/d3fcc863-4050-40d4-bbc7-cbf9d7c54646/github/main', token: '18eee00ea5ca7a66d0f343af3ccfdf142d91ea18', queries,  });
export default client;
  