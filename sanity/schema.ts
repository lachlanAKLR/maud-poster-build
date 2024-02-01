import { type SchemaTypeDefinition } from "sanity";

import contact from "./schemas/contact";
import project from "./schemas/project";
import singleImage from "./schemas/objects/singleImage";
import twoUpImage from "./schemas/objects/twoUpImage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact, project, singleImage, twoUpImage],
};
