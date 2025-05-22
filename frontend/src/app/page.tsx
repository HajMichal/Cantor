import { CurrentExchangeRate } from "./components/CurrentExchangeRate";
import { Footer } from "./components/Footer";
import { TransactionForm } from "./components/TransactionForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <CurrentExchangeRate />

        <TransactionForm />

        <Footer />
      </div>
    </div>
  );
}
