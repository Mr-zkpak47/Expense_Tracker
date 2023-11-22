import "./App.css";
import Child from "./child";
import { TransactionProvider } from "./transContext";

function App() {
  return (
    <section className="mb-12">
      <TransactionProvider>
        <Child />
      </TransactionProvider>
    </section>
  );
}

export default App;
