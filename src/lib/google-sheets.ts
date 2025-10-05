// src/lib/google-sheets.ts
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwYoiETHqEVR5ZOXsKXk1WNQ46XlvHpje-lbxXekdnrOA9U2IMTpVFoNmOi9KuX8saKYO7vr_lWatM/pub?gid=1315133597&single=true&output=csv';

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
    const books = parseCSV(csvText);
    
    console.log(`✅ Successfully parsed ${books.length} books`);
    
    // Apply search filter
    let filteredBooks = books;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.language.toLowerCase().includes(query) ||
        book.department.toLowerCase().includes(query)
      );
    }
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + pageSize);
    
    return {
      books: paginatedBooks,
      total: filteredBooks.length,
      hasMore: (startIndex + pageSize) < filteredBooks.length
    };
  } catch (error) {
    console.error('❌ Error fetching from Google Sheets:', error);
    throw error;
  }
};

// Fixed CSV parser for your specific format
const parseCSV = (csvText: string): Book[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  
  if (lines.length <= 4) {
    console.log('⚠️ Not enough data lines in CSV');
    return [];
  }
  
  // Your actual headers are on line 4 (index 3)
  const headerLine = lines[3];
  const headers = parseCSVLine(headerLine);
  
  console.log('📋 Actual Headers:', headers);
  
  // Process data rows starting from line 5 (index 4)
  const books = lines.slice(4).map((line, index) => {
    const values = parseCSVLine(line);
    
    const book: any = {};
    headers.forEach((header, colIndex) => {
      book[header] = values[colIndex] || '';
    });
    
    // Map to your actual column names
    return {
      id: book['ACCESSION_NO (M)'] || `book-${index}`,
      title: book['TITLE (M)'] || 'Unknown Title',
      author: book['FIRST AUTHOR (personal Author only)- M'] || 'Unknown Author',
      isbn: book['ACCESSION_NO (M)'] || '', // Using Accession No as ISBN
      department: book['SUBJECT ( M)'] || 'General',
      available: true, // Assuming all books are available
      location: 'Library', // Default location
      language: book['LANGUAGE CODE (M)'] || 'Unknown',
      year: book['YEAR (yyyy)(M)'] || '',
      cost: book['COST (M)'] || ''
    };
  }).filter(book => book.title !== 'Unknown Title' && book.title.trim() !== '');
  
  console.log(`📊 Processed ${books.length} valid books`);
  
  // Show first few books for verification
  if (books.length > 0) {
    console.log('📖 Sample books:', books.slice(0, 3));
  }
  
  return books;
};

// CSV line parser
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
  
  // Push the last field
  result.push(current.trim());
  return result;
};