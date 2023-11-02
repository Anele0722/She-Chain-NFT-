document.addEventListener("DOMContentLoaded", function () {
    const authorizeButton = document.getElementById("authorizeButton");
    const mintButton = document.getElementById("mintButton");
    const issuerSeedInput = document.getElementById("issuerSeed");
    const minterSeedInput = document.getElementById("minterSeed");
    const imageElements = document.querySelectorAll(".image");
    const resultMessage = document.getElementById("resultMessage");

    let selectedImageSrc = "Images"; // Initialize selected image source

    // Add event listeners to image elements
    imageElements.forEach(function (imageElement) {
        imageElement.addEventListener("click", function () {
            // Highlight the selected image
            imageElements.forEach(function (img) {
                img.style.border = "none";
            });
            this.style.border = "2px solid #007BFF";

            selectedImageSrc = this.getAttribute("data-src"); // Store selected image source
        });
    });

    authorizeButton.addEventListener("click", async function () {
        const issuerSeed = issuerSeedInput.value;
        const minterSeed = minterSeedInput.value;

        // Pass the selectedImageSrc to the authorizeMinter function
        const response = await authorizeMinter(issuerSeed, minterSeed, selectedImageSrc);
        showResult(response);
    });

    mintButton.addEventListener("click", async function () {
        const issuerSeed = issuerSeedInput.value;
        const minterSeed = minterSeedInput.value;

        // Pass the selectedImageSrc to the mintNFT function
        const response = await mintNFT(issuerSeed, minterSeed, selectedImageSrc);
        showResult(response);
    });

    function showResult(response) {
        resultMessage.innerText = response.message;
        document.getElementById("result").style.display = "block";
    }

    async function authorizeMinter(issuerSeed, minterSeed, selectedImageSrc) {
        try {
            const formData = new FormData();
            formData.append("issuer_seed", issuerSeed);
            formData.append("minter_seed", minterSeed);
            formData.append("selected_image", selectedImageSrc); // Add the selected image to the form data

            const response = await fetch("/authorize_minter", {
                method: "POST",
                body: formData, // Use form data to send the image
            });

            return response.json();
        } catch (error) {
            return { message: "Error: " + error.message };
        }
    }

    async function mintNFT(issuerSeed, minterSeed, selectedImageSrc) {
        try {
            const formData = new FormData();
            formData.append("issuer_seed", issuerSeed);
            formData.append("minter_seed", minterSeed);
            formData.append("selected_image", selectedImageSrc); // Add the selected image to the form data

            const response = await fetch("/mint_nft", {
                method: "POST",
                body: formData, // Use form data to send the image
            });

            return response.json();
        } catch (error) {
            return { message: "Error: " + error.message };
        }
    }
});
