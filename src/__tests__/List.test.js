import { render, screen, fireEvent } from "@testing-library/react";

import List from "../components/List";

describe("Test to user actions", () => {
  test("Should all the names from input appear at the screen", async () => {
    // renderiza
    render(<List />);

    //ação
    const input = screen.getByPlaceholderText(/digite um nome/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "William",
      },
    });
    fireEvent.click(button);

    fireEvent.change(input, {
      target: {
        value: "Allan",
      },
    });

    fireEvent.click(button);

    fireEvent.change(input, {
      target: {
        value: "Fernanda Constância",
      },
    });
    fireEvent.click(button);
    // getby - síncrono, no momento de montagem do componente
    // findBy - Assíncrono, utilizado no momento de atualização
    // query - síncrono, utilizado no momento de desmontagem

    const list = await screen.findAllByRole("listitem");

    //verificação
    expect(list).toHaveLength(2);
    expect(list[0]).toHaveTextContent(/william/i);
  });
});

describe("Button verification", () => {
  test("Verify if Button is disabled", () => {
    render(<List />);

    //ação
    const input = screen.getByPlaceholderText(/digite um nome/i);

    const button = screen.getByRole("button");

    //verificação
    expect(button).toBeDisabled();
  });
  test("Verify if Button is not disabled", async () => {
    render(<List />);

    //ação
    const input = screen.getByPlaceholderText(/digite um nome/i);

    fireEvent.change(input, {
      target: {
        value: "Paulo",
      },
    });

    const button = await screen.findByRole("button");

    //verificação
    expect(button).toBeEnabled();
  });
});
