import React, { ReactNode } from "react";
import { CircularProgress } from "@mui/material";

interface CustomLoadingBlockerProps {
  children: ReactNode;
  isLoading: boolean;
}

import styles from "./styles.module.scss";

export const CustomLoadingBlocker: React.FC<CustomLoadingBlockerProps> = ({
  children,
  isLoading,
}) => {
  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <CircularProgress thickness={5} />
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    );
  else return <>{children}</>;
};
