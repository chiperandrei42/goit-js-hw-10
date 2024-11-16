export const FetchBreeds = async () => {
    const url = "https://api.thecatapi.com/v1/breeds";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed with error code ${response.status}`);
        }

            const data = await response.json();
            return data;
    }
    
    catch(e) {
        console.error(`Failed: ${e}`);
    }
};