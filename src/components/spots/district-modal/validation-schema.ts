import * as yup from "yup";

export const validationSchema = yup.object({
  district: yup.string().required("Musisz wybrać okręg"),
});
