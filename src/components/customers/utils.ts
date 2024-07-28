import { IColumnProps } from "devextreme-react/cjs/data-grid";

export const columns: IColumnProps[] = [
  {
    dataField: "name",
    caption: "Imię",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "surname",
    caption: "Nazwisko",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "district",
    caption: "Okręg",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "club",
    caption: "Koło",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "assignedDate",
    caption: "Data dołączenia do koła",
    allowSorting: true,
    dataType: "date",
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "quitDate",
    caption: "Data odejścia",
    allowSorting: true,
    dataType: "date",
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "pesel",
    caption: "Pesel",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "permitNo",
    caption: "Numer pozwolenia",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
  {
    dataField: "paid",
    caption: "Składka opłacona za bieżący rok",
    allowSorting: true,
    visible: true,
    allowHeaderFiltering: false,
  },
];
