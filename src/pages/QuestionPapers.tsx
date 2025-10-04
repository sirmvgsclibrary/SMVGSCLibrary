import { useState, useEffect } from "react";
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestionPapers = async () => {
      try {
        setLoading(true);
        
        // Load question papers from JSON files
        const modules = import.meta.glob('../../content/question-papers/*.json');
        const papersData: QuestionPaper[] = [];

        for (const path in modules) {
          try {
            const module = await modules[path]() as { default: QuestionPaper };
            papersData.push(module.default);
          } catch (err) {
            console.warn(`Failed to load question paper from ${path}:`, err);
          }
        }

        setQuestionPapers(papersData);
      } catch (err) {
        console.error('Error loading question papers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestionPapers();
  }, []);

  // Get unique departments and years from data
  const departments = ["All", ...new Set(questionPapers.map(paper => paper.department))];
  const years = ["All", ...new Set(questionPapers.map(paper => paper.year).sort((a, b) => b.localeCompare(a)))];

  const filteredPapers = questionPapers.filter((paper) => {
    const deptMatch = selectedDept === "all" || paper.department === selectedDept;
    const yearMatch = selectedYear === "all" || paper.year === selectedYear;
    return deptMatch && yearMatch;
  });

  const handleDownload = (fileUrl: string, title: string) => {
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <div className="h-10 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
            </div>

            {/* Filters Loading */}
            <div className="p-6 rounded-2xl bg-gray-300 mb-8 animate-pulse">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="h-4 bg-gray-400 rounded w-24 mb-2"></div>
                  <div className="h-10 bg-gray-400 rounded"></div>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-400 rounded w-16 mb-2"></div>
                  <div className="h-10 bg-gray-400 rounded"></div>
                </div>
                <div className="w-32 h-10 bg-gray-400 rounded"></div>
              </div>
            </div>

            {/* Papers Loading */}
            <div className="mb-6">
              <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
            </div>

            <div className="grid gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="p-6 rounded-2xl bg-gray-300 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-400 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-400 rounded w-3/4 mb-3"></div>
                      <div className="flex gap-2">
                        <div className="w-20 h-6 bg-gray-400 rounded-full"></div>
                        <div className="w-24 h-6 bg-gray-400 rounded-full"></div>
                        <div className="w-16 h-6 bg-gray-400 rounded-full"></div>
                        <div className="w-28 h-6 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-32 h-10 bg-gray-400 rounded"></div>
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
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase()}>
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
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toLowerCase()}>
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

          {/* Results Count */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Available Papers ({filteredPapers.length})
            </h2>
          </div>

          {/* Question Papers Grid */}
          {filteredPapers.length === 0 ? (
            <GlassCard className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Question Papers Found</h3>
              <p className="text-muted-foreground">
                {questionPapers.length === 0 
                  ? "Question papers will appear here once added through the CMS."
                  : "No papers found for the selected filters."
                }
              </p>
            </GlassCard>
          ) : (
            <div className="grid gap-4">
              {filteredPapers.map((paper, index) => (
                <GlassCard
                  key={index}
                  hover
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
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

          {/* Information Note */}
          <GlassCard className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Note</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Question papers are provided for reference and study purposes only. 
                All papers are subject to copyright and should not be redistributed without permission.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuestionPapers;