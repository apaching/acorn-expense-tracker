"use client";

import useSWR from "swr";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationEllipsis,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AddModal } from "./add-modal";
import { Transaction } from "@/types/types";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

interface Props {
  userId: string;
}

function TransactionHistory({ userId }: Props) {
  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading, mutate } = useSWR(
    userId
      ? `/api/transactions?userId=${userId}&page=${page}&limit=${ITEMS_PER_PAGE}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (data?.total) {
      const pages = Math.ceil(data.total / ITEMS_PER_PAGE);
      setTotalPages(pages);
    }
  }, [data]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between">
            <span>Transaction History</span>
            <AddModal onAdd={mutate} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Details</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex flex-col space-y-1.5">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-2 w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : (data?.transactions ?? []).map((transaction: Transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {transaction.category}
                        </span>
                        <span
                          className={`text-xs ${
                            transaction.type === "incoming"
                              ? "text-chart-incoming"
                              : "text-chart-outgoing"
                          }`}
                        >
                          {capitalizeFirstLetter(transaction.type)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      {transaction.note ? transaction.note : "No notes"}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: 3 }).map((_, i) => {
            const startPage = Math.max(Math.min(page - 1, totalPages - 2), 1);
            const pageNumber = startPage + i;

            if (pageNumber > totalPages) return null;

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={page === pageNumber}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {page + 1 < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
}

export { TransactionHistory };
