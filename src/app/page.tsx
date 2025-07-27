// src/app/page.tsx
export default async function Home() {
  // Fetch Van Gogh “Wheat Field with Cypresses” from The Met’s public API
  const res = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/436121",
    { next: { revalidate: 86400 } }   // cache for 24 h on Vercel
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
