document.addEventListener("DOMContentLoaded", () => {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to handle adding items to the cart when "add to cart" button is clicked
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link behavior
    
            // Find the nearest parent element that contains the item details
            const itemBox = button.closest('.box');
            const imageSrc = itemBox.querySelector('img').src;
            const title = itemBox.querySelector('h3').textContent;
    
            // Select only the main price (the first price before the crossed-out one)
            const priceElement = itemBox.querySelector('.price');
            const price = priceElement ? priceElement.childNodes[0].nodeValue.trim() : '0';
    
            // Create an item object to add to the cart
            const item = {
                imageSrc: imageSrc,
                title: title,
                price: price
            };
    
            // Call the addToCart function with the item
            addToCart(item);
        });
    });
    

function displayCart() {
    cartList.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
        cartList.innerHTML = "<p>No items in your cart.</p>";
    } else {
        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.className = "cart-item";

            // Ensure item properties exist before using them
            const imageSrc = item.imageSrc || '';
            const title = item.title || 'Unnamed Item';
            const price = item.price || '0';

            listItem.innerHTML = `
                <img src="${imageSrc}" alt="${title}" />
                <span>${title} - ${price}</span>
                <button class="remove-button" data-index="${index}">Remove</button>
            `;
            cartList.appendChild(listItem);

            // Extract numeric value from the price string
            let priceValue = parseFloat(price.replace(/[^0-9.-]+/g, ""));
            if (!isNaN(priceValue)) {
                totalPrice += priceValue;
            }
        });

        // Attach event listeners for remove buttons
        const removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                removeCart(index);
            });
        });
    }

    // Update the total price element
    totalPriceElement.textContent = `₹ ${totalPrice.toFixed(2)}`;
}

function addToCart(item) {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // Update the display after adding an item
}

    window.removeCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart(); // Update the display after removing an item
    };
    function clearCartAfterOrder() {
        // Clear the cart data from localStorage
        localStorage.removeItem("cart");
    
        // Reset the cart array in the script
        cart = [];
    
        // Update the cart display to show it's empty
        displayCart();
    }
    

    displayCart(); // Initial call to display the cart on page load
});
