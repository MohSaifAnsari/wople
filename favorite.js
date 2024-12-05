document.addEventListener("DOMContentLoaded", () => {
    const favoritesList = document.getElementById("favoriteButton");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Display the list of favorite items
    function displayFavorites() {
        favoritesList.innerHTML = "";
        if (favorites.length === 0) {
            favoritesList.innerHTML = "<p>No items in your favorites list.</p>";
        } else {
            favorites.forEach((item, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <img src="${item.imageSrc}" style="width: 50px;" />
                    <span>${item.title} - ${item.price}</span>
                    <button onclick="removeFavorite(${index})">Remove</button>
                `;
                favoritesList.appendChild(listItem);
            });
        }
    }

    // Remove item from favorites
    window.removeFavorite = function(index) {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
    };

    // Display favorites on page load
    displayFavorites();
});
