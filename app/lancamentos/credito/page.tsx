import { CreditCardPresentationTable } from "@/src/components/Releases/CreditCard/CreditCardPresentationTable";
import { Typography } from "@/src/components/shared/Typography";

export default async function CreditCardPage() {
  return (
    <main className="p-4 w-[80vw] mx-auto mt-8 rounded bg-gray-50">
      <Typography.Title>Cartões de Crédito</Typography.Title>
      <br />
      <CreditCardPresentationTable />
    </main>
  )
}