import { QueryProvider } from "@app/providers/QueryProvider";
import { AppRouter } from "@app/router/AppRouter";

//import { PhoneFormatterDemo } from "@widgets/PhoneFormatterDemo/PhoneFormatterDemo";

export const App = () => {
  return (
    <QueryProvider>
      {/* <PhoneFormatterDemo /> */}
      <AppRouter />
    </QueryProvider>
  );
};
