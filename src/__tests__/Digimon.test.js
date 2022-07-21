import axios from "axios";
import { render, screen, fireEvent } from "@testing-library/react";
import CardDigimon from "../components/CardDigimon";

jest.mock("axios");
// Axios-mock-Adapter
//Jest

describe("User types a valid Digimon", () => {
  test("Should show digimon info", async () => {
    const response = [
      {
        name: "Tsunomon",
        img: "https://digimon.shadowsmith.com/img/tsunomon.jpg",
        level: "In Training",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: response });

    render(<CardDigimon />);
    const input = screen.queryByRole("textbox");
    const button = screen.queryByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Agumon",
      },
    });

    fireEvent.click(button);

    const listItem = await screen.findByRole("listItem");
    const paragraph = await screen.findByText("Tsunomon");

    expect(listItem).toHaveLength(1);
    expect(paragraph).toHaveTextContent(Tsunomon);
  });
});

describe("User types an invalid Digimon", () => {
  test("Should show error message", async () => {
    axios.get.mockRejectValue(new Error());

    // mockRejectValue / Once = simular falha na requisição
    // mockResolvedValue / Once = simular sucesso na requisição

    render(<CardDigimon />);

    const input = screen.queryByRole("textbox");
    const button = screen.queryByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Invalid",
      },
    });

    fireEvent.click(button);

    const paragraph = await screen.findByText(/errado/i);

    expect(paragraph).toBeInTheDocument();
  });
});
