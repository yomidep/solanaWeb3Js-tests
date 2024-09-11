// Import necessary modules if you're using Node.js
// import fetch from 'node-fetch'; // Uncomment if using Node.js and need node-fetch

// Define the interface for the API response
interface Collection {
    name: string;
    floorPrice: number;
    volumeAll: number
    // Add other properties as needed based on the API response
}

interface PopularCollectionsResponse {
    collections: Collection[];
}

async function fetchPopularCollections(): Promise<PopularCollectionsResponse> {
    try {
        const response = await fetch('https://api-mainnet.magiceden.dev/v2/marketplace/popular_collections');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: PopularCollectionsResponse = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching popular collections:', error);
        throw error;
    }
}
fetchPopularCollections()

