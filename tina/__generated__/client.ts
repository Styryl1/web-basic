import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/styryl/dev/bob6/tina/__generated__/.cache/1772297353253', url: 'http://localhost:4001/graphql', token: 'null', queries,  });
export default client;
  