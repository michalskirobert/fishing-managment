import { CustomButton, TCustomButtonProps } from "./button";
import { CustomDropdownButton, TCustomDropdownButtonProps } from "./dropdown";
import { CustomToggle, TToggleProps } from "./toggle";

type TCustomButtonConfig = TCustomButtonProps & {
  isDropdown?: boolean;
  isToggle?: boolean;
};
type TDropdownButtonConfig = TCustomDropdownButtonProps & {
  isDropdown?: boolean;
  isToggle?: boolean;
};

type TToggleConfig = TToggleProps & {
  isDropdown?: boolean;
  isToggle?: boolean;
};

export type TButtonConfig =
  | TCustomButtonConfig
  | TDropdownButtonConfig
  | TToggleConfig;

type DetailButtonProps = {
  button: TButtonConfig;
};

export const DetailButton: React.FC<DetailButtonProps> = ({ button }) => {
  // if (button.isDropdown) {
  //   return <CustomDropdownButton {...(button as TCustomDropdownButtonProps)} />;
  // }

  // if (button.isToggle) {
  //   return <CustomToggle {...(button as TToggleProps)} />;
  // }

  return <CustomButton {...(button as TCustomButtonProps)} />;
};
