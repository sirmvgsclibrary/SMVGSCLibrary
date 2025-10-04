import { useState } from "react";
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const QuestionPapers = () => {
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // Sample data - will be replaced with CMS data
  const questionPapers = [
    {
      title: "Data Structures and Algorithms",
      department: "BCA",
      semester: "3rd Semester",
      year: "2023",
      type: "End Semester",
    },
    {
      title: "Database Management Systems",
      department: "BCA",
      semester: "4th Semester",
      year: "2023",
      type: "Mid Semester",
    },
    {
      title: "Organic Chemistry",
      department: "Chemistry",
      semester: "2nd Semester",
      year: "2023",
      type: "End Semester",
    },
    {
      title: "Calculus and Analytical Geometry",
      department: "Mathematics",
      semester: "1st Semester",
      year: "2024",
      type: "End Semester",
    },
    {
      title: "Classical Mechanics",
      department: "Physics",
      semester: "3rd Semester",
      year: "2023",
      type: "End Semester",
    },
  ];

  const departments = ["All", "BCA", "Chemistry", "Mathematics", "Physics", "Botany", "Zoology"];
  const years = ["All", "2024", "2023", "2022", "2021"];

  const filteredPapers = questionPapers.filter((paper) => {
    const deptMatch = selectedDept === "all" || paper.department === selectedDept;
    const yearMatch = selectedYear === "all" || paper.year === selectedYear;
    return deptMatch && yearMatch;
  });

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
                  <Button className="gap-2 flex-shrink-0">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No question papers found for the selected filters.
              </p>
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
