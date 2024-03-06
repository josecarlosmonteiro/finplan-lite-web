import { ReleaseProps } from "@/src/types/Releases";

export function getStyleByReleaseType(type: ReleaseProps["type"]) {
  const styles: Record<string, string> = {
    color: "text-gray-500",
    bg: "bg-white",
  };

  if (type === "in") {
    styles.color = "text-emerald-500";
    styles.bg = "text-emerald-500";
  }

  if (type === "out") {
    styles.color = "text-red-500";
    styles.bg = "text-red-500";
  }

  return styles;
}
