import { useState } from "react";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { JOKES_KEY, JOKES_URL } from "../../constants";
import { Joke, JokeStatus } from "../../types";
import { useMemo } from "react";

/**
 * UI logic for the Home component
 */

export const useHome = () => {
  const [likeOnly, setLikeOnly] = useState(false);
  const [likes, setLikes] = useState<{ [key: string]: string }>({});
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: jokes,
  } = useQuery(JOKES_KEY, () => fetch(JOKES_URL).then((res) => res.json()));

  const handleSetLikeOnly = useCallback(
    (e) => {
      setLikeOnly(e.target.checked);
    },
    [setLikeOnly]
  );

  const handleLikes = useCallback(
    (id, status) => () => {
      setLikes((s) => ({
        ...s,
        [id]: status,
      }));
    },
    [setLikes]
  );

  const filteredJokes = useMemo(
    () => jokes?.filter((joke: Joke) => likes[joke.id] === JokeStatus.LIKE),
    [likes, jokes]
  );

  return {
    likeOnly,
    setLikeOnly,
    likes,
    setLikes,
    isLoading,
    isSuccess,
    isError,
    jokes,
    error,
    handleSetLikeOnly,
    handleLikes,
    filteredJokes,
  };
};
