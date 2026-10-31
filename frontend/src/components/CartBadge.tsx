export default function CartBadge({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <span
      aria-hidden="true"
      className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E8B230] px-1 text-xs font-bold text-[#14201B]"
    >
      {count}
    </span>
  );
}
