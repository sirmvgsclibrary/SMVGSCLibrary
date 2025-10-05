// src/lib/google-sheets-debug.ts
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRVREeHICWFF3ghlAsqHmNQqxxEl27jIZUQPI-wI3KLz0eGp6_RTd8xKWvy65PPp8l7GEuQRjTZrPQ2/pub?gid=870322603&single=true&output=csv';

export const debugCSV = async () => {
  try {
    console.log('=== DEBUG: Fetching CSV from Google Sheets ===');
    
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();
    
    console.log('=== RAW CSV TEXT ===');
    console.log(csvText);
    
    console.log('=== CSV LINES ===');
    const lines = csvText.split('\n').filter(line => line.trim());
    console.log('Total lines:', lines.length);
    
    // Show first 5 lines
    lines.slice(0, 5).forEach((line, index) => {
      console.log(`Line ${index}:`, line);
    });
    
    // Show headers
    if (lines.length > 0) {
      const headers = lines[0].split(',').map(h => h.trim());
      console.log('=== HEADERS ===');
      console.log(headers);
    }
    
    return { csvText, lines };
  } catch (error) {
    console.error('Debug failed:', error);
    throw error;
  }
};