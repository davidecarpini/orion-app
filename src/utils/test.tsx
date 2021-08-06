import { FC, ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { queryClient } from "../queryClient";

export const getTestWrapper = (): FC => {
  const wrapper: FC = ({ children }): ReactElement => (
    <QueryClientProvider client={queryClient}>
      <Router>{children}</Router>
    </QueryClientProvider>
  );
  return wrapper;
};
