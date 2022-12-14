import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import EIntBoolean from "models/enums/EIntBoolean";

export type UniSelectionResponseModel = {
  message: string;
  data: Uni[];
};

export type Uni = {
  id: string;
  title: string;
  websiteURL: string;
  subdomain: string;
  status: string;
  timezone: string;
  mainLogo: {
    fileURL: string;
    originalName: string;
  };
  navLogo: {
    fileURL: string;
    originalName: string;
  };
  profilePicture: {
    fileURL: string;
    originalName: string;
  };
  images: {
    fileURL: string;
    originalName: string;
  }[];
  ssoMethod: string;
  chatFeature: number;
  socialFeedFeature: number;
  allowDisplayProfiles: EIntBoolean;
  roommateAgreementFeature: EIntBoolean;
  displayMatch: number;
  displayMCRLogo: number;
  interfaceColor: string;
  isPrimaryCustom: number;
  isSecondaryCustom: number;
  primaryColorDark: string;
  primaryColorLight: string;
  secondaryColorDark: string;
  secondaryColorLight: string;

  colorPalette: ColorPalette;
};
