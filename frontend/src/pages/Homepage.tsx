
import { useState } from "react";
import Mug from "../components/Mug";
import { useCart } from "../context/CartContext";
import {
  DEFAULT_SIZE_ID,
  GLAZES,
  SIZES,
  getGlaze,
  getSize,
  money,
} from "../data/products";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export default function HomePage() {
  const { addItem, stockLeft } = useCart();
  const [glazeId, setGlazeId] = useState(GLAZES[0].id);
  const [sizeId, setSizeId] = useState(DEFAULT_SIZE_ID);

  const glaze = getGlaze(glazeId);
  const size = getSize(sizeId);
  const remaining = stockLeft(glaze.id);
  const soldOut = remaining <= 0;

  return (
    <div style={{ ["--accent" as string]: glaze.hex }}>
      {/* Hero configurator */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 pt-6 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Pick a glaze. We fire it on Friday.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#14201B]/75">
            The Everyday Mug is thrown by hand in small batches. Choose your
            glaze and size, and it ships the week it comes out of the kiln.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <p id="glaze-label" className="mb-2 text-sm font-semibold">
                Glaze: {glaze.name}
              </p>
              <div
                role="radiogroup"
                aria-labelledby="glaze-label"
                className="flex gap-3"
              >
                {GLAZES.map((g) => (
                  <button
                    key={g.id}
                    role="radio"
                    aria-checked={g.id === glazeId}
                    aria-label={`${g.name}, ${stockLeft(g.id)} left`}
                    onClick={() => setGlazeId(g.id)}
                    className={`h-10 w-10 rounded-full border-2 border-white ring-2 ${focus} ${
                      g.id === glazeId ? "ring-[#14201B]" : "ring-transparent"
                    } ${stockLeft(g.id) <= 0 ? "opacity-40" : ""}`}
                    style={{ backgroundColor: g.hex }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p id="size-label" className="mb-2 text-sm font-semibold">
                Size
              </p>
              <div
                role="radiogroup"
                aria-labelledby="size-label"
                className="flex gap-2"
              >
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    role="radio"
                    aria-checked={s.id === sizeId}
                    onClick={() => setSizeId(s.id)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium ${focus} ${
                      s.id === sizeId
                        ? "border-[#14201B] bg-[#14201B] text-white"
                        : "border-[#14201B]/25"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <p className="font-display text-4xl font-bold">
              {money(size.price)}
            </p>
            <button
              onClick={() => addItem(glaze.id, size.id)}
              disabled={soldOut}
              className={`rounded-full px-7 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${focus}`}
              style={{ backgroundColor: glaze.hex, color: glaze.ink }}
            >
              {soldOut ? `${glaze.name} is sold out` : "Add to cart"}
            </button>
          </div>
          <p className="mt-3 text-sm text-[#14201B]/65">
            {soldOut
              ? "Pick another glaze or check back after the next firing."
              : `${remaining} of ${glaze.stock} left in this batch.`}
          </p>
        </div>

        <div
          className="flex items-center justify-center rounded-[2rem] p-8 transition-colors duration-500 motion-reduce:transition-none sm:p-12"
          style={{
            backgroundColor: `color-mix(in oklab, ${glaze.hex} 18%, #EEF1EC)`,
          }}
        >
          <Mug color={glaze.hex} scale={size.scale} />
        </div>
      </section>


      <section
        id="batch"
        className="scroll-mt-16 border-t border-[#14201B]/15 bg-white/60"
      >
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            What's left in this batch
          </h2>
          <p className="mt-2 max-w-lg text-[#14201B]/70">
            Each glaze is fired once a week in a fixed run. When a bar empties,
            that glaze waits for the next firing.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {GLAZES.map((g) => {
              const left = stockLeft(g.id);
              return (
                <li key={g.id}>
                  <button
                    onClick={() => {
                      setGlazeId(g.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-full rounded-xl border border-[#14201B]/15 bg-white p-4 text-left ${focus}`}
                  >
                    <span className="flex items-center justify-between font-medium">
                      <span className="flex items-center gap-3">
                        <span
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: g.hex }}
                        />
                        {g.name}
                      </span>
                      <span className="text-sm text-[#14201B]/65">
                        {left === 0 ? "Sold out" : `${left} of ${g.stock} left`}
                      </span>
                    </span>
                    <span className="mt-3 block h-2 overflow-hidden rounded-full bg-[#14201B]/10">
                      <span
                        className="block h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
                        style={{
                          width: `${(left / g.stock) * 100}%`,
                          backgroundColor: g.hex,
                        }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
