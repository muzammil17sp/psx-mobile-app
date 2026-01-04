import axios from 'axios';

const PSX_API_BASE = 'https://psxterminal.com/api';

/**
 * Get current stock price from PSX Terminal API directly
 */
export const getStockPrice = async (symbol: string) => {
  try {
    const response = await axios.get(`${PSX_API_BASE}/ticks/REG/${symbol}`, {
      timeout: 5000,
    });
    
    if (response.data.success && response.data.data) {
      return {
        success: true,
        data: {
          symbol: response.data.data.symbol,
          price: response.data.data.price,
          change: response.data.data.change,
          changePercent: response.data.data.changePercent,
        },
      };
    }
    
    return {
      success: false,
      data: null,
    };
  } catch (error: any) {
    console.error('Error fetching stock price:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

