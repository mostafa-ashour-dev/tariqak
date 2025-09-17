type Props = {
  children: React.ReactNode;
  index: number
};

export default function FeaturePart({ children, index }: Props) {

  const isEven = index % 2 === 0;
  return <div className={`flex items-center justify-between gap-[2rem] w-full ${isEven ? "flex-row-reverse" : ""}`}>{children}</div>;
}
