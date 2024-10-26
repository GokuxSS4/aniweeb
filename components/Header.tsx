export function Header({ title }: { title: string }) {
  return (
    <div className="flex gap-2 items-stretch my-10">
      <div className="w-2 bg-purple-500 rounded-full"></div>
      <p className="text-2xl  font-bold">{title}</p>
    </div>
  );
}
