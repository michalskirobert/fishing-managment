import React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuListProps } from "./utils";

export const MainMenuListItems: React.FC<{
  group: MenuListProps[];
  index: number;
}> = ({ group, index }) => {
  const currentPath = usePathname();

  const lastGroupIndex = group.length - 1;
  const currentIndex = index + 1;

  return (
    <>
      {group.map(({ title, icon, to }) => (
        <ListItemButton key={title} selected={currentPath === to} href={to}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      ))}

      {currentIndex !== lastGroupIndex && <Divider sx={{ my: 1 }} />}
    </>
  );
};
