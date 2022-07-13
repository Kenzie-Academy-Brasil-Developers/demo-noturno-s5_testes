import { render, screen } from "@testing-library/react";
import Card from ".";

test("Should show personal info", () => {
  //renderizar
  render(<Card name="Paulo" city="Mauá" showInfo={true} />);

  //ação
  const infoText = screen.queryByText("Mauá");

  //verificação com expect
  expect(infoText).toBeInTheDocument();
});

test("Should not show personal info", () => {
  render(<Card name="William" city="Sobradinho" showInfo={false} />);

  const infoText = screen.queryByText("Sobradinho");

  expect(infoText).not.toBeInTheDocument();
});
