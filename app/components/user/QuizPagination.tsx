import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface QuizPaginationProps {
  visibleQuestion: number;
  onNextButtonClick: () => void;
  onPreviousButtonClick: () => void;
  onCustomQuestionPageLink: (value: number) => void;
}

export default function QuizPagination({
  visibleQuestion,
  onNextButtonClick,
  onPreviousButtonClick,
  onCustomQuestionPageLink,
}: QuizPaginationProps) {
  return (
    <Pagination>
      <PaginationContent className="cursor-pointer">
        <PaginationItem className={visibleQuestion === 1 ? `opacity-25` : ""}>
          <PaginationPrevious onClick={onPreviousButtonClick} />
        </PaginationItem>
        <PaginationItem
          className={visibleQuestion === 1 ? `border-2 rounded-lg` : ""}
        >
          <PaginationLink onClick={() => onCustomQuestionPageLink(1)}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={visibleQuestion === 2 ? `border-2 rounded-lg` : ""}
        >
          <PaginationLink onClick={() => onCustomQuestionPageLink(2)}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={visibleQuestion === 3 ? `border-2 rounded-lg` : ""}
        >
          <PaginationLink onClick={() => onCustomQuestionPageLink(3)}>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={visibleQuestion === 4 ? `border-2 rounded-lg` : ""}
        >
          <PaginationLink onClick={() => onCustomQuestionPageLink(4)}>
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={visibleQuestion === 5 ? `border-2 rounded-lg` : ""}
        >
          <PaginationLink onClick={() => onCustomQuestionPageLink(5)}>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={visibleQuestion === 6 ? `border-2 rounded-lg` : ""}
        >
          <PaginationLink onClick={() => onCustomQuestionPageLink(6)}>
            6
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={visibleQuestion === 7 ? `border-2 rounded-lg` : ""}
        >
          <PaginationLink onClick={() => onCustomQuestionPageLink(7)}>
            7
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={visibleQuestion === 8 ? `border-2 rounded-lg` : ""}
        >
          <PaginationLink onClick={() => onCustomQuestionPageLink(8)}>
            8
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={visibleQuestion === 9 ? `border-2 rounded-lg` : ""}
        >
          <PaginationLink onClick={() => onCustomQuestionPageLink(9)}>
            9
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={visibleQuestion === 9 ? `opacity-25` : ""}>
          <PaginationNext onClick={onNextButtonClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
