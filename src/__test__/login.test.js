import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "../pages/Login";

const mockedHandleSubmit = jest.fn();

jest.mock("../providers/Auth", () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
      token: "token",
    }),
  };
});

jest.mock("react-hook-form", () => {
  return {
    useForm: () => ({
      register: jest.fn(),
      handleSubmit: mockedHandleSubmit,
      formState: "errors",
    }),
  };
});

describe("Use handleSubmit from React-hook-form", () => {
  test("should call handleSubmit", () => {
    render(<Login />);

    const userInput = screen.getByTestId("userNameTestId");
    const passwordInput = screen.getByTestId("passwordTestId");

    // Caso utilize uma biblioteca de componentes que não será possível,
    // selecionar o elemento que contenha o atributo "onChange", deverá
    // ser utilizado o userEvent com o método 'type'

    userEvent.type(userInput, "kenzie");
    userEvent.type(passwordInput, "1234");

    //   ------- NÃO FUNCIONA ------
    //   fireEvent.change(userInput, {
    //     target: {
    //       value: "kenzinho",
    //     },
    //   });
    //   fireEvent.change(passwordInput, {
    //     target: {
    //       value: "1234",
    //     },
    //   });

    const button = screen.getByTestId("submitButton");
    const form = screen.getByTestId("formTestId");

    // O SUBMIT DO FORMULÁRIO PODERÁ SER FEITO UTILIZANDO O BUTTON COM O
    // MÉTODO CLICK OU TAMBÉM O SUBMIT DO FIREEVENT
    fireEvent.submit(form);
    // fireEvent.click(button);

    expect(mockedHandleSubmit).toHaveBeenCalled();
  });
});
