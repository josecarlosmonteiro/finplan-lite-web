import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <Link href={'/lancamentos/fixos'}>Lançamentos fixos</Link>
    </main>
  );
}
