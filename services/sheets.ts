// Google Sheets API service
const SHEET_ID = '13xJGn3xxJwEUX5RquWKwl12P21HuUlxStQOzRxst2y8';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export const sheetsService = {
  async getProducts() {
    try {
      const response = await fetch(SHEET_URL);
      const text = await response.text();
      
      // Parse Google Sheets JSON response
      const jsonText = text.substring(47).slice(0, -2);
      const data = JSON.parse(jsonText);
      
      if (!data.table || !data.table.rows) return [];
      
      // Convert rows to product objects (skip header)
      const products = data.table.rows.slice(1).map((row: any, index: number) => {
        const cells = row.c || [];
        return {
          id: `p${index + 1}`,
          name: cells[0]?.v || '',
          nepaliName: cells[1]?.v || '',
          category: cells[2]?.v === 'Herb' ? 'Jadibuti' : 'Local Fruits',
          price: parseInt(cells[3]?.v) || 0,
          description: cells[4]?.v || '',
          benefits: cells[5]?.v || '',
          image: cells[6]?.v || 'https://picsum.photos/600/400'
        };
      }).filter(p => p.name); // Filter out empty rows
      
      return products;
    } catch (error) {
      console.error('Failed to fetch from Google Sheets:', error);
      return [];
    }
  }
};