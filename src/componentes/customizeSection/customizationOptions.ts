import { BackgroundTypes, LogoTypes } from "../../types/socketTypes";

const customizationOptions: {
  background: BackgroundTypes[];
  logos: Exclude<LogoTypes, null>[];
} = {
  background: ["dark", "light", "camo", "checkered"],
  logos: ["smily", "angry", "cool"],
};

export default customizationOptions;
