import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  return (
    <Pagination>
      <PaginationContent className="cursor-pointer text-white">
        <PaginationItem className={visibleQuestion === 1 ? `opacity-25` : ""}>
          <PaginationPrevious onClick={onPreviousButtonClick} />
        </PaginationItem>
        {Array.from({ length: noOfQuestions }, (_, i) => i).map(
          (e: number, i) => (
            <PaginationItem
              key={i}
              className={visibleQuestion === 1 ? `border-2 rounded-lg` : ""}
            >
              <PaginationLink onClick={() => onCustomQuestionPageLink(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem className={visibleQuestion === 9 ? `opacity-25` : ""}>
          <PaginationNext onClick={onNextButtonClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
