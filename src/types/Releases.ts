export type DateProps = {
  month: string;
  year: number;
};

export interface ReleaseProps {
  id: string;
  title: string;
  value: number;
  type: "in" | "out";
  category: string;
}

export interface EditableReleaseProps extends ReleaseProps {
  editable: boolean;
}

export interface VariableReleaseProps extends ReleaseProps {
  month: string;
  year: number;
}
