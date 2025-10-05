import { useState, useEffect, useCallback } from "react";
import { Search, BookOpen, Loader, AlertCircle, Languages, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { fetchBooksFromSheets, Book } from "@/lib/google-sheets";

const OPAC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (newSearch: boolean = true) => {
    try {
      setLoading(true);
      setError(null);
      const currentPage = newSearch ? 1 : page;
      
      console.log('🔍 Performing search...');
      const result = await fetchBooksFromSheets(searchQuery, currentPage, 20);
      
      console.log('✅ Search completed. Books found:', result.books.length);
      
      if (newSearch) {
        setBooks(result.books);
        setPage(1);
      } else {
        setBooks(prev => [...prev, ...result.books]);
      }
      
      setHasMore(result.hasMore);
      setTotalBooks(result.total);
      setInitialLoad(false);
    } catch (error) {
      console.error('❌ Search error:', error);
      setError('Failed to load books. Please try again later.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
      performSearch(false);
    }
  };

  useEffect(() => {
    performSearch(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      const timeoutId = setTimeout(() => {
        performSearch(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, performSearch, initialLoad]);

  // Get language full name
  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      'KAN': 'Kannada',
      'HIN': 'Hindi', 
      'ENG': 'English',
      'SAN': 'Sanskrit',
      'TAM': 'Tamil',
      'TEL': 'Telugu',
      'MAL': 'Malayalam'
    };
    return languages[code] || code;
  };

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
              Search through {totalBooks > 0 ? totalBooks.toLocaleString() : '20,000+' } books in our collection
            </p>
          </div>

          {/* Search Interface */}
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
                    <SelectValue />
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
                  Found {totalBooks.toLocaleString()} books matching your search
                </div>
              )}
            </div>
          </GlassCard>

          {/* Loading State */}
          {loading && initialLoad && (
            <div className="text-center py-12">
              <Loader className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading books from library database...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Loading 20,000+ books, please wait...
              </p>
            </div>
          )}

          {/* Results */}
          {!initialLoad && (
            <div className="space-y-4">
              {books.length === 0 ? (
                <GlassCard className="text-center py-12">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {searchQuery ? 'No Books Found' : 'No Books Loaded'}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? "No books found matching your search criteria. Try different keywords."
                      : "Unable to load books from the database. Please try refreshing the page."
                    }
                  </p>
                </GlassCard>
              ) : (
                <>
                  {books.map((book, index) => (
                    <GlassCard
                      key={`${book.id}-${index}`}
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
                        onClick={loadMore} 
                        disabled={loading}
                        size="lg"
                        className="gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader className="h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          'Load More Books'
                        )}
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Showing {books.length} of {totalBooks.toLocaleString()} books
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OPAC;