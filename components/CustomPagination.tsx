import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

function CustomPagination({
    currentPage,
    totalPages,

    goToPage,
}) {
    return (
        <div>
            <Pagination>
                <PaginationContent >
                    {currentPage > 1 && (
                        <PaginationItem className="cursor-pointer">
                            <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
                        </PaginationItem>
                    )}
                    {[...Array(totalPages).keys()].map((page) => (
                        <PaginationItem key={page} className="cursor-pointer">
                            <PaginationLink
                                onClick={() => goToPage(page + 1)}
                                isActive={currentPage == page + 1}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {currentPage < totalPages && (
                        <PaginationItem className="cursor-pointer">
                            <PaginationNext onClick={() => goToPage(currentPage + 1)} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default CustomPagination;
