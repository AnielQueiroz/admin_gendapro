import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { loginService } from "@/services/authService";
import { login } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("E-mail obrigatório"),
    password: Yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await loginService(data.email, data.password);

      console.log(response);

      if (!response.success) {
        toast.error(response.data.message);
        return;
      }

      // Armazenar o token no redux
      dispatch(login({ email: data.email, token: response.data.token }));

      toast.success("Login realizado com sucesso!");

      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar o login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="text"
              placeholder="Insira seu e-mail"
              {...register("email")}
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Insira sua senha"
              {...register("password")}
              error={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
