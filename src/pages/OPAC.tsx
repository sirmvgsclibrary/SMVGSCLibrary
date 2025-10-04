import { useState } from "react";
import { Search, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const OPAC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");

  // Sample book data - will be replaced with CMS data
  const books = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      author: "John Smith",
      isbn: "978-0-123456-78-9",
      department: "BCA",
      available: true,
      location: "Shelf A-12",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      author: "Jane Doe",
      isbn: "978-0-987654-32-1",
      department: "Mathematics",
      available: true,
      location: "Shelf B-05",
    },
    {
      id: 3,
      title: "Organic Chemistry Principles",
      author: "Robert Johnson",
      isbn: "978-0-246813-57-9",
      department: "Chemistry",
      available: false,
      location: "Shelf C-18",
    },
  ];

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    switch (searchType) {
      case "title":
        return book.title.toLowerCase().includes(query);
      case "author":
        return book.author.toLowerCase().includes(query);
      case "isbn":
        return book.isbn.includes(query);
      default:
        return true;
    }
  });

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
            <div className="space-y-4">
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
                  </SelectContent>
                </Select>
                <Button size="lg" className="h-12 gap-2">
                  <Search className="h-5 w-5" />
                  Search
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Results */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {searchQuery ? `Search Results (${filteredBooks.length})` : "Recent Additions"}
            </h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredBooks.map((book, index) => (
              <GlassCard
                key={book.id}
                hover
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
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
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="px-2 py-1 bg-secondary rounded-md">ISBN: {book.isbn}</span>
                        <span className="px-2 py-1 bg-secondary rounded-md">{book.department}</span>
                        <span className="px-2 py-1 bg-secondary rounded-md">{book.location}</span>
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

          {filteredBooks.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No books found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OPAC;
