export type ReleaseProps = {
  id: string | number;
  title: string;
  value: number;
  type: "in" | "out";
  category: string;
}