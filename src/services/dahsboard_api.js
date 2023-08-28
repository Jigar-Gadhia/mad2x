export const dashboard_api = async () => {
    try {
        const response = await fetch("http://staging.webmynehost.com/hospital_demo/services/dashboard.php", {
            method: "get"
        });

        const data = await response.json(); // Assuming the response is JSON data
        return data; // Return the fetched data
    } catch (error) {
        throw error;
    }
}