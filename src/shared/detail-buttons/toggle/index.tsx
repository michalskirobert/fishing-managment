import { useState } from "react";
import { InputProps, Tooltip } from "reactstrap";

export type TToggleProps = {
  content: string;
  inputProps: InputProps;
  value: boolean;
  tooltipContent?: string;
};

export const CustomToggle = ({
  inputProps,
  content,
  value,
  tooltipContent,
}: TToggleProps) => {
  const [isTooltip, setIsTooltip] = useState(false);

  const tooltipId = inputProps.name?.replaceAll(".", "-");

  const toggle = () => setIsTooltip((prev) => !prev);

  return (
    <>
      <div className="mr-2">
        <label
          {...{
            className: "d-flex align-items-center",
            htmlFor: inputProps.name || "",
            style: { cursor: "pointer" },
          }}
        >
          {content}
          <div
            {...{
              className: "switch has-switch ml-2",
              "data-on-label": "ON",
              "data-off-label": "OFF",
              id: `tooltip-${tooltipId}`,
            }}
          >
            <div
              className={`switch-animate ${value ? "switch-on" : "switch-off"}`}
            >
              <input
                {...{
                  type: "checkbox",
                  checked: value,

                  ...inputProps,
                }}
              />
              <span
                {...{
                  className: `switch-left bg-info ${
                    inputProps.disabled && "switch-disabled "
                  }`,
                }}
              >
                TAK
              </span>
              <label
                {...{
                  className: `${inputProps.disabled && "switch-disabled "}`,
                  id: "switch-btn",
                }}
              />
              <span
                {...{
                  className: `switch-right bg-info ${
                    inputProps.disabled && "switch-disabled "
                  }`,
                }}
              >
                NIE
              </span>
            </div>
          </div>
        </label>
      </div>
      {tooltipContent ? (
        <>
          <Tooltip
            {...{
              placement: "top",
              isOpen: isTooltip,
              target: `tooltip-${tooltipId}`,
              className: "w-auto pb-2",
              style: { maxWidth: "600px" },
              toggle,
            }}
          >
            {tooltipContent}
          </Tooltip>
        </>
      ) : null}
    </>
  );
};
