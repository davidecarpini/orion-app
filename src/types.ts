export type Joke = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

export enum JokeStatus {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}
