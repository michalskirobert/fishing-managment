import * as yup from "yup";

export const validationSchema = yup.object({
  area: yup.string().required("Musisz wybrać okręg"),
});
