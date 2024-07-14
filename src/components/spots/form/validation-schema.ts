import * as yup from "yup";

import { fieldMessages } from "@utils/constants";

export const validationSchema = yup.object().shape({
  name: yup.string().required(fieldMessages.required),
  area: yup.string().required(fieldMessages.required),
  description: yup.string().required(fieldMessages.required),
  geolocation: yup.object({
    lat: yup.number().required(fieldMessages.required),
    lng: yup.number().required(fieldMessages.required),
  }),
  code: yup.string().required(fieldMessages.required),
});
