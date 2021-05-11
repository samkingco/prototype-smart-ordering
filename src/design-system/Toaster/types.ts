export type Callback = (id: string) => void;

export type Action = {
  label: string;
  onClick: () => void;
};
