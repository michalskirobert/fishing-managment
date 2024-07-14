import { Button, ButtonProps, CircularProgress, Tooltip } from "@mui/material";

export type TCustomButtonProps = {
  buttonProps: ButtonProps;
  content: string;
  tooltipContent?: string;
  isHidden?: boolean;
  isLoading?: boolean;
};

export const CustomButton: React.FC<TCustomButtonProps> = ({
  buttonProps,
  content,
  tooltipContent,
  isHidden = false,
  isLoading = false,
}) => {
  if (isHidden) {
    return null;
  }

  return (
    <Tooltip title={tooltipContent}>
      <Button
        {...{
          ...buttonProps,
          className: `${buttonProps?.className || "mb-2 btn-shadow"}`,
          disabled: isLoading || !!buttonProps?.disabled,
          startIcon: isLoading ? (
            <CircularProgress size={"20px"} thickness={5} />
          ) : (
            buttonProps.startIcon
          ),
        }}
      >
        {content}
      </Button>
    </Tooltip>
  );
};
