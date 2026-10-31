
export default function Footer() {
  return (
    <footer className="border-t border-[#14201B]/15 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row">
        <p className="text-center text-sm text-[#14201B]/65">
          &copy; {new Date().getFullYear()} Khmer25H. Made by hand in small
          batches. Free shipping over $60.
        </p>


      </div>
    </footer>
  );
}
