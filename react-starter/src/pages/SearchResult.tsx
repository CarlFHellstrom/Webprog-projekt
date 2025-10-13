import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMedia, getById, type MediaType, type SearchItem, type FullItem } from "../lib/omdb";
import { Button } from "../components/ui/button";
import { useWatchlist } from "@/state/watchlist";

function SearchResults() {
    const [params, setParams] = useSearchParams();
    const query  = (params.get("query")  ?? "").trim();
    const year   = (params.get("year")   ?? "").trim();
    const imdbId = (params.get("imdbId") ?? "").trim();
    const type   = (params.get("type")   ?? "") as MediaType | "";
    const page   = Math.max(1, Math.min(100, Number(params.get("page") ?? "1")));

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [items, setItems] = useState<SearchItem[]>([]);
    const [single, setSingle] = useState<FullItem | null>(null);

    useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      setItems([]);
      setSingle(null);
      try {
        if (imdbId) {
          const data = await getById(imdbId);
          if (!cancelled) setSingle(data);
        } else {
          if (!query) { setError("Missing search query or IMDb ID."); return; }
          const res = await searchMedia({
            query,
            year: year || undefined,
            type: (type || undefined) as MediaType | undefined,
            page,
          });
          if (!cancelled) {
            if (res.Response === "False") {
              setError(res.Error ?? "No results.");
            } else {
              setItems(res.Search ?? []);
            }
          }
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? "Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [query, year, type, imdbId, page]);

  function setPage(next: number) {
    const nextParams = new URLSearchParams(params);
    nextParams.set("page", String(next));
    setParams(nextParams);
  }

  function ResultCard({ item }: { item: SearchItem }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [details, setDetails] = useState<FullItem | null>(null);

    const { has, add, remove } = useWatchlist();
    const saved = has(item.imdbID);

    async function toggle() {
        if (open) {
        setOpen(false);
        return;
        }
        setOpen(true);
        if (details) return;

        setLoading(true);
        setErr(null);
        try {
        const data = await getById(item.imdbID);
        setDetails(data);
        } catch (e: any) {
        setErr(e?.message ?? "Failed to load details.");
        } finally {
        setLoading(false);
        }
    }
        return (
      <li className="border rounded p-3">
        <p className="font-medium">
          {item.Title} ({item.Year}) — {item.Type}
        </p>

        <div className="mt-3 flex gap-2 flex-wrap">
          <Button
            variant={saved ? "destructive" : "default"}
            size="sm"
            onClick={() => {
              if (saved) {
                remove(item.imdbID);
              } else {
                add({
                  imdbID: item.imdbID,
                  Title: item.Title,
                  Year: item.Year,
                  Type: item.Type,
                });
              }
            }}
          >
            {saved ? "Remove from Watchlist" : "Add to Watchlist"}
          </Button>
          <Button variant="outline" size="sm" onClick={toggle} aria-expanded={open}>
            {open ? "Hide" : "Show more"}
          </Button>
        </div>

        {open && (
          <div className="mt-3">
            {loading && <p>Loading details…</p>}
            {err && <p className="text-red-600">{err}</p>}
            {details && !loading && !err && (
              <div className="text-sm space-y-2">
                {details.Plot && <p className="leading-relaxed">{details.Plot}</p>}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {details.Genre && <div><span className="font-medium">Genre:</span> {details.Genre}</div>}
                  {details.Runtime && <div><span className="font-medium">Runtime:</span> {details.Runtime}</div>}
                  {details.Released && <div><span className="font-medium">Released:</span> {details.Released}</div>}
                  {details.Director && <div><span className="font-medium">Director:</span> {details.Director}</div>}
                  {details.Actors && <div className="col-span-2"><span className="font-medium">Actors:</span> {details.Actors}</div>}
                  {details.imdbRating && <div><span className="font-medium">IMDb:</span> {details.imdbRating} ({details.imdbVotes} votes)</div>}
                  {details.Awards && <div className="col-span-2"><span className="font-medium">Awards:</span> {details.Awards}</div>}
                </div>
              </div>
            )}
          </div>
        )}
      </li>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Search results</h2>

      {loading && <p>Searching…</p>}
      {error && !loading && <p className="text-red-600">{error}</p>}

      {single && !loading && (
        <article className="border rounded p-3">
          <h3 className="font-medium">
            {single.Title} ({single.Year}) — {single.Type}
          </h3>
          <p className="text-sm mt-1">{single.Plot}</p>
        </article>
      )}

      {!single && !loading && items.length > 0 && (
        <>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((m) => (
              <ResultCard key={m.imdbID} item={m} />
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </Button>
            <span className="text-sm">Page {page}</span>
            <Button
              variant="outline"
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}



export default SearchResults;