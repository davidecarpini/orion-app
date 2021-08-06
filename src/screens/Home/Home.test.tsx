import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { enableFetchMocks, MockResponseInit } from "jest-fetch-mock";
import { JOKES_URL } from "../../constants";
import { getTestWrapper } from "../../utils";
import Home from "./Home";
import { useHome } from "./useHome";

const jokesMock = [
  {
    id: 162,
    type: "general",
    setup: "What did Michael Jackson name his denim store?",
    punchline: "   Billy Jeans!",
  },
  {
    id: 192,
    type: "general",
    setup: "What did the pirate say on his 80th birthday?",
    punchline: "Aye Matey!",
  },
];

describe("Home", () => {
  beforeEach(() => {
    enableFetchMocks();
    fetchMock.mockIf(
      JOKES_URL,
      async (): Promise<MockResponseInit | string> => {
        return {
          status: 200,
          body: JSON.stringify(jokesMock),
        };
      }
    );
  });
  it("should be render Home correctly", async () => {
    const wrapper = getTestWrapper();
    const hook = renderHook(useHome, { wrapper });
    await hook.waitFor(() => !hook.result.current.isLoading);
    render(<Home />, { wrapper });
    const text = screen.getByText(/Jokes List/i);
    expect(text).toBeInTheDocument();
  });
});
