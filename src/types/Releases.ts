export interface ReleaseProps {
  id: string;
  title: string;
  value: number;
  type: "in" | "out";
  category: string;
}

export interface VariableReleaseProps extends ReleaseProps {
  releaseDate: Date;
}

export interface VariableReleasesApiProps {
  releases: VariableReleaseProps[];
  month: string;
  year: number;
}
