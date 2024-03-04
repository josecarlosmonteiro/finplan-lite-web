import Link from "next/link";
import { Typography } from "./Typography";

const links: { label: string; href: string }[] = [
  { href: '/lancamentos/fixos', label: 'Lançamentos Fixos' },
];

export function Navbar() {
  return (
    <nav className="p-4 px-20 bg-blue-400 text-white flex justify-between items-center">
      <Link href={'/'}>
      <Typography.Subtitle>FinPlan Lite</Typography.Subtitle>
      </Link>

      <div className="flex gap-4 justify-end">
        {
          links.map((el, index) => (
            <Link key={index} href={el.href}>
              {el.label}
            </Link>
          ))
        }
      </div>
    </nav>
  )
}