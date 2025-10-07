import { Table } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

function Watchlist() {
    return (
        <>
            <Card className="w-full p-3 text-foreground">
                {cardHead}
                <CardContent>
                    <Table>
                        {tableHead}
                        <TableBody>
                            <TableRow key="movie">
                                <TableCell className="font-normal">
                                    Harry Potter
                                </TableCell>
                                <TableCell>
                                    2001
                                </TableCell>
                                <TableCell>
                                    10000000
                                </TableCell>
                            </TableRow>
                            <TableRow key="movie">
                                <TableCell className="font-normal">
                                    Harry Potter
                                </TableCell>
                                <TableCell>
                                    2001
                                </TableCell>
                                <TableCell>
                                    10000000
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}

/*static content*/

const cardHead = (
  <CardHeader>
    <CardTitle>Watchlist</CardTitle>
    <CardDescription>Here is movies.</CardDescription>
    <CardAction></CardAction>
  </CardHeader>
);

const tableHead = (
  <TableHeader>
    <TableRow>
      <TableHead className="font-semibold">Title</TableHead>
      <TableHead className="font-semibold text-center">Year</TableHead>
      <TableHead className="font-semibold text-center">Rating</TableHead>
    </TableRow>
  </TableHeader>
);

export default Watchlist;