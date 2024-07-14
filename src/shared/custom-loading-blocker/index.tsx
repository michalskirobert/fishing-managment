import { ReactNode } from "react";

interface ICustomLoadingBlockerProps {
  children: ReactNode;
  blocking: boolean;
}

export const CustomLoadingBlocker = ({
  children,
  blocking,
}: ICustomLoadingBlockerProps) => <div>{children}</div>;
