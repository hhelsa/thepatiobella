import Link from "next/link";

/** Holding page until the art direction stage. */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-4xl font-semibold">The Patio Bella</h1>
      <p className="max-w-md opacity-70">
        Website in progress. The animation foundation can be previewed in the
        motion lab.
      </p>
      <Link href="/motion-lab" className="underline underline-offset-4">
        Open motion lab
      </Link>
    </main>
  );
}
