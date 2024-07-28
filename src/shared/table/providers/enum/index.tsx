interface IBooleanFormatterProps {
  value: string;
}

export const EnumFormatter = ({ value }: IBooleanFormatterProps) => {
  return <span className="d-flex w-100 text-align-left">{value}</span>;
};
