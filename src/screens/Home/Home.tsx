import { FC, ReactElement } from "react";
import {
  Container,
  Title,
  LikeToggle,
  Header,
  SpinnerContainer,
  CardsContainer,
  JokeSetup,
  JokePunchline,
  JokeActions,
  ErrorContainer,
} from "./styles";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import Toggle from "react-toggle";
import Loader from "react-loader-spinner";
import { Card, Spacer, EmptyList } from "../../components";
import { Joke, JokeStatus } from "../../types";
import { useHome } from "./useHome";

/**
 * Main home screen that display a list of jokes
 */

const Home: FC = (): ReactElement => {
  const {
    likeOnly,
    likes,
    isLoading,
    jokes,
    handleSetLikeOnly,
    handleLikes,
    filteredJokes,
    isError,
  } = useHome();

  if (isError) {
    return (
      <ErrorContainer>
        Error retrieving jokes 🥵 Please check you connection!
      </ErrorContainer>
    );
  }

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Loader type="ThreeDots" color="#00BFFF" />
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Jokes List</Title>
        <LikeToggle>
          <AiOutlineLike style={{ marginRight: "10px" }} />
          <Toggle
            icons={false}
            checked={likeOnly}
            onChange={handleSetLikeOnly}
          />
        </LikeToggle>
      </Header>
      <CardsContainer>
        {((likeOnly && filteredJokes.length === 0) ||
          (!likeOnly && jokes.length === 0)) && <EmptyList />}
        {(likeOnly ? filteredJokes : jokes).map((joke: Joke) => (
          <Card key={joke.id}>
            <JokeSetup>{joke.setup}</JokeSetup>
            <JokePunchline>{joke.punchline}</JokePunchline>
            <JokeActions>
              {likes[joke.id] === JokeStatus.LIKE ? (
                <AiFillLike onClick={handleLikes(joke.id, undefined)} />
              ) : (
                <AiOutlineLike
                  onClick={handleLikes(joke.id, JokeStatus.LIKE)}
                />
              )}
              <Spacer width="10px" />
              {likes[joke.id] === JokeStatus.DISLIKE ? (
                <AiFillDislike onClick={handleLikes(joke.id, undefined)} />
              ) : (
                <AiOutlineDislike
                  onClick={handleLikes(joke.id, JokeStatus.DISLIKE)}
                />
              )}
            </JokeActions>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
};

Home.displayName = "Home";

export default Home;
