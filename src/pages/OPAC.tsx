import { useState, useEffect } from "react";
import { Search, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Book {
  title: string;
  author: string;
  isbn: string;
  department: string;
  available: boolean;
  location: string;
  cover?: string;
  description?: string;
}

const OPAC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        
        // Load books from JSON files
        const modules = import.meta.glob('../../content/books/*.json');
        const booksData: Book[] = [];

        for (const path in modules) {
          try {
            const module = await modules[path]() as { default: Book };
            booksData.push(module.default);
          } catch (err) {
            console.warn(`Failed to load book from ${path}:`, err);
          }
        }

        setBooks(booksData);
      } catch (err) {
        console.error('Error loading books:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    switch (searchType) {
      case "title":
        return book.title.toLowerCase().includes(query);
      case "author":
        return book.author.toLowerCase().includes(query);
      case "isbn":
        return book.isbn.includes(query);
      case "department":
        return book.department.toLowerCase().includes(query);
      default:
        return true;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the filteredBooks calculation
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Loading */}
            <div className="text-center mb-12">
              <div className="inline-flex p-4 rounded-2xl bg-gray-300 mb-6 animate-pulse">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <div className="h-10 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
            </div>

            {/* Search Interface Loading */}
            <div className="p-6 rounded-2xl bg-gray-300 mb-8 animate-pulse">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-12 bg-gray-400 rounded"></div>
                <div className="w-full sm:w-48 h-12 bg-gray-400 rounded"></div>
                <div className="w-32 h-12 bg-gray-400 rounded"></div>
              </div>
            </div>

            {/* Results Loading */}
            <div className="mb-6 flex items-center justify-between">
              <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
              <div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>

            <div className="grid gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-6 rounded-2xl bg-gray-300 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-400 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-400 rounded w-1/2 mb-3"></div>
                      <div className="flex gap-2">
                        <div className="w-32 h-6 bg-gray-400 rounded-md"></div>
                        <div className="w-20 h-6 bg-gray-400 rounded-md"></div>
                        <div className="w-24 h-6 bg-gray-400 rounded-md"></div>
                      </div>
                    </div>
                    <div className="w-20 h-8 bg-gray-400 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
              <Search className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">OPAC Search</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Online Public Access Catalog - Search our comprehensive collection of books and resources
            </p>
          </div>

          {/* Search Interface */}
          <GlassCard className="mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter your search query..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 text-lg"
                  />
                </div>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-full sm:w-48 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Search by Title</SelectItem>
                    <SelectItem value="author">Search by Author</SelectItem>
                    <SelectItem value="isbn">Search by ISBN</SelectItem>
                    <SelectItem value="department">Search by Department</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" size="lg" className="h-12 gap-2">
                  <Search className="h-5 w-5" />
                  Search
                </Button>
              </div>
            </form>
          </GlassCard>

          {/* Results */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {searchQuery 
                ? `Search Results (${filteredBooks.length})` 
                : `All Books (${books.length})`
              }
            </h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {filteredBooks.length === 0 ? (
            <GlassCard className="text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {books.length === 0 
                  ? "No Books Available" 
                  : "No Books Found"
                }
              </h3>
              <p className="text-muted-foreground">
                {books.length === 0 
                  ? "Books will appear here once added through the CMS."
                  : searchQuery 
                    ? "No books found matching your search criteria. Try different keywords."
                    : "No books available in the catalog."
                }
              </p>
            </GlassCard>
          ) : (
            <div className="grid gap-4">
              {filteredBooks.map((book, index) => (
                <GlassCard
                  key={`${book.isbn}-${index}`}
                  hover
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="flex-shrink-0">
                        {book.cover ? (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
                        <p className="text-muted-foreground mb-2">by {book.author}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="px-2 py-1 bg-secondary rounded-md">ISBN: {book.isbn}</span>
                          <span className="px-2 py-1 bg-secondary rounded-md">{book.department}</span>
                          <span className="px-2 py-1 bg-secondary rounded-md">{book.location}</span>
                          {book.description && (
                            <span className="px-2 py-1 bg-secondary rounded-md line-clamp-1">
                              {book.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {book.available ? (
                        <div className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg font-medium">
                          Available
                        </div>
                      ) : (
                        <div className="px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg font-medium">
                          Checked Out
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OPAC;