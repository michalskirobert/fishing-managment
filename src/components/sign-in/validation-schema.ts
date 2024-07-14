import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Nieprawidłowy adres e-mail")
    .required("E-mail jest wymagany"),
  password: yup.string().required("Hasło jest wymagane"),
  rememberMe: yup.bool(),
});
