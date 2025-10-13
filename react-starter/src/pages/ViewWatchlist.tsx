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
} from "@/components/ui/alert-dialog";
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
import { Watchlist } from "../model/Watchlist";
import { CircleCheckIcon } from "lucide-react";
import { useState } from "react";
import { access } from "fs";
import { useOutletContext } from "react-router";
import { useParams } from "react-router";
import { Badge } from "../components/ui/badge";
import { Alert, AlertTitle } from "../components/ui/alert";

type PropsType = { watchlist: Watchlist };
function ViewCart() {
  const { watchlist } = useOutletContext<PropsType>();
  const { uuid } = useParams();

  return (
    <>
      <Card className="w-full p-3">
        {cardHead}
        <CardContent>
            {isNewSalad && (
              <Alert>
              <CircleCheckIcon className="h-5 w-5 text-green-600" />
              <AlertTitle>
                En ny sallad har lagts till i varukorgen.
              </AlertTitle>
              </Alert>
            )}

          <Table>
            {tableHead}
            <TableBody>
              {watchlist.map((movie) => (
                <TableRow key={movie.uuid}>
                  <TableCell className="font-normal">
                    {Object.keys(movie.ingredients).join(", ")}
                  </TableCell>

                  <TableCell className="font-normal text-right tabular-nums">
                    {}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Totalt</TableCell>
                <TableCell className="text-right tabular-nums">
                  {cart.reduce((acc, current) => acc + current.price(), 0) +
                    " kr"}
                </TableCell>
              </TableRow>
            </TableFooter>

          </Table>
        </CardContent>
      </Card>
    </>
  );
}

/*
 * static content, rendered when the file is loaded.
 */
const orderButton = (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button>Skicka beställningen</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Under utveckling</AlertDialogTitle>
        <AlertDialogDescription>
          Denna funktion implementeras under labb 4.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
const tableHead = (
  <TableHeader>
    <TableRow>
      <TableHead className="font-semibold">Movies</TableHead>
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
export default ViewCart;
