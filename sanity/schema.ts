import { type SchemaTypeDefinition } from "sanity";

import contact from "./schemas/contact";
import project from "./schemas/project";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact, project],
};
