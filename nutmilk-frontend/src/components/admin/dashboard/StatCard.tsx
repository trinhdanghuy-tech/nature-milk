type Props = {
  title: string;
  value: number | string;
  color?: string;
};

export default function StatCard({ title, value, color = "green" }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold text-${color}-600`}>
        {value}
      </p>
    </div>
  );
}
