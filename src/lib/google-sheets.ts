// src/lib/google-sheets.ts

// ============================================================================
// 📘 BOOKS SECTION (OPAC)
// ============================================================================

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwYoiETHqEVR5ZOXsKXk1WNQ46XlvHpje-lbxXekdnrOA9U2IMTpVFoNmOi9KuX8saKYO7vr_lWatM/pub?gid=1315133597&single=true&output=csv';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  department: string;
  available: boolean;
  location: string;
  language: string;
  year: string;
  cost: string;
}

export const fetchBooksFromSheets = async (
  searchQuery: string = '',
  page: number = 1,
  pageSize: number = 20
): Promise<{ books: Book[]; total: number; hasMore: boolean }> => {
  try {
    console.log('📚 Fetching books from Google Sheets...');
    const response = await fetch(SHEET_CSV_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const books = parseBookCSV(csvText);

    console.log(`✅ Successfully parsed ${books.length} books`);

    // Apply search filter
    let filteredBooks = books;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.language.toLowerCase().includes(query) ||
          book.department.toLowerCase().includes(query)
      );
    }

    // Pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

    return {
      books: paginatedBooks,
      total: filteredBooks.length,
      hasMore: startIndex + pageSize < filteredBooks.length,
    };
  } catch (error) {
    console.error('❌ Error fetching from Google Sheets:', error);
    throw error;
  }
};

// --- CSV PARSER FOR BOOKS ---
const parseBookCSV = (csvText: string): Book[] => {
  const lines = csvText.split('\n').filter((line) => line.trim());
  if (lines.length <= 4) return [];

  const headerLine = lines[3];
  const headers = parseCSVLine(headerLine);

  const books = lines.slice(4).map((line, index) => {
    const values = parseCSVLine(line);
    const book: any = {};
    headers.forEach((header, colIndex) => (book[header] = values[colIndex] || ''));

    return {
      id: book['ACCESSION_NO (M)'] || `book-${index}`,
      title: book['TITLE (M)'] || 'Unknown Title',
      author: book['FIRST AUTHOR (personal Author only)- M'] || 'Unknown Author',
      isbn: book['ACCESSION_NO (M)'] || '',
      department: book['SUBJECT ( M)'] || 'General',
      available: true,
      location: 'Library',
      language: book['LANGUAGE CODE (M)'] || 'Unknown',
      year: book['YEAR (yyyy)(M)'] || '',
      cost: book['COST (M)'] || '',
    };
  });

  return books.filter((book) => book.title && book.title !== 'Unknown Title');
};

// --- Generic CSV line parser ---
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
};

// ============================================================================
// 🧾 QUESTION PAPERS SECTION
// ============================================================================

const QUESTION_PAPERS_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRtjRMgUQ55lAJxPqb4XKCV2ftLhnbccWwy-Oe3gs8Px9CQKou4ZNbTcTITFQAzr9bnbbtPZMXUclU2/pub?gid=716050975&single=true&output=csv';

export interface QuestionPaper {
  title: string;
  department: string;
  semester: string;
  year: string;
  type: string;
  file: string;
}

export const fetchQuestionPapersFromSheets = async (): Promise<QuestionPaper[]> => {
  try {
    console.log('📄 Fetching question papers from Google Sheets...');
    const response = await fetch(QUESTION_PAPERS_SHEET_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch question papers: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const papers = parseQuestionPaperCSV(csvText);
    console.log(`✅ Loaded ${papers.length} question papers`);
    return papers;
  } catch (error) {
    console.error('❌ Error fetching question papers:', error);
    return [];
  }
};

const parseQuestionPaperCSV = (csvText: string): QuestionPaper[] => {
  const lines = csvText.split('\n').filter((line) => line.trim());
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const paper: any = {};
    headers.forEach((header, i) => (paper[header] = values[i] || ''));

    return {
      title: paper['title'] || 'Untitled Paper',
      department: paper['department'] || 'General',
      semester: paper['semester'] || '',
      year: paper['year'] || '',
      type: paper['type'] || '',
      file: paper['file'] || '',
    };
  });
};

// ============================================================================
// 🌐 E-RESOURCES SECTION
// ============================================================================

const E_RESOURCES_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRrXXXXX/pub?gid=0&single=true&output=csv'; 
// ⬆️ Replace this link with your published E-Resources CSV link

export interface EResource {
  title: string;
  category: string;
  description: string;
  link: string;
  accessType: string;
}

export const fetchEResourcesFromSheets = async (): Promise<EResource[]> => {
  try {
    console.log('🌐 Fetching E-Resources from Google Sheets...');
    const response = await fetch(E_RESOURCES_SHEET_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch e-resources: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const resources = parseEResourceCSV(csvText);
    console.log(`✅ Loaded ${resources.length} e-resources`);
    return resources;
  } catch (error) {
    console.error('❌ Error fetching e-resources:', error);
    return [];
  }
};

const parseEResourceCSV = (csvText: string): EResource[] => {
  const lines = csvText.split('\n').filter((line) => line.trim());
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const row: any = {};
    headers.forEach((header, i) => (row[header] = values[i] || ''));

    return {
      title: row['title'] || 'Untitled Resource',
      category: row['category'] || 'General',
      description: row['description'] || '',
      link: row['link'] || '',
      accessType: row['accessType'] || 'Free',
    };
  });
};
