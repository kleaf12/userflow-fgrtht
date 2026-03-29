import { QueryProvider } from "@app/providers/QueryProvider";
import { AppRouter } from "@app/router/AppRouter";

export const App = () => {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
};
