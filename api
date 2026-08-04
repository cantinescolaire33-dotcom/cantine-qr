async function envoyerScan(qrCode) {

    try {

        const response = await fetch(
            `${CONFIG.API_URL}?action=scan&qr=${encodeURIComponent(qrCode)}`
        );

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        return await response.json();

    } catch (error) {

        console.error("Erreur API :", error);

        return {
            statut: "erreur",
            message: error.message
        };
    }

}
