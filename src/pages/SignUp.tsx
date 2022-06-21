import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("O Campo é obrigatório"),
  email: Yup.string()
    .email("O Campo precisa ser um email")
    .required("O Campo é obrigatório"),
  password: Yup.string()
    .min(8, "O numero necessário de caracters para a senha é de 8")
    .required("O Campo é obrigatório"),
  passwordConfirmation: Yup.string()
    .required("Senhas não batem")
    .oneOf([Yup.ref("password"), null], "Senhas não batem"),
});

interface SignUpData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const signUpInitialValues: SignUpData = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignUp: React.FC = () => {
  const { register } = useAuth();

  const handleSubmit = async (values: SignUpData) => {
    await register(
      values.name,
      values.email,
      values.password,
      values.passwordConfirmation
    );
  };

  const formik = useFormik({
    validationSchema: signUpSchema,
    initialValues: signUpInitialValues,
    onSubmit: handleSubmit,
  });
  return (
    <div className="container m-10">
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            id="name"
            type="name"
            name="name"
            onChange={formik.handleChange}
            placeholder="Your Name"
            required={true}
            color={formik.touched.name && formik.errors.name ? "red" : "base"}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            placeholder="name@flowbite.com"
            required={true}
            color={formik.touched.email && formik.errors.email ? "red" : "base"}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            required={true}
            color={
              formik.touched.password && formik.errors.password ? "red" : "base"
            }
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="passwordConfirmation"
              value="Repeat your password"
            />
          </div>
          <TextInput
            id="passwordConfirmation"
            type="password"
            name="passwordConfirmation"
            onChange={formik.handleChange}
            required={true}
            color={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
                ? "red"
                : "base"
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button
          type="button"
          disabled={formik.submitCount >= 0 ? !formik.isValid : true}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
