"use client";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { borrowBook } from "@/lib/actions/book";

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      alert(message);

      setBorrowing(true);

      try {
        const result = await borrowBook({ bookId, userId });

        if (result.success) {
          alert("Book borrowed successfully");

          router.push("/my-profile");
        } else {
          alert("An error has occured while borrowing the book");
        }
      } catch (error) {
        alert(error);
      } finally {
        setBorrowing(false);
      }
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20}></Image>
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing" : "Borrow Book"}
      </p>
    </Button>
  );
};
export default BorrowBook;
