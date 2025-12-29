// Google Sheets API service
const SHEET_ID = '13xJGn3xxJwEUX5RquWKwl12P21HuUlxStQOzRxst2y8';
const API_KEY = 'AIzaSyC8HHHPVTtHpkunflCmD3FTbHTo1l9JbgQ'; // Your Firebase API key
const RANGE = 'Sheet1!A:H'; // Adjust range as needed

export const googleSheetsService = {
  async getProducts() {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.values) return [];
      
      // Skip header row and convert to product objects
      const [headers, ...rows] = data.values;
      
      return rows.map((row, index) => ({
        id: `product-${index + 1}`,
        name: row[0] || '',
        nepaliName: row[1] || '',
        category: row[2] || '',
        price: parseFloat(row[3]) || 0,
        description: row[4] || '',
        benefits: row[5] || '',
        image: row[6] || 'https://via.placeholder.com/400x300?text=No+Image',
        stock: parseInt(row[7]) || 0
      }));
    } catch (error) {
      console.error('Error fetching from Google Sheets:', error);
      return [];
    }
  }
};