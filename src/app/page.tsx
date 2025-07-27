import { supabase } from "../lib/supabaseClient";

export default async function Home() {
  // Quick “ping” – proves Supabase keys work
  const { data: serverTime } = await supabase.rpc("now");
  console.log("Supabase time:", serverTime);

  // Sample museum call (Met API)
  const res = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/436121",
    { next: { revalidate: 60 * 60 * 24 } } // cache 24 h
  );
  const art = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-serif mb-4">{art.title}</h1>
      <p className="mb-6 italic">by {art.artistDisplayName}</p>
      <img
        src={art.primaryImageSmall}
        alt={art.title}
        className="w-80 rounded-xl shadow-lg"
      />
    </main>
  );
}