export function Header({ title }: { title: string }) {
  return (
    <div className="flex gap-2 items-stretch my-10 text-white">
      <div className="w-2 bg-primary rounded-full"></div>
      <p className="text-2xl  font-bold">{title}</p>
    </div>
  );
}
