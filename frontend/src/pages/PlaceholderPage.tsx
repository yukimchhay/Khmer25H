import { Link } from "react-router-dom";

type Props = {
  title: string;
  message?: string;
};

export default function PlaceholderPage({
  title,
  message = "This page isn't built yet.",
}: Props) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="mt-3 text-[#14201B]/70">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-block font-medium underline underline-offset-4"
      >
        Back to the shop
      </Link>
    </section>
  );
}
