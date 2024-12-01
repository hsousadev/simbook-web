import { Book } from "@/pages";
import { BookItem } from "./book-item";

interface BooksSectionProps {
  sectionTitle: string;
  books: Book[];
}

export function BooksSection({ sectionTitle, books }: BooksSectionProps) {
  return (
    <div className="flex flex-col gap-6 md:min-w-[1260px]">
      <h4 className="text-sm font-bold ml-8">{sectionTitle}</h4>

      <div className="flex flex-wrap p-8 items-start justify-center sm:justify-start md:flex md:flex-row md:justify-start gap-9 max-w-screen-xl w-full">
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}

export default BooksSection;
