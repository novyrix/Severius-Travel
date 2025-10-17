'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const pages = [];
  const maxVisiblePages = 5;

  // Calculate which pages to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const buttonClass = (isActive = false, isDisabled = false) =>
    `p-2 rounded-lg transition-all ${
      isDisabled
        ? 'text-gray-400 cursor-not-allowed opacity-50'
        : isActive
        ? 'bg-gradient-to-r from-[rgb(var(--color-gold))] to-[rgb(var(--color-brown))] text-white shadow-md'
        : 'text-gray-700 hover:bg-amber-100 hover:scale-105'
    }`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Info */}
      {totalItems !== undefined && itemsPerPage !== undefined && (
        <div className="text-sm text-gray-600">
          Showing{' '}
          <span className="font-semibold text-[rgb(var(--color-brown))]">
            {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-[rgb(var(--color-brown))]">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-[rgb(var(--color-brown))]">
            {totalItems}
          </span>{' '}
          results
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* First Page */}
        <motion.button
          whileHover={{ scale: currentPage === 1 ? 1 : 1.1 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={buttonClass(false, currentPage === 1)}
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </motion.button>

        {/* Previous Page */}
        <motion.button
          whileHover={{ scale: currentPage === 1 ? 1 : 1.1 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonClass(false, currentPage === 1)}
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {/* Page Numbers */}
        {startPage > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(1)}
              className={buttonClass()}
            >
              1
            </motion.button>
            {startPage > 2 && (
              <span className="text-gray-400 px-1">...</span>
            )}
          </>
        )}

        {pages.map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: page === currentPage ? 1 : 1.1 }}
            whileTap={{ scale: page === currentPage ? 1 : 0.95 }}
            onClick={() => onPageChange(page)}
            className={buttonClass(page === currentPage)}
          >
            {page}
          </motion.button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="text-gray-400 px-1">...</span>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(totalPages)}
              className={buttonClass()}
            >
              {totalPages}
            </motion.button>
          </>
        )}

        {/* Next Page */}
        <motion.button
          whileHover={{ scale: currentPage === totalPages ? 1 : 1.1 }}
          whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={buttonClass(false, currentPage === totalPages)}
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>

        {/* Last Page */}
        <motion.button
          whileHover={{ scale: currentPage === totalPages ? 1 : 1.1 }}
          whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={buttonClass(false, currentPage === totalPages)}
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
