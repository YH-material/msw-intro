// standardimport från msw
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
//används för att sätta upp servern
import { setupServer } from "msw/node";
import App from "./App";

// sätter upp msw att lyssna på nedanstående URL, alla requests till den URL:en kontrollerar vi.
// Vi returnerar vårt egna objekt med rådet YOLO
const server = setupServer(
  rest.get("https://api.adviceslip.com/advice", (req, res, ctx) => {
    return res(
      ctx.json({
        slip: { id: 107, advice: "YOLO" },
      })
    );
  })
);

//INNAN alla tester säger vi åt servern att lyssna
//beforeAll() är en hook som ingår i jest
beforeAll(() => server.listen());

//EFTER alla tester säger vi åt servern att stänga ner sig
afterAll(() => server.close());

test("should generate a quote", async () => {
  render(<App />);
  //Väntar på att loading försvinner
  await waitFor(() =>
    expect(screen.queryByText("Loading..")).not.toBeInTheDocument()
  );
  //Kollar att YOLO faktiskt finns i dokumentet
  expect(screen.getByText('"YOLO"')).toBeInTheDocument();
});
