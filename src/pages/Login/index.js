import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";

import { useAuth } from "../../providers/Auth";

function Login() {
  const history = useHistory();

  const { signIn } = useAuth();

  const [error, setError] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(4, "Mínimo de 4 dígitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm = (userData) => {
    console.log("teste");
    signIn(userData, setError, history);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleForm)} data-testid="formTestId">
        <div>
          <TextField
            data-testid="userNameTestId"
            margin="normal"
            variant="outlined"
            label="Nome de usuário"
            size="small"
            color="secondary"
            {...register("username")}
            error={!!errors?.username}
            helperText={errors?.username?.message}
          ></TextField>
        </div>

        <div>
          <TextField
            data-testid="passwordTestId"
            margin="normal"
            variant="outlined"
            label="Senha"
            size="small"
            color="primary"
            {...register("password")}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          ></TextField>
        </div>
        <Button
          data-testid="submitButton"
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Enviar
        </Button>
      </form>
      {error && <span> Usuário ou senha incorretas! </span>}
    </Container>
  );
}

export default Login;
