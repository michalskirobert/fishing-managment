import {
  Logout,
  Map,
  People,
  Person,
  Settings,
  Book,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";

export interface MenuListProps {
  title: string;
  to: string;
  icon?: JSX.Element;
}

export const menuList: MenuListProps[][] = [
  [
    {
      title: "Strona główna",
      icon: <DashboardIcon />,
      to: "/",
    },
    {
      title: "Łowiska",
      icon: <Map />,
      to: "/spots",
    },
    {
      title: "Wędkarze",
      icon: <People />,
      to: "/customers",
    },
  ],
  [
    {
      title: "Mój profil",
      icon: <Person />,
      to: "/my-profile",
    },
    {
      title: "Słowniki",
      icon: <Book />,
      to: "/dictionaries",
    },
    {
      title: "Ustawienia",
      icon: <Settings />,
      to: "/settings",
    },
    {
      title: "Wyloguj",
      icon: <Logout />,
      to: "/sign-out",
    },
  ],
];
