import styled from "styled-components";

/**
 * Spacer component
 */

type Props = {
  /**
   * width to separate two horizontal components
   */
  width?: string | number;

  /**
   * height to separate two vertical components
   */
  height?: string | number;
};

export const Spacer = styled.div<Props>`
  ${({ width }) => `width: ${width};`}
  ${({ height }) => `height: ${height};`}
`;
