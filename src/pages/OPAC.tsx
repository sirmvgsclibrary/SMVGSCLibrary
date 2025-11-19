// src/pages/opac.tsx
import { useState, useEffect, useCallback } from "react";
import { Search, BookOpen, Loader, Languages, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { fetchBooksFromSheets, Book } from "@/lib/google-sheets";

const OPAC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [searchType, setSearchType] = useState("all");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce the user's typing so we don't trigger searches on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Helper to get language name
  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      KAN: "Kannada",
      HIN: "Hindi",
      ENG: "English",
      SAN: "Sanskrit",
      TAM: "Tamil",
      TEL: "Telugu",
      MAL: "Malayalam",
    };
    return languages[code] || code;
  };

  // Client-side case-insensitive matcher as a safety net (works within the fetched page)
  const matchesQuery = (book: Book, query: string, type: string) => {
    if (!query) return true;
    const q = query.trim().toLowerCase();

    const title = (book.title || "").toLowerCase();
    const author = (book.author || "").toLowerCase();
    const language = (book.language || "").toLowerCase();
    const department = (book.department || "").toLowerCase();
    const location = (book.location || "").toLowerCase();
    const year = String(book.year || "").toLowerCase();
    const id = String(book.id || "").toLowerCase();

    switch (type) {
      case "title":
        return title.includes(q);
      case "author":
        return author.includes(q);
      case "language":
        return language.includes(q) || getLanguageName(book.language).toLowerCase().includes(q);
      case "department":
        return department.includes(q);
      case "all":
      default:
        return (
          title.includes(q) ||
          author.includes(q) ||
          language.includes(q) ||
          department.includes(q) ||
          location.includes(q) ||
          year.includes(q) ||
          id.includes(q)
        );
    }
  };

  /**
   * performSearch
   * - newSearch: whether to reset page and replace books
   * - explicitQuery: the query to use (so we use the debouncedQuery snapshot)
   */
  const performSearch = useCallback(
    async (newSearch: boolean = true, explicitQuery: string = "") => {
      try {
        setLoading(true);
        setError(null);

        const normalizedQuery = explicitQuery.trim();
        const currentPage = newSearch ? 1 : page;

        console.log(
          `📚 performSearch called — newSearch:${newSearch} page:${currentPage} query:"${normalizedQuery}" type:${searchType}`
        );

        // Call the existing fetch function. We pass the normalized query (so if your backend
        // supports case-insensitive search this will help). We keep the same arg count assuming
        // fetchBooksFromSheets(searchQuery, page, pageSize).
        const result = await fetchBooksFromSheets(normalizedQuery, currentPage, 20);

        console.log(`📥 Fetched ${result.books.length} books (server reported total: ${result.total})`);

        // Apply client-side, case-insensitive filtering as a fallback to guarantee matches
        const filtered = result.books.filter((b) => matchesQuery(b, normalizedQuery, searchType));

        if (newSearch) {
          setBooks(filtered);
          setPage(1);
        } else {
          setBooks((prev) => {
            // Append filtered results
            const newBooks = [...prev, ...filtered];
            console.log(`🔄 Appending books: ${prev.length} -> ${newBooks.length}`);
            return newBooks;
          });
        }

        // If server uses different notion of hasMore/total, we still keep it as returned
        // but note: filtered length could be less than returned page size.
        setHasMore(result.hasMore);
        setTotalBooks(result.total);
        setInitialLoad(false);
      } catch (err) {
        console.error("❌ Search error:", err);
        setError("Failed to load books. Please try again later.");
        if (newSearch) {
          setBooks([]);
        }
      } finally {
        setLoading(false);
      }
    },
    // dependencies: page & searchType are read inside the function
    [page, searchType]
  );

  // When debouncedQuery or searchType changes, run a new search (reset)
  useEffect(() => {
    setPage(1);
    performSearch(true, debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, searchType]);

  // When page changes (for load more), trigger fetch for that page
  useEffect(() => {
    if (page > 1 && !initialLoad) {
      console.log(`🎯 Page changed to ${page}, triggering load more...`);
      performSearch(false, debouncedQuery);
    }
  }, [page]); // intentionally not including performSearch to avoid re-creating it on every render

  // Initial load (only once)
  useEffect(() => {
    performSearch(true, debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      console.log(`⬇️ Loading more books... Current page: ${page}, Going to page: ${page + 1}`);
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        console.log(`📄 Page updated: ${prevPage} -> ${nextPage}`);
        return nextPage;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ✨ HEADER SECTION WITH BACKGROUND IMAGE */}
      <div className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/60 to-background" />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-elegant hover-lift">
            <Search className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">OPAC Search</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Search through our library's extensive collection of books, journals, and
            materials.
          </p>
        </div>
      </div>

      {/* 🔹 Search & Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search Input */}
        <GlassCard className="mb-8 animate-fade-in-up">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by title, author, language, or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-full sm:w-48 h-12">
                  <SelectValue placeholder="Search Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="department">Subject</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!initialLoad && totalBooks > 0 && (
              <div className="text-sm text-muted-foreground">
                Found {totalBooks.toLocaleString()} books • Showing {books.length} books
                {hasMore && ` • More books available`}
              </div>
            )}
          </div>
        </GlassCard>

        {/* Error Message */}
        {error && (
          <GlassCard className="mb-6 border-red-200 bg-red-50 dark:bg-red-950/20">
            <div className="text-red-600 dark:text-red-400 text-center">
              {error}
            </div>
          </GlassCard>
        )}

        {/* Loading Indicator */}
        {loading && initialLoad && (
          <div className="text-center py-12">
            <Loader className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading library books...</p>
          </div>
        )}

        {/* Results */}
        {!initialLoad && (
          <div className="space-y-4">
            {books.length === 0 ? (
              <GlassCard className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchQuery ? "No Books Found" : "No Books Loaded"}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try searching with different keywords."
                    : "Unable to load data. Please refresh."}
                </p>
              </GlassCard>
            ) : (
              <>
                {books.map((book, index) => (
                  <GlassCard
                    key={`${book.id}-${index}-${page}`}
                    hover
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
                          <p className="text-muted-foreground mb-2">by {book.author}</p>

                          <div className="flex flex-wrap gap-2 text-sm mb-2">
                            <span className="px-2 py-1 bg-secondary rounded-md flex items-center gap-1">
                              <Languages className="h-3 w-3" />
                              {getLanguageName(book.language)}
                            </span>
                            <span className="px-2 py-1 bg-secondary rounded-md flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {book.year}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 text-sm">
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                              Accession: {book.id}
                            </span>
                            <span className="px-2 py-1 bg-secondary rounded-md">
                              {book.department}
                            </span>
                            <span className="px-2 py-1 bg-secondary rounded-md">
                              {book.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg font-medium">
                          Available
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <Button
                      onClick={handleLoadMore}
                      disabled={loading}
                      size="lg"
                      className="gap-2 min-w-48"
                    >
                      {loading ? (
                        <>
                          <Loader className="h-4 w-4 animate-spin" />
                          Loading More Books...
                        </>
                      ) : (
                        `Load More Books (${books.length} / ${totalBooks})`
                      )}
                    </Button>
                    {loading && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Loading page {page}...
                      </p>
                    )}
                  </div>
                )}

                {/* No more books message */}
                {!hasMore && books.length > 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">
                      🎉 All done! Loaded all {books.length} books.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OPAC;
