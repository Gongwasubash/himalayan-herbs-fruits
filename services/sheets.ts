// Google Sheets API service
const SHEET_ID = '13xJGn3xxJwEUX5RquWKwl12P21HuUlxStQOzRxst2y8';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
const MESSAGES_SHEET_ID = 'your_messages_sheet_id_here';

// Category mapping from Google Sheets to app categories
const categoryMap: { [key: string]: string } = {
  'Superfood': 'Superfood',
  'Flour & Millets': 'Flour & Millets', 
  'Honey': 'Honey',
  'Fruits': 'Fruits',
  'Local Rice': 'Local Rice',
  'Lentils/Beans': 'Lentils/Beans',
  'Lentils': 'Lentils',
  'Grains': 'Grains',
  'Flour': 'Flour',
  'Herb': 'Herb',
  'Spice': 'Spice',
  'Meat': 'Meat'
};

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
        const sheetCategory = cells[2]?.v || 'Fruits';
        
        return {
          id: `p${index + 1}`,
          name: cells[0]?.v || '',
          nepaliName: cells[1]?.v || '',
          category: categoryMap[sheetCategory] || 'Fruits',
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
  },

  async getCategoryImages() {
    try {
      const products = await this.getProducts();
      const categoryImages: { [key: string]: string } = {};
      
      // Get first image for each category
      products.forEach(product => {
        if (!categoryImages[product.category]) {
          categoryImages[product.category] = product.image;
        }
      });
      
      return categoryImages;
    } catch (error) {
      console.error('Failed to fetch category images:', error);
      return {};
    }
  },

  async saveOrder(orderData: { name: string; phone: string; address: string; email: string; products: string; totalAmount: number; orderDate: string; status: string }) {
    try {
      // Use form submission method to bypass CORS
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://script.google.com/macros/s/AKfycbzm0SPJyJMrNc7CO3795qFC1NXHQ-XnTkFpm6l38UMbJngADLnKUFP9xpbi0aF_rgzZkA/exec';
      
      // Create hidden iframe to submit form without opening new page
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe_order';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      form.target = 'hidden_iframe_order';
      form.style.display = 'none';
      
      // Add form fields
      const fields = {
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        email: orderData.email,
        products: orderData.products,
        totalAmount: orderData.totalAmount.toString(),
        orderDate: orderData.orderDate,
        status: orderData.status
      };
      
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('Failed to save order:', error);
      return false;
    }
  },

  async saveMessage(messageData: { name: string; email: string; address: string; message: string }) {
    try {
      // Use form submission method to bypass CORS - SEPARATE SCRIPT FOR MESSAGES
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://script.google.com/macros/s/AKfycbwIY1IeBqKWWSmxb6WttxbB7CblAuh8Zv-BKYJRa8IAcYlbO6fzkLf5nofXrkwjX4fWRA/exec';
      
      // Create hidden iframe to submit form without opening new page
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      form.target = 'hidden_iframe';
      form.style.display = 'none';
      
      // Add form fields
      const fields = {
        name: messageData.name,
        email: messageData.email,
        address: messageData.address,
        message: messageData.message,
        date: new Date().toISOString()
      };
      
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
      
      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('Failed to save message:', error);
      return false;
    }
  }
};