// src/pages/question-paper.tsx
import { useState, useEffect } from "react";
import { FileText, Download, Filter } from "lucide-react";
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
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRtjRMgUQ55lAJxPqb4XKCV2ftLhnbccWwy-Oe3gs8Px9CQKou4ZNbTcTITFQAzr9bnbbtPZMXUclU2/pub?gid=716050975&single=true&output=csv"; // 🔗 Replace this with your real Google Sheet CSV link

interface QuestionPaper {
  title: string;
  department: string;
  semester: string;
  year: string;
  type: string;
  file: string; // PDF URL
}

const QuestionPapers = () => {
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        setLoading(true);
        const res = await fetch(SHEET_CSV_URL);
        const csv = await res.text();
        const parsed = parseCSV(csv);
        setPapers(parsed);
      } catch (err) {
        console.error("❌ Failed to load question papers from Google Sheets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSheetData();
  }, []);

  const departments = ["All", ...new Set(papers.map((p) => p.department))];
  const years = ["All", ...new Set(papers.map((p) => p.year).sort((a, b) => b.localeCompare(a)))];

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
              <FileText className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Question Papers</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access previous year question papers organized by department and semester
            </p>
          </div>

          {/* Filters */}
          <GlassCard className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={selectedDept} onValueChange={setSelectedDept}>
                  <SelectTrigger>
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

              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
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

              <Button className="gap-2">
                <Filter className="h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </GlassCard>

          {/* Results */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Available Papers ({filteredPapers.length})
            </h2>
          </div>

          {loading ? (
            <p>Loading question papers...</p>
          ) : filteredPapers.length === 0 ? (
            <GlassCard className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Question Papers Found</h3>
              <p className="text-muted-foreground">
                No question papers found for the selected filters.
              </p>
            </GlassCard>
          ) : (
            <div className="grid gap-4">
              {filteredPapers.map((paper, i) => (
                <GlassCard
                  key={i}
                  hover
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                            {paper.department}
                          </span>
                          <span className="px-3 py-1 bg-secondary rounded-full">
                            {paper.semester}
                          </span>
                          <span className="px-3 py-1 bg-secondary rounded-full">
                            {paper.year}
                          </span>
                          <span className="px-3 py-1 bg-secondary rounded-full">
                            {paper.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="gap-2 flex-shrink-0"
                      onClick={() => handleDownload(paper.file, paper.title)}
                    >
                      <Download className="h-4 w-4" />
                      Download
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

// Simple CSV parser (safe for Google Sheets exports)
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
