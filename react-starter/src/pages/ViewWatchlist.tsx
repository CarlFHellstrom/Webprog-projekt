import { Button } from "../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

import {
  Card,
  CardAction,
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
//import { Watchlist } from "../model/Watchlist";
import { CircleCheckIcon } from "lucide-react";
import { useState } from "react";
import { access } from "fs";
import { useOutletContext } from "react-router";
import { useParams } from "react-router";
import { Badge } from "../components/ui/badge";
import { Alert, AlertTitle } from "../components/ui/alert";
import { searchMedia, getById, type MediaType, type SearchItem, type FullItem } from "../lib/omdb";
import { Media } from '../lib/media'

type PropsType = { watchlist: Media[] };

function ViewWatchlist() {
  const { watchlist } = useOutletContext<PropsType>();
  const { uuid } = useParams();

  return (
    <>
      <Card className="w-full p-3">
        {cardHead}
        <CardContent>
          <Table>
            {tableHead}
            <TableBody>
             { watchlist.map((movie) => (
                <TableRow key={movie.title}>
                  <TableCell className="font-normal">
                    movie.title
                  </TableCell>

                  <TableCell className="font-normal">
                    movie.genre
                  </TableCell>

                  <TableCell className="font-normal">
                    movie.runtime
                  </TableCell>

                  <TableCell className="font-normal">
                    movie.rated
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

/*
 * static content, rendered when the file is loaded.
 */

const tableHead = (
  <TableHeader>
    <TableRow>
      <TableHead className="font-semibold">Movies</TableHead>
      <TableHead className="font-semibold text-center">Genre</TableHead>
      <TableHead className="font-semibold text-center">Runtime</TableHead>
      <TableHead className="font-semibold text-center">Rating</TableHead>
    </TableRow>
  </TableHeader>
);
const cardHead = (
  <CardHeader>
    <CardTitle>Watchlist</CardTitle>
    <CardDescription>Här är alla filmer.</CardDescription>
  </CardHeader>
);


export default ViewWatchlist;
