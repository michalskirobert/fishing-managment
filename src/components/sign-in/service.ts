import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { validationSchema } from "./validation-schema";
import { SignInFormProps } from "./types";

import { useAppDispatch, useAppSelector } from "@redux/store";
import { setUser } from "@redux/reducers/auth";
import { useSignInMutation } from "@api/service/auth";
import { ProfileId } from "@src/redux/reducers/auth/types";

export const useSignInService = () => {
  const { previousPage } = useAppSelector(({ history }) => history);
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
        dispatch(setUser({ ...data, isLogin: true }));
        router.push(previousPage);
      });
  };

  return {
    methods,
    onSubmit,
    isSigning,
  };
};
