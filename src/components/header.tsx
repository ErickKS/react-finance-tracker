import { NewTransactionModal } from "./new-transaction-modal";
import logo from "../assets/logo.svg";

export function Header() {
  return (
    <header className="flex justify-between items-center gap-2 max-w-5xl mx-auto px-5 pt-10">
      <img src={logo} alt="" />

      <NewTransactionModal />
    </header>
  );
}
