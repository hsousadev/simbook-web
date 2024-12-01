import { BookItem } from "./book-item";

interface BooksSectionProps {
  sectionTitle: string;
  // books: BookItem[];
}

export function BooksSection({ sectionTitle }: BooksSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-sm font-bold ml-4">{sectionTitle}</h4>

      <div className="flex flex-wrap p-8 items-start justify-center sm:justify-start md:flex md:flex-row md:justify-between gap-10 max-w-screen-xl w-full">
        <BookItem
          imgurl="https://cdn.europosters.eu/image/1300/telas-harry-potter-deathly-hallows-book-cover-i214933.jpg"
          title="Harry Potter"
          authorname="J K Rowling"
        />
        <BookItem
          imgurl="https://cdn.europosters.eu/image/1300/telas-harry-potter-deathly-hallows-book-cover-i214933.jpg"
          title="Harry Potter"
          authorname="J K Rowling"
        />
        <BookItem
          imgurl="https://cdn.europosters.eu/image/1300/telas-harry-potter-deathly-hallows-book-cover-i214933.jpg"
          title="Harry Potter"
          authorname="J K Rowling"
        />
        <BookItem
          imgurl="https://cdn.europosters.eu/image/1300/telas-harry-potter-deathly-hallows-book-cover-i214933.jpg"
          title="Harry Potter"
          authorname="J K Rowling"
        />
        <BookItem
          imgurl="https://cdn.europosters.eu/image/1300/telas-harry-potter-deathly-hallows-book-cover-i214933.jpg"
          title="Harry Potter"
          authorname="J K Rowling"
        />
        <BookItem
          imgurl="https://cdn.europosters.eu/image/1300/telas-harry-potter-deathly-hallows-book-cover-i214933.jpg"
          title="Harry Potter"
          authorname="J K Rowling"
        />
        <BookItem
          imgurl="https://cdn.europosters.eu/image/1300/telas-harry-potter-deathly-hallows-book-cover-i214933.jpg"
          title="Harry Potter"
          authorname="J K Rowling"
        />
      </div>
    </div>
  );
}

export default BooksSection;
