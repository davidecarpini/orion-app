import { FC, ReactElement } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

/**
 * Empty list reusable component
 */
const EmptyList: FC = (): ReactElement => {
  return <Container>No items found 😢</Container>;
};

EmptyList.displayName = "EmptyList";

export { EmptyList };
