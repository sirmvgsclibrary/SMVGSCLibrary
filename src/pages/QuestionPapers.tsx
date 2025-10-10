// src/pages/question-paper.tsx
import { useState, useEffect } from "react";
import { FileText, Download, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRtjRMgUQ55lAJxPqb4XKCV2ftLhnbccWwy-Oe3gs8Px9CQKou4ZNbTcTITFQAzr9bnbbtPZMXUclU2/pub?gid=716050975&single=true&output=csv";

interface QuestionPaper {
  title: string;
  department: string;
  semester: string;
  year: string;
  type: string;
  file: string;
}

const QuestionPapers = () => {
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        setLoading(true);
        const res = await fetch(SHEET_CSV_URL);
        const csv = await res.text();
        const parsed = parseCSV(csv);
        setPapers(parsed);
      } catch (err) {
        console.error("❌ Failed to load question papers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSheetData();
  }, []);

  const departments = ["All", ...new Set(papers.map((p) => p.department).filter(Boolean))];
  const years = ["All", ...new Set(papers.map((p) => p.year).filter(Boolean).sort((a, b) => b.localeCompare(a)))];

  const filteredPapers = papers.filter((p) => {
    const deptMatch = selectedDept === "all" || p.department === selectedDept;
    const yearMatch = selectedYear === "all" || p.year === selectedYear;
    return deptMatch && yearMatch;
  });

  const handleDownload = (fileUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFilters = () => {
    setSelectedDept("all");
    setSelectedYear("all");
  };

  const hasActiveFilters = selectedDept !== "all" || selectedYear !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ✨ HEADER SECTION WITH BACKGROUND IMAGE */}
      <div className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80')"
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/60 to-background" />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-elegant hover-lift">
            <FileText className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Question Papers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access previous year question papers organized by department and semester
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-primary rounded-full"></span>
              )}
            </Button>
          </div>

          {/* Filters Container */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-8`}>
            <GlassCard className="animate-fade-in-up">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-1 gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Department</label>
                    <Select value={selectedDept} onValueChange={setSelectedDept}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept === "All" ? "all" : dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Years" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year === "All" ? "all" : year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 lg:gap-4">
                  <Button className="gap-2 flex-1 lg:flex-none">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Apply</span>
                  </Button>
                  
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="gap-2 flex-1 lg:flex-none"
                      onClick={clearFilters}
                    >
                      <X className="h-4 w-4" />
                      <span className="hidden sm:inline">Clear</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Active filters:</span>
                    {selectedDept !== "all" && (
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                        Dept: {selectedDept}
                      </span>
                    )}
                    {selectedYear !== "all" && (
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                        Year: {selectedYear}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Results Section */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-semibold">
              Available Papers ({filteredPapers.length})
            </h2>
            
            {/* Mobile filter info */}
            <div className="lg:hidden text-sm text-muted-foreground">
              {hasActiveFilters && (
                <span>
                  Filtered by: 
                  {selectedDept !== "all" && ` ${selectedDept}`}
                  {selectedYear !== "all" && ` ${selectedYear}`}
                </span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 text-muted-foreground">
                <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                Loading question papers...
              </div>
            </div>
          ) : filteredPapers.length === 0 ? (
            <GlassCard className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Question Papers Found</h3>
              <p className="text-muted-foreground mb-4">
                {hasActiveFilters 
                  ? "No question papers found for the selected filters. Try changing your filters."
                  : "No question papers available at the moment."
                }
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </GlassCard>
          ) : (
            <div className="grid gap-4">
              {filteredPapers.map((paper, i) => (
                <GlassCard
                  key={i}
                  hover
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-16 sm:w-16 sm:h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 truncate">
                          {paper.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                          <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                            {paper.department}
                          </span>
                          <span className="px-2 sm:px-3 py-1 bg-secondary rounded-full">
                            {paper.semester}
                          </span>
                          <span className="px-2 sm:px-3 py-1 bg-secondary rounded-full">
                            {paper.year}
                          </span>
                          <span className="px-2 sm:px-3 py-1 bg-secondary rounded-full">
                            {paper.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="gap-2 flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0"
                      onClick={() => handleDownload(paper.file, paper.title)}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
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

function parseCSV(csvText: string): QuestionPaper[] {
  const lines = csvText.split("\n").filter((l) => l.trim());
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const obj: any = {};
    headers.forEach((h, i) => (obj[h] = values[i] || ""));
    return {
      title: obj["title"] || "Untitled",
      department: obj["department"] || "Unknown",
      semester: obj["semester"] || "",
      year: obj["year"] || "",
      type: obj["type"] || "",
      file: obj["file"] || ""
    };
  });
}

export default QuestionPapers;