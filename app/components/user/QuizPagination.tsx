import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect } from "react";

export interface QuizPaginationProps {
  noOfQuestions: number;
  visibleQuestion: number;
  onNextButtonClick: () => void;
  onPreviousButtonClick: () => void;
  onCustomQuestionPageLink: (value: number) => void;
}

export default function QuizPagination({
  noOfQuestions,
  visibleQuestion,
  onNextButtonClick,
  onPreviousButtonClick,
  onCustomQuestionPageLink,
}: QuizPaginationProps) {
  const onPaginationButtonClick = (
    indexValue: number,
    nextFunc: () => void
  ) => {
    if (indexValue === visibleQuestion) {
      return;
    } else {
      nextFunc();
    }
  };
  return (
    <Pagination>
      <PaginationContent className="cursor-pointer text-white flex-wrap">
        <PaginationItem className={visibleQuestion === 0 ? `opacity-25` : ""}>
          <PaginationPrevious
            onClick={() => onPaginationButtonClick(0, onPreviousButtonClick)}
          />
        </PaginationItem>
        {Array.from({ length: noOfQuestions + 1 }, (_, i) => i)
          .slice(1)
          .map((e: number, i) => (
            <PaginationItem
              key={e}
              className={visibleQuestion === i ? `border-2 rounded-lg` : ""}
            >
              <PaginationLink onClick={() => onCustomQuestionPageLink(e - 1)}>
                {e}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem
          className={visibleQuestion === noOfQuestions - 1 ? `opacity-25` : ""}
        >
          <PaginationNext
            onClick={() =>
              onPaginationButtonClick(noOfQuestions - 1, onNextButtonClick)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
