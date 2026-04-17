import { QueryProvider } from "@app/providers/QueryProvider";
import { AppRouter } from "@app/router/AppRouter";
import { formatPhone } from "../utilities/formatPhone";

console.log("Test 1:", formatPhone("89991234567"));
console.log("Test 2:", formatPhone("+7 (999) 1234567"));
console.log("Test 3:", formatPhone("7-999-123-45-67"));
console.log("Test 4:", formatPhone("9991234567"));
console.log("Test 5:", formatPhone("abcg"));
export const App = () => {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
};
