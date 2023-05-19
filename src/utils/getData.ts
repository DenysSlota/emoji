export async function getData(url: string) {
    try {
        const response = await fetch(url);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('An error occurred while receiving data:', error);
    }
  }