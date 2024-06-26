import { type SchemaTypeDefinition } from "sanity";

import info from "./schemas/info";
import project from "./schemas/project";
import landscapeImage from "./schemas/objects/landscapeImage";
import twoUpImage from "./schemas/objects/twoUpImage";
import settings from "./schemas/settings";
import home from "./schemas/home";
import portraitImage from "./schemas/objects/portraitImage";
import quote from "./schemas/objects/quote";
import tags from "./schemas/objects/tags";
import video from "./schemas/objects/video";
import archive from "./schemas/archive";
import fourUpImage from "./schemas/objects/fourUpImage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    info,
    project,
    landscapeImage,
    twoUpImage,
    fourUpImage,
    settings,
    home,
    portraitImage,
    quote,
    tags,
    video,
    archive,
  ],
};
