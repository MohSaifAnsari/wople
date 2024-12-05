document.addEventListener("DOMContentLoaded", () => {
    const cartCountDisplay = document.getElementById("cart-count");
    const favoriteCountDisplay = document.getElementById("favorite-count");

    // Initialize favorites and cart arrays from localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Update navbar counts
    updateCounts();

    // Function to update the display count for favorites and cart
    function updateCounts() {
        favoriteCountDisplay.textContent = favorites.length;
        cartCountDisplay.textContent = cart.length;
    }

    // Save to localStorage
    function saveData() {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Event listeners for product action buttons
    document.querySelectorAll(".box .cart-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const item = getItemDetails(event.target);
            cart.push(item);
            updateCounts();
            saveData();
        });
    });

    document.querySelectorAll(".box .fas.fa-heart").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const item = getItemDetails(event.target);
            favorites.push(item);
            updateCounts();
            saveData();
            alert("Item added to favorites!");
        });
    });

    // Event listener for share buttons in the product section
    document.querySelectorAll(".box .share-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const item = getItemDetails(event.target);
            alert(`Share this item: ${item.title}`);
            // Implement your sharing functionality here, e.g., opening a share dialog or copying a link
        });
    });

    // Function to get item details from the clicked element
    function getItemDetails(element) {
        const productBox = element.closest(".box");
        const imageSrc = productBox.querySelector("img").src;
        const title = productBox.querySelector("h3").textContent;
        const price = productBox.querySelector(".price").textContent;
        return { imageSrc, title, price };
    }

    document.querySelectorAll(".box .fa-share").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const item = getItemDetails(event.target);
            shareItem(item);
        });
    });

    // Function to retrieve item details from the clicked element
    function getItemDetails(element) {
        const productBox = element.closest(".box");
        const imageSrc = productBox.querySelector("img").src;
        const title = productBox.querySelector("h3").textContent;
        const price = productBox.querySelector(".price").textContent;
        return { imageSrc, title, price };
    }

    // Function to handle the sharing action
    function shareItem(item) {
        if (navigator.share) {
            navigator.share({
                title: item.title,
                text: `Check out this amazing product: ${item.title} priced at ${item.price}!`,
                url: window.location.href,
            })
                .then(() => console.log("Share successful"))
                .catch((error) => console.log("Sharing failed", error));
        } else {
            alert(`Share this item:\nTitle: ${item.title}\nPrice: ${item.price}\nImage URL: ${item.imageSrc}`);
            // Fallback for browsers that do not support the Web Share API
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        const toggler = document.getElementById("toggler");
        const navbar = document.querySelector(".navbar");

        // Close navbar when clicking outside
        document.addEventListener("click", (event) => {
            if (!navbar.contains(event.target) && !event.target.matches(".fas.fa-bars")) {
                toggler.checked = false;
            }
        });

        // Close navbar when clicking a link
        document.querySelectorAll(".navbar a").forEach(link => {
            link.addEventListener("click", () => {
                toggler.checked = false;
            });
        });
    });

});
