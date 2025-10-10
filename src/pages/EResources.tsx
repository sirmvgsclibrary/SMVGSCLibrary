// src/pages/EResources.tsx
import { ExternalLink, Database, FileText, Globe, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { fetchEResourcesFromSheets, EResource as SheetEResource } from "@/lib/google-sheets";

interface LocalEResource {
  title: string;
  description: string;
  category: string;
  icon: string;
  url: string;
  thumbnail?: string;
}

const FALLBACK_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT4mW-MDPQPuGF_Rlm7x4awB4FbkIt1XrQn52aPd8lCh4YMnntncmyRW3GA7G03-HNfClB622a9L8AC/pub?gid=1444317974&single=true&output=csv";

const EResources = () => {
  const [resources, setResources] = useState<LocalEResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const normalizeAndSet = (items: any[]) => {
      const normalized: LocalEResource[] = items
        .map((it) => {
          const title = it.title ?? it.Title ?? "";
          const description = it.description ?? it.Description ?? it.desc ?? "";
          const category = it.category ?? it.Category ?? it.cat ?? "General";
          const url =
            it.url ??
            it.URL ??
            it.link ??
            it.Link ??
            it.LinkURL ??
            it.LinkUrl ??
            it.linkUrl ??
            "";
          const thumbnail = it.thumbnail ?? it.Thumbnail ?? it.image ?? "";
          let icon = it.icon ?? it.Icon ?? "";

          if (!icon) icon = guessIcon(category, description, it.accessType ?? "");

          return {
            title: String(title).trim(),
            description: String(description).trim(),
            category: String(category).trim(),
            icon: String(icon).trim(),
            url: String(url).trim() || "#",
            thumbnail: String(thumbnail).trim() || undefined,
          } as LocalEResource;
        })
        .filter((r) => r.title);

      setResources(normalized);
    };

    const load = async () => {
      setLoading(true);
      try {
        const sheetItems: SheetEResource[] = await fetchEResourcesFromSheets();
        if (Array.isArray(sheetItems) && sheetItems.length > 0) {
          normalizeAndSet(sheetItems as any[]);
          return;
        }
      } catch (err) {
        console.warn("fetchEResourcesFromSheets failed, using fallback CSV.", err);
      }

      try {
        const res = await fetch(FALLBACK_CSV_URL);
        if (!res.ok) throw new Error("Failed to fetch fallback CSV");
        const csvText = await res.text();
        const lines = csvText.split("\n").filter((l) => l.trim());
        if (lines.length === 0) {
          setResources([]);
          return;
        }

        const headers = parseCSVLine(lines[0]).map((h) => h.trim());
        const items = lines.slice(1).map((line) => {
          const values = parseCSVLine(line);
          const row: any = {};
          headers.forEach((h, i) => (row[h] = values[i] || ""));
          return row;
        });

        normalizeAndSet(items);
      } catch (err) {
        console.error("Failed to load e-resources (fallback):", err);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  };

  const guessIcon = (category = "", description = "", accessType = ""): string => {
    const c = String(category).toLowerCase();
    const d = String(description).toLowerCase();
    const a = String(accessType).toLowerCase();

    if (c.includes("journal") || d.includes("journal") || c.includes("research") || a.includes("research"))
      return "FileText";
    if (c.includes("course") || c.includes("learning") || d.includes("course") || d.includes("learn"))
      return "Book";
    if (c.includes("web") || c.includes("site") || c.includes("portal")) return "Globe";
    return "Database";
  };

  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];
  const filteredResources =
    selectedCategory === "All" ? resources : resources.filter((r) => r.category === selectedCategory);

  const iconMap: Record<string, any> = { FileText, Database, Book, Globe };
  const getIconComponent = (iconName: string) => iconMap[iconName] || Database;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* ✨ FIXED HEADER SECTION WITH BACKGROUND IMAGE */}
      <header className="relative isolate overflow-hidden">
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
            <Database className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-4 gradient-text">E-Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access our curated collection of online databases, journals, and learning platforms.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        {loading ? (
          <div className="flex items-center justify-center h-[50vh] text-muted-foreground text-lg">
            Loading e-resources...
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16">
            {/* 🔹 Categories */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {/* 🔹 Resources */}
            {filteredResources.length === 0 ? (
              <GlassCard className="text-center py-12 mb-12">
                <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No E-Resources Found</h3>
                <p className="text-muted-foreground">
                  {selectedCategory === "All"
                    ? "No e-resources available yet."
                    : `No e-resources found in the ${selectedCategory} category.`}
                </p>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {filteredResources.map((resource, index) => {
                  const Icon = getIconComponent(resource.icon);
                  return (
                    <GlassCard
                      key={index}
                      hover
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">{resource.title}</h3>
                            <span className="text-sm text-primary font-medium">{resource.category}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 flex-grow">{resource.description}</p>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Button variant="outline" className="gap-2 w-full">
                            Access Resource
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EResources;
