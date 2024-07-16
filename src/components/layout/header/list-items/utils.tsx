import { Logout, Map, People, Person, Settings } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";

export interface MenuListProps {
  title: string;
  permissions: string[];
  to: string;
  children: MenuListProps[];
  icon?: JSX.Element;
}

export const menuList: MenuListProps[][] = [
  [
    {
      title: "Strona główna",
      icon: <DashboardIcon />,
      to: "/",
      permissions: [],
      children: [],
    },
    {
      title: "Łowiska",
      icon: <Map />,
      to: "/spots",
      permissions: [],
      children: [],
    },
    {
      title: "Wędkarze",
      icon: <People />,
      to: "/customers",
      permissions: [],
      children: [],
    },
  ],
  [
    {
      title: "Mój profil",
      icon: <Person />,
      to: "/my-profile",
      permissions: [],
      children: [],
    },
    {
      title: "Ustawienia",
      icon: <Settings />,
      to: "/settings",
      permissions: [],
      children: [],
    },
    {
      title: "Wyloguj",
      icon: <Logout />,
      to: "/sign-out",
      permissions: [],
      children: [],
    },
  ],
];
