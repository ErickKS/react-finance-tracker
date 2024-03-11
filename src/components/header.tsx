import { NewTransactionModal } from "./new-transaction-modal";
import logo from "../assets/logo.svg";

export function Header() {
  return (
    <header className="bg-gray-900 pt-10 pb-28">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-5">
        <img src={logo} alt="" />

        <NewTransactionModal />
      </div>
    </header>
  );
}
