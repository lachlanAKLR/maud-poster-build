import { type SchemaTypeDefinition } from "sanity";

import info from "./schemas/info";
import project from "./schemas/project";
import singleImage from "./schemas/objects/singleImage";
import twoUpImage from "./schemas/objects/twoUpImage";
import settings from "./schemas/settings";
import home from "./schemas/home";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [info, project, singleImage, twoUpImage, settings, home],
};
