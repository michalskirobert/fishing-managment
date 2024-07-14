import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { validationSchema } from "./validation-schema";
import { SignInFormProps } from "./types";

import { useAppDispatch } from "@redux/store";
import { setUser } from "@redux/reducers/auth";
import { useSignInMutation } from "@api/service/auth";

export const useSignInService = () => {
  const router = useRouter();

  const [signIn, { isLoading: isSigning }] = useSignInMutation();

  const methods = useForm<SignInFormProps>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (fieldValues: SignInFormProps) => {
    const { ...restBody } = fieldValues;

    signIn(restBody)
      .unwrap()
      .then((data) => {
        dispatch(setUser(data));
        router.push("/");
      });
  };

  return {
    methods,
    onSubmit,
    isSigning,
  };
};
