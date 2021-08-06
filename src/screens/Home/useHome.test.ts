import { useHome } from "./useHome";
import { act, renderHook } from "@testing-library/react-hooks";
import { JokeStatus } from "../../types";
import { getTestWrapper } from "../../utils";
import { JOKES_URL } from "../../constants";
import fetchMock, { MockResponseInit, enableFetchMocks } from "jest-fetch-mock";

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

describe("useHome", () => {
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
  describe("handleSetLikeOnly", () => {
    it("should toggle correctly the likeOnly variable", () => {
      const wrapper = getTestWrapper();
      const hook = renderHook(useHome, { wrapper });
      expect(hook.result.current.likeOnly).toBe(false);
      act(() =>
        hook.result.current.handleSetLikeOnly({ target: { checked: true } })
      );
      expect(hook.result.current.likeOnly).toBe(true);
      act(() =>
        hook.result.current.handleSetLikeOnly({ target: { checked: false } })
      );
      expect(hook.result.current.likeOnly).toBe(false);
    });
  });
  describe("handleLikes", () => {
    it("should add items to likes object", () => {
      const wrapper = getTestWrapper();
      const hook = renderHook(useHome, { wrapper });
      expect(hook.result.current.likes).toEqual({});
      act(() => hook.result.current.handleLikes("0", JokeStatus.LIKE)());
      expect(hook.result.current.likes).toEqual({
        "0": JokeStatus.LIKE,
      });
      act(() => hook.result.current.handleLikes("0", JokeStatus.DISLIKE)());
      expect(hook.result.current.likes).toEqual({
        "0": JokeStatus.DISLIKE,
      });
      act(() => hook.result.current.handleLikes("0", undefined)());
      expect(hook.result.current.likes).toEqual({
        "0": undefined,
      });
      act(() => hook.result.current.handleLikes("0", JokeStatus.LIKE)());
      act(() => hook.result.current.handleLikes("1", JokeStatus.DISLIKE)());
      expect(hook.result.current.likes).toEqual({
        "0": JokeStatus.LIKE,
        "1": JokeStatus.DISLIKE,
      });
    });
  });
  describe("jokes fetch", () => {
    it("test success fetch", async () => {
      const wrapper = getTestWrapper();
      const hook = renderHook(useHome, { wrapper });
      await hook.waitFor(() => !hook.result.current.isLoading);
      expect(hook.result.current.jokes).toEqual(jokesMock);
    });
  });
});
