import { useState } from "react";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Tooltip,
  DropdownToggleProps,
  TooltipProps,
  DropdownItem,
  DropdownItemProps,
  Spinner,
  DropdownMenuProps,
} from "reactstrap";

export type TCustomDropdownButtonProps = {
  dropdownToggleProps: DropdownToggleProps;
  dropdownMenuProps?: DropdownMenuProps;
  icon?: string;
  content: string;
  tooltipProps?: TooltipProps;
  tooltipContent?: string;
  dropdownItems: DropdownItemProps[];
  isHidden?: boolean;
  isLoading?: boolean;
};

const SingleDropdownItem: React.FC<DropdownItemProps> = (item) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  return (
    <>
      <div id={item.id}>
        <DropdownItem {...item}>{item.children}</DropdownItem>
      </div>
      {item.id && item.content && (
        <Tooltip
          {...{
            placement: "top",
            isOpen: isTooltipOpen,
            toggle: () => setIsTooltipOpen(!isTooltipOpen),
            target: item.id,
          }}
        >
          {item.content}
        </Tooltip>
      )}
    </>
  );
};

export const CustomDropdownButton = ({
  dropdownToggleProps,
  tooltipProps,
  tooltipContent,
  icon,
  content,
  dropdownItems,
  isHidden = false,
  isLoading = false,
  dropdownMenuProps,
}: TCustomDropdownButtonProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const tooltipId = dropdownToggleProps.id?.replaceAll(".", "-");

  if (isHidden) {
    return null;
  }

  return (
    <UncontrolledButtonDropdown {...{ id: `tooltip-${tooltipId}` }}>
      <DropdownToggle
        {...{
          ...dropdownToggleProps,
          color: dropdownToggleProps?.disabled
            ? "bg-white"
            : dropdownToggleProps.color,
          className: `mb-2  ${
            dropdownToggleProps?.disabled ? "text-dark border-dark" : ""
          } ${dropdownToggleProps?.className}`,
        }}
      >
        <span>
          {isLoading ? (
            <Spinner {...{ style: { width: 14, height: 14 } }} />
          ) : null}
          {icon && !isLoading ? <i className={icon} /> : null} {content}
        </span>
      </DropdownToggle>
      <DropdownMenu {...dropdownMenuProps}>
        {dropdownItems.map((item, index) => (
          <SingleDropdownItem key={index} {...item} />
        ))}
      </DropdownMenu>
      {tooltipContent && (
        <Tooltip
          {...{
            placement: "top",
            isOpen: isTooltipOpen,
            toggle: () => setIsTooltipOpen(!isTooltipOpen),
            ...tooltipProps,
            target: `tooltip-${tooltipId}`,
          }}
        >
          {tooltipContent}
        </Tooltip>
      )}
    </UncontrolledButtonDropdown>
  );
};
