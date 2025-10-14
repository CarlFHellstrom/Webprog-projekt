import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useState } from "react";
import { useWatchlist } from "@/state/watchlist";
import { Badge } from "@/components/ui/badge";
import { getById, type FullItem } from "@/lib/omdb";

function ViewWatchlist() {

  const { items, remove } = useWatchlist();

  return (
    <Card className="w-full p-3">
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
        <CardDescription>Här är alla filmer.</CardDescription>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your watchlist is empty.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold text-center">Year</TableHead>
                <TableHead className="font-semibold text-center">Type</TableHead>
                <TableHead className="font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((movie) => (
                <ExpandableRow
                  key={movie.imdbID}
                  imdbID={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  type={movie.Type}
                  onRemove={() => remove(movie.imdbID)}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4} className="text-right text-sm">
                  Total: {items.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function ExpandableRow({
  imdbID,
  title,
  year,
  type,
  onRemove,
}: {
  imdbID: string;
  title: string;
  year: string;
  type: string;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [details, setDetails] = useState<FullItem | null>(null);

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
      const data = await getById(imdbID);
      setDetails(data);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load details.");
    } finally {
      setLoading(false);
    }
  }
return (
    <>
      <TableRow>
        <TableCell className="font-medium">{title}</TableCell>
        <TableCell className="text-center">{year}</TableCell>
        <TableCell className="text-center">
          <Badge variant="secondary">{type}</Badge>
        </TableCell>
        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={toggle}>
              {open ? "Hide" : "Show more"}
            </Button>
            <Button variant="destructive" size="sm" onClick={onRemove}>
              Remove
            </Button>
          </div>
        </TableCell>
      </TableRow>
{open && (
        <TableRow>
          <TableCell colSpan={4}>
            <div className="text-sm space-y-2 break-words overflow-hidden">
              {loading && <p>Loading details…</p>}
              {err && <p className="text-red-600">{err}</p>}

              {details && !loading && !err && (
                <div className="flex flex-col gap-2 text-sm leading-relaxed">
                  {details.Plot && (
                    <p className="whitespace-normal break-words text-gray-700">
                      {details.Plot}
                    </p>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
                    {details.Genre && (
                      <div>
                        <span className="font-medium">Genre:</span> {details.Genre}
                      </div>
                    )}
                    {details.Runtime && (
                      <div>
                        <span className="font-medium">Runtime:</span> {details.Runtime}
                      </div>
                    )}
                    {details.Released && (
                      <div>
                        <span className="font-medium">Released:</span> {details.Released}
                      </div>
                    )}
                    {details.Director && (
                      <div>
                        <span className="font-medium">Director:</span> {details.Director}
                      </div>
                    )}
                    {details.Actors && (
                      <div className="col-span-2 sm:col-span-3">
                        <span className="font-medium">Actors:</span> {details.Actors}
                      </div>
                    )}
                    {details.imdbRating && (
                      <div>
                        <span className="font-medium">IMDb:</span> {details.imdbRating} ({details.imdbVotes} votes)
                      </div>
                    )}
                    {details.Awards && (
                      <div className="col-span-2 sm:col-span-3">
                        <span className="font-medium">Awards:</span> {details.Awards}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default ViewWatchlist;
