import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const createSessionSchema = object({
  email: string({
    required_error: "name is required",
  }).nonempty({
    message: "name is required",
  }),
  password: string({
    required_error: "password is required",
  }).nonempty({
    message: "password is required",
  }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const LoginPage = () => {
  const router = useRouter();

  const [loginError, setLoginError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const onSubmit = async (values: CreateSessionInput) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        { withCredentials: true },
      );
      router.push("/");
    } catch (e) {
      setLoginError(e.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="john.doe@example.com"
            {...register("email")}
          />
          <p>{loginError}</p>
        </div>
        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="*********"
            {...register("password")}
          />
          <p>{loginError}</p>
        </div>

        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
};

export default LoginPage;
