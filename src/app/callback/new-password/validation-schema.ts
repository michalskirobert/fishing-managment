import { fieldMessages } from "@src/utils/constants";
import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Nieprawidłowy adres e-mail")
    .required(fieldMessages.required),
  secretCode: yup.string().required(fieldMessages.required),
});
