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
import { Alert, AlertTitle } from "../components/ui/alert";

//type PropsType = { watchlist: Watchlist };
function ViewWatchlist() {
  //const { watchlist } = useOutletContext<PropsType>();
  const { uuid } = useParams();

  return (
    <>
      <Card className="w-full p-3">
        {cardHead}
        <CardContent>
          <Table>
            {tableHead}
            <TableBody>
                <TableRow key={1}>
                  <TableCell className="font-normal">
                    hej
                  </TableCell>
                </TableRow>
                <TableRow key={2}>
                  <TableCell className="font-normal">
                    <span>hej2</span>
                  </TableCell>
                </TableRow>
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


export default ViewWatchlist;
