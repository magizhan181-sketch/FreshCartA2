document.addEventListener("DOMContentLoaded", function () {

    // ELEMENTS
    const searchInput = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".search-box button");
    const productGrid = document.querySelector(".products-grid");
    const categoryCards = document.querySelectorAll(".category-card");

    const cartButton = document.getElementById("cart-button");
    const cartCount = document.getElementById("cart-count");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const resultCount = document.getElementById("product-result-count");
    const showAllButton = document.getElementById("show-all-products");

    // CHECK REQUIRED ELEMENTS
    const requiredElements = {
        searchInput,
        searchButton,
        productGrid,
        cartButton,
        cartCount,
        cartOverlay,
        closeCart,
        cartItems,
        cartTotal,
        resultCount,
        showAllButton
    };

    for (const [name, element] of Object.entries(requiredElements)) {
        if (!element) {
            console.error("FreshCart: Missing HTML element:", name);
            return;
        }
    }


// PRODUCTS
const products = [
    // FRUITS
    {name:"Apples",price:120,unit:"kg",category:"fruits"},
    {name:"Bananas",price:60,unit:"dozen",category:"fruits"},
    {name:"Oranges",price:80,unit:"kg",category:"fruits"},
    {name:"Mangoes",price:100,unit:"kg",category:"fruits"},
    {name:"Grapes",price:90,unit:"kg",category:"fruits"},
    {name:"Pineapple",price:70,unit:"piece",category:"fruits"},
    {name:"Watermelon",price:40,unit:"kg",category:"fruits"},
    {name:"Papaya",price:50,unit:"kg",category:"fruits"},
    {name:"Pomegranate",price:160,unit:"kg",category:"fruits"},
    {name:"Lemon",price:80,unit:"kg",category:"fruits"},

    // VEGETABLES
    {name:"Carrots",price:50,unit:"kg",category:"vegetables"},
    {name:"Tomatoes",price:70,unit:"kg",category:"vegetables"},
    {name:"Potatoes",price:40,unit:"kg",category:"vegetables"},
    {name:"Onions",price:45,unit:"kg",category:"vegetables"},
    {name:"Broccoli",price:90,unit:"piece",category:"vegetables"},
    {name:"Spinach",price:25,unit:"bunch",category:"vegetables"},
    {name:"Green Beans",price:60,unit:"kg",category:"vegetables"},
    {name:"Green Peas",price:80,unit:"kg",category:"vegetables"},
    {name:"Capsicum",price:70,unit:"kg",category:"vegetables"},
    {name:"Beetroot",price:45,unit:"kg",category:"vegetables"},

    // DAIRY
    {name:"Milk",price:30,unit:"litre",category:"dairy"},
    {name:"Paneer",price:180,unit:"kg",category:"dairy"},
    {name:"Curd",price:35,unit:"cup",category:"dairy"},
    {name:"Cheese",price:200,unit:"pack",category:"dairy"},
    {name:"Butter",price:55,unit:"pack",category:"dairy"},
    {name:"Ghee",price:250,unit:"500g",category:"dairy"},
    {name:"Buttermilk",price:20,unit:"bottle",category:"dairy"},
    {name:"Yogurt",price:40,unit:"cup",category:"dairy"},
    {name:"Cream",price:60,unit:"pack",category:"dairy"},
    {name:"Lassi",price:30,unit:"bottle",category:"dairy"},

    // BAKERY
    {name:"Bread",price:40,unit:"pack",category:"bakery"},
    {name:"Brown Bread",price:50,unit:"pack",category:"bakery"},
    {name:"Whole Wheat Bread",price:55,unit:"pack",category:"bakery"},
    {name:"Burger Buns",price:35,unit:"pack",category:"bakery"},
    {name:"Pav Buns",price:30,unit:"pack",category:"bakery"},
    {name:"Chocolate Cake",price:300,unit:"cake",category:"bakery"},
    {name:"Vanilla Cake",price:280,unit:"cake",category:"bakery"},
    {name:"Cupcakes",price:50,unit:"piece",category:"bakery"},
    {name:"Donuts",price:45,unit:"piece",category:"bakery"},
    {name:"Garlic Bread",price:65,unit:"pack",category:"bakery"},

    // BEVERAGES
    {name:"Orange Juice",price:90,unit:"litre",category:"beverages"},
    {name:"Apple Juice",price:100,unit:"litre",category:"beverages"},
    {name:"Mango Juice",price:80,unit:"litre",category:"beverages"},
    {name:"Lemon Juice",price:50,unit:"bottle",category:"beverages"},
    {name:"Coconut Water",price:45,unit:"bottle",category:"beverages"},
    {name:"Green Tea",price:120,unit:"pack",category:"beverages"},
    {name:"Black Tea",price:100,unit:"pack",category:"beverages"},
    {name:"Coffee",price:150,unit:"pack",category:"beverages"},
    {name:"Cold Coffee",price:60,unit:"bottle",category:"beverages"},
    {name:"Mineral Water",price:20,unit:"bottle",category:"beverages"},

    // SNACKS
    {name:"Biscuits",price:50,unit:"pack",category:"snacks"},
    {name:"Potato Chips",price:20,unit:"pack",category:"snacks"},
    {name:"Banana Chips",price:40,unit:"pack",category:"snacks"},
    {name:"Popcorn",price:35,unit:"pack",category:"snacks"},
    {name:"Chocolate Bar",price:40,unit:"piece",category:"snacks"},
    {name:"Peanuts",price:60,unit:"pack",category:"snacks"},
    {name:"Cashew Nuts",price:180,unit:"pack",category:"snacks"},
    {name:"Almonds",price:200,unit:"pack",category:"snacks"},
    {name:"Walnuts",price:220,unit:"pack",category:"snacks"},
    {name:"Roasted Chickpeas",price:40,unit:"pack",category:"snacks"},

    // RICE AND GRAINS
    {name:"Basmati Rice",price:120,unit:"kg",category:"grains"},
    {name:"Brown Rice",price:90,unit:"kg",category:"grains"},
    {name:"Wheat Flour",price:45,unit:"kg",category:"grains"},

    // PULSES AND LENTILS
    {name:"Toor Dal",price:150,unit:"kg",category:"pulses"},
    {name:"Moong Dal",price:130,unit:"kg",category:"pulses"},
    {name:"Chana Dal",price:100,unit:"kg",category:"pulses"},

    // OILS AND SPICES
    {name:"Sunflower Oil",price:140,unit:"litre",category:"oils"},
    {name:"Groundnut Oil",price:180,unit:"litre",category:"oils"},
    {name:"Turmeric Powder",price:40,unit:"pack",category:"oils"},
    {name:"Chilli Powder",price:50,unit:"pack",category:"oils"},
    {name:"Coriander Powder",price:45,unit:"pack",category:"oils"},

    // CLEANING SUPPLIES
    {name:"Dishwash Liquid",price:100,unit:"bottle",category:"cleaning"},
    {name:"Laundry Detergent",price:120,unit:"pack",category:"cleaning"},
    {name:"Floor Cleaner",price:110,unit:"bottle",category:"cleaning"},

    // PERSONAL CARE
    {name:"Bath Soap",price:40,unit:"piece",category:"personal-care"},
    {name:"Shampoo",price:120,unit:"bottle",category:"personal-care"},
    {name:"Toothpaste",price:65,unit:"pack",category:"personal-care"},

    // FROZEN FOODS
    {name:"Frozen Corn",price:85,unit:"pack",category:"frozen"},
    {name:"Frozen French Fries",price:120,unit:"pack",category:"frozen"},
    {name:"Frozen Mixed Vegetables",price:100,unit:"pack",category:"frozen"}
];

// IMAGE FILES
const imageFiles = {
    // FRUITS
    "Apples":"apples.jpg",
    "Bananas":"bananas.jpg",
    "Oranges":"oranges.jpg",
    "Mangoes":"mangoes.jpg",
    "Grapes":"grapes.jpg",
    "Pineapple":"pineapple.jpg",
    "Watermelon":"watermelon.jpg",
    "Papaya":"papaya.jpg",
    "Pomegranate":"pomegranate.jpg",
    "Lemon":"lemon.jpg",

    // VEGETABLES
    "Carrots":"carrots.jpg",
    "Tomatoes":"tomatoes.jpg",
    "Potatoes":"potatoes.jpg",
    "Onions":"onions.jpg",
    "Broccoli":"broccoli.jpg",
    "Spinach":"spinach.jpg",
    "Green Beans":"green_beans.jpg",
    "Green Peas":"green_peas.jpg",
    "Capsicum":"capsicum.jpg",
    "Beetroot":"beetroot.jpg",

    // DAIRY
    "Milk":"milk.jpg",
    "Paneer":"paneer.jpg",
    "Curd":"curd.jpg",
    "Cheese":"cheese.jpg",
    "Butter":"butter.jpg",
    "Ghee":"ghee.jpg",
    "Buttermilk":"buttermilk.jpg",
    "Yogurt":"yogurt.jpg",
    "Cream":"cream.jpg",
    "Lassi":"lassi.jpg",

    // BAKERY
    "Bread":"bread.jpg",
    "Brown Bread":"brown_bread.jpg",
    "Whole Wheat Bread":"whole_wheat_bread.jpg",
    "Burger Buns":"burger_buns.jpg",
    "Pav Buns":"pav_buns.jpg",
    "Chocolate Cake":"chocolate_cake.jpg",
    "Vanilla Cake":"vanilla_cake.jpg",
    "Cupcakes":"cupcakes.jpg",
    "Donuts":"donuts.jpg",
    "Garlic Bread":"garlic_bread.jpg",

    // BEVERAGES
    "Orange Juice":"orange_juice.jpg",
    "Apple Juice":"apple_juice.jpg",
    "Mango Juice":"mango_juice.jpg",
    "Lemon Juice":"lemon_juice.jpg",
    "Coconut Water":"coconut_water.jpg",
    "Green Tea":"green_tea.jpg",
    "Black Tea":"black_tea.jpg",
    "Coffee":"coffee.jpg",
    "Cold Coffee":"cold_coffee.jpg",
    "Mineral Water":"mineral_water.jpg",

    // SNACKS
    "Biscuits":"biscuits.jpg",
    "Potato Chips":"potato_chips.jpg",
    "Banana Chips":"banana_chips.jpg",
    "Popcorn":"popcorn.jpg",
    "Chocolate Bar":"chocolate_bar.jpg",
    "Peanuts":"peanuts.jpg",
    "Cashew Nuts":"cashew_nuts.jpg",
    "Almonds":"almonds.jpg",
    "Walnuts":"walnuts.jpg",
    "Roasted Chickpeas":"roasted_chickpeas.jpg",

    // RICE AND GRAINS
    "Basmati Rice":"basmati_rice.jpg",
    "Brown Rice":"brown_rice.jpg",
    "Wheat Flour":"wheat_flour.jpg",

    // PULSES AND LENTILS
    "Toor Dal":"toor_dal.jpg",
    "Moong Dal":"moong_dal.jpg",
    "Chana Dal":"chana_dal.jpg",

    // OILS AND SPICES
    "Sunflower Oil":"sunflower_oil.jpg",
    "Groundnut Oil":"groundnut_oil.jpg",
    "Turmeric Powder":"turmeric_powder.jpg",
    "Chilli Powder":"chilli_powder.jpg",
    "Coriander Powder":"coriander_powder.jpg",

    // CLEANING SUPPLIES
    "Dishwash Liquid":"dishwash_liquid.jpg",
    "Laundry Detergent":"laundry_detergent.jpg",
    "Floor Cleaner":"floor_cleaner.jpg",

    // PERSONAL CARE
    "Bath Soap":"bath_soap.jpg",
    "Shampoo":"shampoo.jpg",
    "Toothpaste":"toothpaste.jpg",

    // FROZEN FOODS
    "Frozen Corn":"frozen_corn.jpg",
    "Frozen French Fries":"frozen_french_fries.jpg",
    "Frozen Mixed Vegetables":"frozen_mixed_vegetables.jpg"
};

    const categoryEmoji = {
        fruits:"🍎",
        vegetables:"🥕",
        dairy:"🥛",
        bakery:"🍞",
        beverages:"🧃",
        snacks:"🍪",
        grains:"🌾",
        pulses:"🫘",
        oils:"🫒",
        cleaning:"🧹",
        "personal-care":"🧴",
        frozen:"🧊"
    };

    // GENERATE PRODUCT CARDS
    productGrid.innerHTML = products.map(function(product, index) {

        const image = imageFiles[product.name];

        const imageContent = image
            ? `<img src="images/${image}" alt="${product.name}" class="product-image" loading="lazy">`
            : `<div class="product-image-placeholder" role="img" aria-label="${product.name}">${categoryEmoji[product.category]}</div>`;

        return `
            <article class="product-card"
                data-category="${product.category}"
                data-index="${index}"
                data-name="${product.name.toLowerCase()}">

                ${imageContent}

                <h3>${product.name}</h3>
                <p class="price">₹${product.price} / ${product.unit}</p>

                <button type="button" class="add-to-cart">Add to Cart</button>
            </article>
        `;

    }).join("");

    const productCards = productGrid.querySelectorAll(".product-card");

    // LOAD SAVED CART
    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("freshcart-cart") || "[]");

        if (!Array.isArray(cart)) {
            cart = [];
        }

        cart = cart.filter(function(item) {
            return item &&
                typeof item.name === "string" &&
                Number.isFinite(item.price) &&
                Number.isFinite(item.quantity) &&
                item.price >= 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0;
        });

    } catch (error) {
        cart = [];
    }

    // SEARCH AND FILTER
    let selectedCategory = "all";

    function filterProducts() {
        const searchValue = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        productCards.forEach(function(product) {
            const matchesCategory =
                selectedCategory === "all" ||
                product.dataset.category === selectedCategory;

            const matchesSearch =
                product.dataset.name.includes(searchValue);

            const visible = matchesCategory && matchesSearch;

            product.style.display = visible ? "" : "none";

            if (visible) visibleCount++;
        });

        resultCount.textContent = visibleCount + " products found";
    }

    searchInput.addEventListener("input", filterProducts);
    searchButton.addEventListener("click", filterProducts);

    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") filterProducts();
    });

    // CATEGORY FILTERS
    categoryCards.forEach(function(categoryCard) {
        categoryCard.addEventListener("click", function() {
            selectedCategory = categoryCard.dataset.category || "all";
            searchInput.value = "";
            filterProducts();

            document.getElementById("products").scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // VIEW ALL PRODUCTS
    showAllButton.addEventListener("click", function() {
        selectedCategory = "all";
        searchInput.value = "";
        filterProducts();

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });
    });

    // UPDATE CART
    function updateCart() {
        const totalItems = cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);

        const totalPrice = cart.reduce(function(total, item) {
            return total + item.price * item.quantity;
        }, 0);

        try {
            localStorage.setItem("freshcart-cart", JSON.stringify(cart));
        } catch (error) {
            console.error("Could not save the cart:", error);
        }

        cartCount.textContent = totalItems;
        cartTotal.textContent = totalPrice.toFixed(2);

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cartItems.innerHTML = cart.map(function(item, index) {
            return `
                <div class="cart-item">
                    <div class="cart-product-info">
                        <h3>${item.name}</h3>
                        <p>₹${item.price} × ${item.quantity}</p>
                        <strong>
                            Subtotal: ₹${(item.price * item.quantity).toFixed(2)}
                        </strong>
                        <button type="button" class="food-fact-button"
    data-index="${index}">
    🍎 Food Fact
</button>
                    </div>

                    <div class="cart-controls">
                        <button type="button" class="quantity-minus"
                            data-index="${index}" aria-label="Decrease ${item.name}">−</button>

                        <span>${item.quantity}</span>

                        <button type="button" class="quantity-plus"
                            data-index="${index}" aria-label="Increase ${item.name}">+</button>

                        <button type="button" class="remove-cart-item"
                            data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
        }).join("");
    }

    // ADD TO CART
    productGrid.addEventListener("click", function(event) {
        const addButton = event.target.closest(".add-to-cart");
        if (!addButton) return;

        const productCard = addButton.closest(".product-card");
        if (!productCard) return;

        const index = Number(productCard.dataset.index);
        const product = products[index];
        if (!product) return;

        const existingProduct = cart.find(function(item) {
            return item.name === product.name;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        updateCart();

        addButton.textContent = "Added ✓";
        setTimeout(function() {
            addButton.textContent = "Add to Cart";
        }, 1000);
    });
        // FOOD FACT INFORMATION
    function showFoodFact(item) {

    
           const foodFacts = {
    "Basmati Rice": {
        ingredients: "Basmati rice (usually the only ingredient).",
        nutrition: "Mainly carbohydrates. Check the package for exact values.",
        health: "Provides energy. Pair with vegetables and protein.",
        allergens: "Naturally gluten-free; check for cross-contact warnings.",
        alternative: "Brown rice or millets."
    },

    "Ponni Rice": {
        ingredients: "Ponni rice.",
        nutrition: "Mainly carbohydrates.",
        health: "Provides energy as part of balanced meals.",
        allergens: "Naturally gluten-free; check packaging.",
        alternative: "Brown rice or hand-pounded rice."
    },

    "Brown Rice": {
        ingredients: "Whole-grain brown rice.",
        nutrition: "Contains carbohydrates, fibre and some protein.",
        health: "Provides dietary fibre.",
        allergens: "Naturally gluten-free; check packaging.",
        alternative: "Millets or quinoa."
    },

    "Wheat Flour": {
        ingredients: "Wheat grains, usually milled into flour.",
        nutrition: "Contains carbohydrates, protein and fibre.",
        health: "Whole-wheat flour provides more fibre than refined flour.",
        allergens: "Contains gluten.",
        alternative: "Rice flour or certified gluten-free flour."
    },

    "Maida": {
        ingredients: "Refined wheat flour.",
        nutrition: "Mainly carbohydrates with some protein.",
        health: "Usually contains less fibre than whole-wheat flour.",
        allergens: "Contains gluten.",
        alternative: "Whole-wheat flour."
    },

    "Ragi Flour": {
        ingredients: "Finger millet (ragi).",
        nutrition: "Contains carbohydrates, fibre and minerals such as calcium.",
        health: "Can be included in a varied, balanced diet.",
        allergens: "Naturally gluten-free; check cross-contact warnings.",
        alternative: "Jowar flour or bajra flour."
    },

    "Oats": {
        ingredients: "Usually whole oats.",
        nutrition: "Contains carbohydrates, fibre and some protein.",
        health: "Provides dietary fibre.",
        allergens: "Check for gluten cross-contact.",
        alternative: "Ragi or other whole grains."
    }
};
    

        const fact = foodFacts[item.name] || {
            ingredients: "Ingredients vary by brand. Check the product packaging.",
            nutrition: "Check the nutrition label for calories, carbohydrates, protein, fat, fibre and sugar.",
            health: "Nutritional needs vary. Consider the serving size and your overall diet.",
            allergens: "Check the package for allergen declarations and cross-contamination warnings.",
            alternative: "Choose a similar product that matches your dietary needs."
        };

// COMMON INGREDIENTS DATABASE
const commonIngredients = {

    // FRUITS
    "Apples": "Fresh apple.",
    "Bananas": "Fresh banana.",
    "Oranges": "Fresh orange.",
    "Mangoes": "Fresh mango.",
    "Grapes": "Fresh grapes.",
    "Pineapple": "Fresh pineapple.",
    "Watermelon": "Fresh watermelon.",
    "Papaya": "Fresh papaya.",
    "Pomegranate": "Fresh pomegranate.",
    "Guava": "Fresh guava.",
    "Strawberries": "Fresh strawberries.",
    "Kiwi": "Fresh kiwi fruit.",
    "Lemon": "Fresh lemon.",
    "Sweet Lime": "Fresh sweet lime (mosambi).",
    "Dragon Fruit": "Fresh dragon fruit.",
    "Chikoo": "Fresh chikoo (sapodilla).",
    "Pear": "Fresh pear.",
    "Jackfruit": "Fresh jackfruit.",
    "Coconut": "Fresh coconut.",
    "Muskmelon": "Fresh muskmelon.",

    // VEGETABLES
    "Carrots": "Fresh carrots.",
    "Tomatoes": "Fresh tomatoes.",
    "Potatoes": "Fresh potatoes.",
    "Onions": "Fresh onions.",
    "Cabbage": "Fresh cabbage.",
    "Cauliflower": "Fresh cauliflower.",
    "Broccoli": "Fresh broccoli.",
    "Spinach": "Fresh spinach leaves.",
    "Cucumber": "Fresh cucumber.",
    "Brinjal": "Fresh brinjal (eggplant).",
    "Green Beans": "Fresh green beans.",
    "Green Peas": "Fresh green peas.",
    "Capsicum": "Fresh capsicum (bell pepper).",
    "Beetroot": "Fresh beetroot.",
    "Radish": "Fresh radish.",
    "Pumpkin": "Fresh pumpkin.",
    "Bitter Gourd": "Fresh bitter gourd.",
    "Bottle Gourd": "Fresh bottle gourd.",
    "Lady Finger": "Fresh okra (lady finger).",
    "Sweet Potato": "Fresh sweet potato.",

    // DAIRY
    "Milk": "Milk.",
    "Paneer": "Milk and a food acid such as lemon juice or citric acid.",
    "Curd": "Milk and live bacterial cultures.",
    "Cheese": "Milk, starter cultures, salt and a coagulant.",
    "Butter": "Cream or milk fat, sometimes salt.",
    "Ghee": "Clarified butter (milk fat).",
    "Buttermilk": "Milk or cultured milk, sometimes salt.",
    "Yogurt": "Milk and live yogurt cultures.",
    "Cream": "Milk cream.",
    "Flavoured Milk": "Milk, sugar or sweetener, flavouring and sometimes cocoa or fruit flavour.",
    "Mozzarella Cheese": "Milk, starter cultures, salt and coagulant.",
    "Condensed Milk": "Milk and sugar.",
    "Fresh Cheese": "Milk, food acid or coagulant and sometimes salt.",
    "Lassi": "Yogurt or curd, water or milk, and sometimes sugar or salt.",
    "Milk Powder": "Milk.",

    // BAKERY
    "Bread": "Common recipe: wheat flour, water, yeast, salt and sometimes sugar and oil.",
    "Brown Bread": "Common recipe: whole-wheat flour, water, yeast and salt.",
    "Whole Wheat Bread": "Common recipe: whole-wheat flour, water, yeast, salt and sometimes oil.",
    "Burger Buns": "Common recipe: wheat flour, water or milk, yeast, sugar, oil and salt.",
    "Pav Buns": "Common recipe: wheat flour, water or milk, yeast, sugar, oil and salt.",
    "Croissant": "Common recipe: wheat flour, butter, water or milk, yeast, sugar and salt.",
    "Chocolate Cake": "Common recipe: wheat flour, sugar, cocoa, eggs, oil or butter and raising agents.",
    "Vanilla Cake": "Common recipe: wheat flour, sugar, eggs, butter or oil, milk and vanilla.",
    "Muffins": "Common recipe: wheat flour, sugar, eggs, milk or yogurt, oil and raising agents.",
    "Cupcakes": "Common recipe: wheat flour, sugar, eggs, butter or oil, milk and flavouring.",
    "Donuts": "Common recipe: wheat flour, sugar, yeast, milk or water, eggs and oil.",
    "Garlic Bread": "Common recipe: bread, garlic, butter or oil, herbs and salt.",
    "Rusk": "Common recipe: wheat flour, sugar, yeast, oil or butter and salt.",
    "Pizza Base": "Common recipe: wheat flour, water, yeast, salt and oil.",
    "Cookies": "Common recipe: wheat flour, sugar, butter or oil and sometimes eggs and flavouring.",

    // BEVERAGES
    "Orange Juice": "Orange juice; packaged versions may contain additional ingredients.",
    "Apple Juice": "Apple juice; packaged versions may contain additional ingredients.",
    "Mango Juice": "Mango pulp or juice, water and sometimes sugar.",
    "Lemon Juice": "Lemon juice and sometimes water, salt or sugar.",
    "Coconut Water": "Coconut water.",
    "Green Tea": "Green tea leaves.",
    "Black Tea": "Black tea leaves.",
    "Coffee": "Roasted coffee beans, ground or instant.",
    "Cold Coffee": "Common recipe: milk, coffee, sugar and sometimes cocoa or flavouring.",
    "Mineral Water": "Water with naturally occurring or added minerals.",
    "Soda": "Carbonated water; flavoured varieties may contain sweeteners and flavourings.",
    "Grape Juice": "Grape juice; packaged versions may contain additional ingredients.",
    "Pineapple Juice": "Pineapple juice; packaged versions may contain additional ingredients.",
    "Iced Tea": "Common recipe: brewed tea, water, sugar and lemon or other flavouring.",
    "Hot Chocolate Mix": "Common recipe: cocoa powder, sugar and sometimes milk powder and flavouring.",

    // SNACKS
    "Biscuits": "Common recipe: wheat flour, sugar, edible oil or butter, salt and raising agents.",
    "Potato Chips": "Common recipe: potatoes, edible oil and salt; flavoured varieties contain seasonings.",
    "Banana Chips": "Common recipe: banana slices, edible oil and sometimes salt or spices.",
    "Popcorn": "Corn kernels; prepared varieties may contain oil, salt or flavouring.",
    "Chocolate Bar": "Common recipe: cocoa solids, cocoa butter, sugar and sometimes milk.",
    "Peanuts": "Peanuts; roasted or salted versions may contain oil and salt.",
    "Cashew Nuts": "Cashew nuts; roasted or salted versions may contain oil and salt.",
    "Almonds": "Almonds; flavoured varieties may contain oil, salt or seasonings.",
    "Walnuts": "Walnuts; flavoured varieties may contain oil, salt or seasonings.",
    "Mixture": "Common recipe: fried gram flour noodles, peanuts, lentils, edible oil, spices and salt.",
    "Murukku": "Common recipe: rice flour, urad dal flour, butter or oil, sesame or cumin and salt.",
    "Potato Wafers": "Common recipe: potatoes, edible oil, salt and sometimes seasonings.",
    "Roasted Chickpeas": "Chickpeas, sometimes with oil, salt and spices.",
    "Trail Mix": "Common mixture: nuts, seeds and dried fruits; some varieties include chocolate.",
    "Chocolate Cookies": "Common recipe: wheat flour, sugar, butter or oil, cocoa and sometimes chocolate chips and eggs.",

    // RICE AND GRAINS
    "Basmati Rice": "Basmati rice.",
    "Ponni Rice": "Ponni rice.",
    "Brown Rice": "Whole-grain brown rice.",
    "Idli Rice": "Idli rice.",
    "Wheat Flour": "Milled wheat grains.",
    "Maida": "Refined wheat flour.",
    "Ragi Flour": "Finger millet (ragi).",
    "Oats": "Whole oats.",

    // PULSES AND LENTILS
    "Toor Dal": "Split pigeon peas.",
    "Moong Dal": "Split mung beans.",
    "Chana Dal": "Split Bengal gram (chickpeas).",
    "Urad Dal": "Split or whole black gram.",
    "Masoor Dal": "Split red lentils.",
    "Black Chickpeas": "Whole black chickpeas (kala chana).",
    "White Chickpeas": "Whole white chickpeas (kabuli chana).",
    "Rajma": "Kidney beans.",

    // OILS AND SPICES
    "Sunflower Oil": "Sunflower seed oil.",
    "Groundnut Oil": "Groundnut (peanut) oil.",
    "Coconut Oil": "Coconut oil.",
    "Mustard Oil": "Mustard seed oil.",
    "Turmeric Powder": "Dried turmeric rhizome, ground into powder.",
    "Chilli Powder": "Dried red chillies, ground into powder.",
    "Coriander Powder": "Dried coriander seeds, ground into powder.",
    "Black Pepper": "Dried black peppercorns.",
    "Cumin Seeds": "Dried cumin seeds.",
    "Garam Masala": "Common blend: coriander, cumin, cardamom, cloves, cinnamon and pepper.",

    // CLEANING SUPPLIES
    "Dishwash Liquid": "Common formulation: water, surfactants, cleaning agents, fragrance and preservatives.",
    "Laundry Detergent": "Common formulation: surfactants, water or fillers, cleaning builders, enzymes and fragrance.",
    "Floor Cleaner": "Common formulation: water, cleaning agents, surfactants and sometimes fragrance and disinfecting ingredients.",
    "Toilet Cleaner": "Common formulation: water, cleaning acids or other cleaning agents, fragrance and colour.",
    "Scrub Sponge": "Common materials: polyurethane foam, cellulose or other sponge material and sometimes an abrasive layer.",
    "Garbage Bags": "Common material: polyethylene plastic.",
    "Cleaning Cloth": "Common materials: cotton, microfiber polyester or other textile fibres.",
    "Handwash Refill": "Common formulation: water, surfactants, moisturising agents, fragrance and preservatives.",

    // PERSONAL CARE
    "Bath Soap": "Common formulation: soap salts or cleansing agents, water, fragrance and moisturising ingredients.",
    "Shampoo": "Common formulation: water, cleansing surfactants, conditioning agents, fragrance and preservatives.",
    "Toothpaste": "Common formulation: fluoride compound, mild abrasives, humectants, flavouring and foaming agents.",
    "Toothbrush": "Common materials: plastic handle and nylon bristles.",
    "Handwash": "Common formulation: water, surfactants, moisturising agents, fragrance and preservatives.",
    "Body Lotion": "Common formulation: water, oils, moisturisers, emulsifiers and preservatives.",
    "Hair Oil": "Common formulation: coconut, mineral or other vegetable oils, sometimes with fragrance or herbal extracts.",
    "Face Wash": "Common formulation: water, cleansing agents, moisturisers and sometimes fragrance.",

    // FROZEN FOODS
    "Frozen Peas": "Green peas.",
    "Frozen Corn": "Sweet corn kernels.",
    "Frozen French Fries": "Common recipe: potatoes and sometimes vegetable oil, salt and coating ingredients.",
    "Frozen Mixed Vegetables": "Common mixture: peas, carrots, beans, corn and other vegetables.",
    "Frozen Paratha": "Common recipe: wheat flour, water, oil or ghee and salt.",
    "Frozen Sweet Corn": "Sweet corn kernels.",
    "Frozen Paneer": "Paneer made from milk and a food acid or coagulant.",
    "Frozen Berries": "Mixed berries, such as strawberries, blueberries and raspberries."
};


        const oldModal = document.getElementById("food-fact-modal");
        if (oldModal) oldModal.remove();

        const modal = document.createElement("div");
        modal.id = "food-fact-modal";

        modal.innerHTML = `
            <div class="food-fact-content">
                <button class="food-fact-close" aria-label="Close">×</button>

                <h2>🍎 Food Facts</h2>
                <h3>${item.name}</h3>

                <p><strong>Common ingredients:</strong> ${commonIngredients[item.name] || fact.ingredients}</p>
                <p><strong>Nutrition:</strong> ${fact.nutrition}</p>
                <p><strong>Health information:</strong> ${fact.health}</p>
                <p><strong>Allergens:</strong> ${fact.allergens}</p>
                <p><strong>Alternative:</strong> ${fact.alternative}</p>

                <p class="food-fact-note">
                    Always check the actual product label for accurate information.
                </p>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".food-fact-close").addEventListener("click", function() {
            modal.remove();
        });

        modal.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.remove();
            }
        });
    }
        

    // CART QUANTITY AND REMOVE
    cartItems.addEventListener("click", function(event) {
    console.log("Cart click detected!");
    // FOOD FACT BUTTON
    const foodFactButton = event.target.closest(".food-fact-button");

    if (foodFactButton) {
        console.log("Food Fact button clicked!");
        const foodIndex = Number(foodFactButton.dataset.index);


        if (Number.isInteger(foodIndex) && cart[foodIndex]) {
            showFoodFact(cart[foodIndex]);
        }

        return;
    }

    // QUANTITY AND REMOVE BUTTONS
    const target = event.target.closest("button[data-index]");
    if (!target) return;

    const index = Number(target.dataset.index);
    if (!Number.isInteger(index) || !cart[index]) return;

    if (target.classList.contains("quantity-plus")) {
        cart[index].quantity++;

    } else if (target.classList.contains("quantity-minus")) {
        cart[index].quantity--;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

    } else if (target.classList.contains("remove-cart-item")) {
        cart.splice(index, 1);

    } else {
        return;
    }

    updateCart();
});

    // OPEN CART
    cartButton.addEventListener("click", function() {
        cartOverlay.classList.add("show");
    });

    // CLOSE CART
    function closeCartWindow() {
        cartOverlay.classList.remove("show");
    }

    closeCart.addEventListener("click", closeCartWindow);

    cartOverlay.addEventListener("click", function(event) {
        if (event.target === cartOverlay) {
            closeCartWindow();
        }
    });

    // ESCAPE KEY CLOSES CART
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeCartWindow();
        }
    });
    // =====================================
    // SMART KITCHEN - INGREDIENT INVENTORY
    // =====================================

    const ingredientInput = document.getElementById("ingredient-input");
    const addIngredientButton = document.getElementById("add-ingredient");
    const ingredientList = document.getElementById("ingredient-list");
    const ingredientMessage = document.getElementById("ingredient-message");
    const findRecipesButton = document.getElementById("find-recipes");
    const recipeResults = document.getElementById("recipe-results");

    let kitchenIngredients = [];

    function displayIngredients() {

        if (!ingredientList) return;

        if (kitchenIngredients.length === 0) {
            ingredientList.innerHTML = "<p>No ingredients added yet.</p>";
            return;
        }

        ingredientList.innerHTML = kitchenIngredients.map(function(item, index) {
            return `
                <div class="ingredient-item">
                    <span>${item}</span>
                    <button type="button" class="remove-ingredient"
                        data-index="${index}"
                        aria-label="Remove ${item}">
                        Remove
                    </button>
                </div>
            `;
        }).join("");
    }

    function addIngredient() {

        const ingredient = ingredientInput.value.trim();

        if (!ingredient) {
            ingredientMessage.textContent = "Please enter an ingredient.";
            return;
        }

        const alreadyExists = kitchenIngredients.some(function(item) {
            return item.toLowerCase() === ingredient.toLowerCase();
        });

        if (alreadyExists) {
            ingredientMessage.textContent = "This ingredient is already added.";
            return;
        }

        kitchenIngredients.push(ingredient);

        ingredientInput.value = "";
        ingredientMessage.textContent = ingredient + " added successfully.";

        displayIngredients();
    }

    if (addIngredientButton && ingredientInput) {

        addIngredientButton.addEventListener("click", addIngredient);

        ingredientInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                addIngredient();
            }
        });
    }

    if (ingredientList) {

        ingredientList.addEventListener("click", function(event) {

            const removeButton = event.target.closest(".remove-ingredient");

            if (!removeButton) return;

            const index = Number(removeButton.dataset.index);

            if (!Number.isInteger(index) || !kitchenIngredients[index]) return;

            kitchenIngredients.splice(index, 1);

            ingredientMessage.textContent = "Ingredient removed.";

            displayIngredients();
        });
    }

    displayIngredients();


    // =====================================
    // SMART KITCHEN - RECIPE SUGGESTIONS
    // =====================================

    const recipes = [

        {
            name: "Tomato Rice",
            emoji: "🍅",
            ingredients: ["Rice", "Tomatoes", "Onions"],
            instructions: "Cook rice. Prepare a tomato and onion mixture with suitable spices, then combine."
        },

        {
            name: "Vegetable Sandwich",
            emoji: "🥪",
            ingredients: ["Bread", "Tomatoes", "Cucumber", "Carrots"],
            instructions: "Slice the vegetables, place them between bread slices and serve."
        },

        {
            name: "Paneer Salad",
            emoji: "🥗",
            ingredients: ["Paneer", "Tomatoes", "Cucumber", "Carrots"],
            instructions: "Combine chopped vegetables with paneer and your preferred dressing."
        },

        {
            name: "Potato Masala",
            emoji: "🥔",
            ingredients: ["Potatoes", "Onions", "Tomatoes"],
            instructions: "Cook potatoes with onions, tomatoes and suitable spices."
        },

        {
            name: "Banana Smoothie",
            emoji: "🥤",
            ingredients: ["Bananas", "Milk"],
            instructions: "Blend banana and milk until smooth. Serve immediately."
        },

        {
            name: "Vegetable Pulao",
            emoji: "🍚",
            ingredients: ["Rice", "Carrots", "Green Peas", "Onions"],
            instructions: "Cook rice with vegetables and suitable spices until done."
        }
    ];

    // Keep the exact recipe results currently displayed.
    let displayedMatchingRecipes = [];

    // FIND RECIPES USING AVAILABLE INGREDIENTS
    function findRecipes() {

        if (!recipeResults) return;

        if (kitchenIngredients.length === 0) {
            displayedMatchingRecipes = [];
            recipeResults.innerHTML =
                "<h3>🍽️ Recipe Suggestions</h3><p>Please add ingredients first.</p>";
            return;
        }

        const availableIngredients = kitchenIngredients.map(function(item) {
            return item.toLowerCase().trim();
        });

        const matchingRecipes = recipes.map(function(recipe) {

            const missingIngredients = recipe.ingredients.filter(function(item) {
                return !availableIngredients.includes(item.toLowerCase());
            });

            return {
                ...recipe,
                missingIngredients: missingIngredients
            };

        }).filter(function(recipe) {

            return recipe.missingIngredients.length < recipe.ingredients.length;

        });

        displayedMatchingRecipes = matchingRecipes;

        if (matchingRecipes.length === 0) {
            recipeResults.innerHTML =
                "<h3>🍽️ Recipe Suggestions</h3><p>No matching recipes found. Try adding more ingredients.</p>";
            return;
        }

        recipeResults.innerHTML =
            "<h3>🍽️ Recipe Suggestions</h3>" +

            matchingRecipes.map(function(recipe) {

                const missingHTML = recipe.missingIngredients.length === 0
                    ? "<p>✅ You have all the ingredients!</p>"
                    : "<p><strong>Missing:</strong> " +
                      recipe.missingIngredients.join(", ") + "</p>";

                return `
                    <div class="recipe-card">

                        <h3>${recipe.emoji} ${recipe.name}</h3>

                        <p>
                            <strong>Ingredients:</strong>
                            ${recipe.ingredients.join(", ")}
                        </p>

                        ${missingHTML}

                        <p>
                            <strong>Instructions:</strong>
                            ${recipe.instructions}
                        </p>

                        ${
                            recipe.missingIngredients.length > 0
                            ? `<button type="button"
                                class="add-missing-ingredients"
                                data-recipe="${recipe.name}">
                                🛒 Add Missing Ingredients
                              </button>`
                            : ""
                        }

                    </div>
                `;

            }).join("");
    }

    if (findRecipesButton) {
        findRecipesButton.addEventListener("click", findRecipes);
    }


    // =====================================
    // SMART KITCHEN - ADD MISSING ITEMS TO CART
    // =====================================

    const ingredientProductNames = {
        "Rice": "Ponni Rice",
        "Tomatoes": "Tomatoes",
        "Onions": "Onions",
        "Bread": "Bread",
        "Cucumber": "Cucumber",
        "Carrots": "Carrots",
        "Paneer": "Paneer",
        "Potatoes": "Potatoes",
        "Bananas": "Bananas",
        "Milk": "Milk",
        "Green Peas": "Green Peas"
    };

    if (recipeResults) {

        recipeResults.addEventListener("click", function(event) {

            const addButton = event.target.closest(".add-missing-ingredients");

            if (!addButton) return;

            const recipeName = addButton.dataset.recipe;

            const selectedRecipe = displayedMatchingRecipes.find(function(recipe) {
                return recipe.name === recipeName;
            });

            if (!selectedRecipe) {
                ingredientMessage.textContent = "Recipe not found.";
                return;
            }

            if (!selectedRecipe.missingIngredients) {
                ingredientMessage.textContent = "Please find recipes again.";
                return;
            }

            let addedCount = 0;
            const unavailableProducts = [];

            selectedRecipe.missingIngredients.forEach(function(ingredient) {

                const productName = ingredientProductNames[ingredient] || ingredient;

                const product = products.find(function(item) {
                    return item.name.toLowerCase() === productName.toLowerCase();
                });

                if (!product) {
                    unavailableProducts.push(ingredient);
                    return;
                }

                const existingProduct = cart.find(function(item) {
                    return item.name === product.name;
                });

                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.push({
                        name: product.name,
                        price: product.price,
                        quantity: 1
                    });
                }

                addedCount++;
            });

            updateCart();

            if (addedCount > 0 && unavailableProducts.length === 0) {

                ingredientMessage.textContent =
                    addedCount + " missing ingredient(s) added to your cart!";

                addButton.textContent = "Added to Cart ✓";

                addButton.disabled = true;

            } else if (addedCount > 0 && unavailableProducts.length > 0) {

                ingredientMessage.textContent =
                    addedCount + " item(s) added. Not available: " +
                    unavailableProducts.join(", ");

            } else {

                ingredientMessage.textContent =
                    "These missing ingredients are not available in the product catalogue.";

            }

        });
    }
    // =====================================
    // CHECKOUT - INSTANT ORDER CONFIRMATION
    // =====================================

    const checkoutButton = document.querySelector(".checkout-button");

    if (checkoutButton) {
        checkoutButton.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            if (cart.length === 0) {
                alert("Your cart is empty. Please add products before checkout.");
                return;
            }

            closeCartWindow();

            const orderId = "FC-" + String(Date.now()).slice(-6);

            cart = [];
            updateCart();

            const backdrop = document.createElement("div");
            backdrop.className = "fc-confirmation-backdrop";
            backdrop.setAttribute("role", "dialog");
            backdrop.setAttribute("aria-modal", "true");
            backdrop.setAttribute("aria-labelledby", "fc-confirmation-title");

            backdrop.innerHTML = `
                <div class="fc-confirmation-card">
                    <button type="button" class="fc-confirmation-close"
                        aria-label="Close confirmation">&times;</button>

                    <div class="fc-success-icon" aria-hidden="true">
                        <svg viewBox="0 0 52 52" focusable="false">
                            <circle cx="26" cy="26" r="24" fill="none"></circle>
                            <path d="M14 27l8 8 16-18" fill="none"></path>
                        </svg>
                    </div>

                    <h2 id="fc-confirmation-title">Order Confirmed!</h2>

                    <p class="fc-confirmation-message">
                        Thank you for shopping with FreshCart.
                    </p>

                    <div class="fc-order-details">
                        <p><strong>Order ID:</strong> <span>${orderId}</span></p>
                        <p><strong>Estimated delivery:</strong> 30–45 minutes</p>
                    </div>

                    <p class="fc-confirmation-note">
                        Your groceries are getting ready.
                    </p>

                    <button type="button" class="fc-confirmation-button">
                        Continue Shopping
                    </button>
                </div>
            `;

            document.body.appendChild(backdrop);

            const colors = [
                "#39b54a",
                "#ffca28",
                "#ff7043",
                "#42a5f5",
                "#ab47bc"
            ];

            for (let i = 0; i < 32; i++) {
                const piece = document.createElement("span");
                piece.className = "fc-confetti";
                piece.style.left = Math.random() * 100 + "%";
                piece.style.backgroundColor = colors[i % colors.length];
                piece.style.animationDelay = Math.random() * 0.8 + "s";
                piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";
                backdrop.appendChild(piece);
            }

            function closeConfirmation() {
                backdrop.remove();
            }

            backdrop.querySelector(".fc-confirmation-close")
                .addEventListener("click", closeConfirmation);

            backdrop.querySelector(".fc-confirmation-button")
                .addEventListener("click", function() {
                    closeConfirmation();

                    selectedCategory = "all";
                    searchInput.value = "";
                    filterProducts();

                    const productsSection = document.getElementById("products");

                    if (productsSection) {
                        productsSection.scrollIntoView({ behavior: "smooth" });
                    }
                });

            backdrop.addEventListener("click", function(popupEvent) {
                if (popupEvent.target === backdrop) {
                    closeConfirmation();
                }
            });

            function escapeHandler(keyEvent) {
                if (keyEvent.key === "Escape") {
                    closeConfirmation();
                    document.removeEventListener("keydown", escapeHandler);
                }
            }

            document.addEventListener("keydown", escapeHandler);
        });
    }


    // =====================================
    // INITIAL DISPLAY
    // =====================================

    updateCart();
    filterProducts();

    console.log("FreshCart loaded with " + products.length + " products.");

});




// =====================================
// SMART MEAL PLANNER - ADVANCED
// AND CUSTOMIZATION
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    const mealPlannerSection = document.getElementById("meal-planner");

    if (!mealPlannerSection) {
        console.error("Meal Planner section not found.");
        return;
    }

    // =====================================
    // PREGNANCY MEALS
    // =====================================

    const pregnancyMeals = {

        1: [
            "Breakfast: well-cooked oats with pasteurized milk and fruit",
            "Lunch: rice with dal and cooked vegetables",
            "Snack: washed apple or banana with yogurt",
            "Dinner: chapati with well-cooked vegetables and paneer"
        ],

        2: [
            "Breakfast: idli with sambar",
            "Lunch: rice with spinach dal and cooked vegetables",
            "Snack: pasteurized yogurt with fruit",
            "Dinner: chapati with well-cooked beans and vegetables"
        ],

        3: [
            "Breakfast: vegetable dosa with sambar",
            "Lunch: rice with dal, carrots and beans",
            "Snack: washed seasonal fruit and nuts, if suitable",
            "Dinner: chapati with cooked vegetables and well-cooked egg"
        ],

        4: [
            "Breakfast: oats with pasteurized milk and banana",
            "Lunch: rice with chickpea curry and cooked vegetables",
            "Snack: pasteurized yogurt and fruit",
            "Dinner: chapati with dal and cooked greens"
        ],

        5: [
            "Breakfast: vegetable upma with sambar",
            "Lunch: rice with dal, beetroot and cooked vegetables",
            "Snack: fruit with pasteurized yogurt",
            "Dinner: chapati with paneer and cooked vegetables"
        ],

        6: [
            "Breakfast: idli with sambar and fruit",
            "Lunch: rice with beans, dal and cooked vegetables",
            "Snack: banana and a small serving of nuts, if suitable",
            "Dinner: chapati with well-cooked egg and vegetables"
        ],

        7: [
            "Breakfast: well-cooked oats with milk and fruit",
            "Lunch: rice with dal and cooked leafy vegetables",
            "Snack: pasteurized yogurt with washed fruit",
            "Dinner: chapati with chickpeas and cooked vegetables"
        ],

        8: [
            "Breakfast: dosa with sambar",
            "Lunch: rice with dal and mixed cooked vegetables",
            "Snack: fruit and pasteurized yogurt",
            "Dinner: chapati with paneer and cooked greens"
        ],

        9: [
            "Breakfast: idli with sambar",
            "Lunch: rice with dal and cooked vegetables",
            "Snack: washed fruit with pasteurized yogurt",
            "Dinner: chapati with well-cooked beans and vegetables"
        ]

    };


    // =====================================
    // FITNESS MEALS
    // =====================================

    const fitnessMeals = {

        general: {
            title: "General Fitness",
            meals: [
                "Breakfast: idli with sambar and fruit",
                "Lunch: rice or chapati with dal, vegetables and curd",
                "Snack: banana with yogurt",
                "Dinner: chapati with paneer or beans and vegetables"
            ]
        },

        muscle: {
            title: "Muscle Building",
            meals: [
                "Breakfast: oats with milk and nuts",
                "Lunch: rice with dal, paneer and vegetables",
                "Snack: yogurt with banana",
                "Dinner: chapati with well-cooked egg or beans and vegetables"
            ]
        },

        stamina: {
            title: "Improving Stamina",
            meals: [
                "Breakfast: dosa with sambar and fruit",
                "Lunch: rice with dal and cooked vegetables",
                "Snack: banana with yogurt",
                "Dinner: chapati with beans or paneer and vegetables"
            ]
        }

    };


    // =====================================
    // DIABETES MEALS
    // =====================================

    const diabetesMeals = {

        breakfast: [
            "Vegetable oats with unsweetened yogurt",
            "Idli with sambar and vegetables",
            "Vegetable dosa with sambar"
        ],

        lunch: [
            "A suitable portion of rice with dal and non-starchy vegetables",
            "Chapati with chickpeas and cooked vegetables",
            "Rice with beans, vegetables and curd"
        ],

        dinner: [
            "Chapati with dal and cooked vegetables",
            "Vegetable soup with beans and a suitable grain food",
            "Paneer or beans with vegetables and chapati"
        ]

    };


    // =====================================
    // PLAN INFORMATION
    // =====================================

    const mealPlans = {

        pregnancy: {
            icon: "🤰",
            title: "Pregnancy Meal Ideas",
            description: "Explore general balanced-food ideas for different stages.",
            note: "These are general food ideas, not medically tailored pregnancy diets. Follow guidance from a qualified healthcare professional."
        },

        fitness: {
            icon: "💪",
            title: "Fitness Meal Ideas",
            description: "Explore balanced meal ideas based on your selected goal.",
            note: "These suggestions are general food ideas. Individual needs differ."
        },

        diabetes: {
            icon: "🥗",
            title: "Diabetes-Friendly Meal Ideas",
            description: "Explore general balanced-food ideas for different meals.",
            note: "These are not a personal diabetes meal plan. Follow guidance from a qualified healthcare professional."
        }

    };


    // Remember the user's selections while using the page.

    const selectedChoices = {
        pregnancy: "1",
        fitness: "general",
        diabetes: "breakfast"
    };


    let activePopup = null;


    // =====================================
    // GET MEALS FOR EACH PLAN
    // =====================================

    function getSelectedMeals(planKey) {

        if (planKey === "pregnancy") {
            return pregnancyMeals[selectedChoices.pregnancy];
        }

        if (planKey === "fitness") {
            return fitnessMeals[selectedChoices.fitness].meals;
        }

        if (planKey === "diabetes") {
            return diabetesMeals[selectedChoices.diabetes];
        }

        return [];
    }


    // =====================================
    // CLOSE POPUP
    // =====================================

    function closeMealPopup() {

        if (activePopup) {
            activePopup.remove();
            activePopup = null;
        }

        document.removeEventListener("keydown", handlePopupKeydown);
    }


    function handlePopupKeydown(event) {

        if (event.key === "Escape") {
            closeMealPopup();
        }

    }


    // =====================================
    // CREATE POPUP
    // =====================================

    function createPopup(titleText, iconText) {

        closeMealPopup();

        const overlay = document.createElement("div");
        overlay.className = "meal-popup-overlay active";

        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", titleText);

        const box = document.createElement("div");
        box.className = "meal-popup-box";

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "meal-popup-close";
        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Close popup");

        closeButton.addEventListener("click", closeMealPopup);

        const icon = document.createElement("div");
        icon.className = "meal-popup-icon";
        icon.textContent = iconText;

        const title = document.createElement("h2");
        title.textContent = titleText;

        box.append(closeButton, icon, title);

        overlay.appendChild(box);

        overlay.addEventListener("click", function(event) {

            if (event.target === overlay) {
                closeMealPopup();
            }

        });

        document.body.appendChild(overlay);

        activePopup = overlay;

        document.addEventListener("keydown", handlePopupKeydown);

        closeButton.focus();

        return box;
    }


    // =====================================
    // ADD MEAL LIST
    // =====================================

    function addMealList(box, meals) {

        const details = document.createElement("div");
        details.id = "meal-popup-details";

        const list = document.createElement("ul");

        meals.forEach(function(meal) {

            const item = document.createElement("li");
            item.textContent = meal;

            list.appendChild(item);

        });

        details.appendChild(list);
        box.appendChild(details);

        return list;
    }


    // =====================================
    // ADVANCED MEAL PLANNER
    // =====================================

    function openAdvancedPopup(planKey) {

        const plan = mealPlans[planKey];

        if (!plan) return;

        const box = createPopup(plan.title, plan.icon);

        const description = document.createElement("p");
        description.textContent = plan.description;

        box.appendChild(description);

        const selectorSection = document.createElement("div");
        selectorSection.className = "pregnancy-popup-selector";

        const label = document.createElement("label");
        const selector = document.createElement("select");

        selector.id = "meal-plan-selection";


        // PREGNANCY

        if (planKey === "pregnancy") {

            label.textContent = "Select Pregnancy Month:";

            for (let month = 1; month <= 9; month++) {

                const option = document.createElement("option");
                option.value = month;
                option.textContent = "Month " + month;

                selector.appendChild(option);

            }

            selector.value = selectedChoices.pregnancy;

        }


        // FITNESS

        else if (planKey === "fitness") {

            label.textContent = "Select Fitness Goal:";

            const options = [
                ["general", "General Fitness"],
                ["muscle", "Muscle Building"],
                ["stamina", "Improving Stamina"]
            ];

            options.forEach(function(data) {

                const option = document.createElement("option");
                option.value = data[0];
                option.textContent = data[1];

                selector.appendChild(option);

            });

            selector.value = selectedChoices.fitness;

        }


        // DIABETES

        else if (planKey === "diabetes") {

            label.textContent = "Select Meal Type:";

            const options = [
                ["breakfast", "Breakfast"],
                ["lunch", "Lunch"],
                ["dinner", "Dinner"]
            ];

            options.forEach(function(data) {

                const option = document.createElement("option");
                option.value = data[0];
                option.textContent = data[1];

                selector.appendChild(option);

            });

            selector.value = selectedChoices.diabetes;

        }


        label.setAttribute("for", selector.id);

        selectorSection.append(label, selector);
        box.appendChild(selectorSection);


        // MEAL LIST

        const list = addMealList(box, getSelectedMeals(planKey));


        // AUTOMATIC UPDATE

        selector.addEventListener("change", function() {

            selectedChoices[planKey] = this.value;

            list.innerHTML = "";

            getSelectedMeals(planKey).forEach(function(meal) {

                const item = document.createElement("li");
                item.textContent = meal;

                list.appendChild(item);

            });

        });


        // NOTE

        const note = document.createElement("p");
        note.className = "meal-plan-note";
        note.textContent = plan.note;

        box.appendChild(note);


        // DONE

        const doneButton = document.createElement("button");
        doneButton.type = "button";
        doneButton.className = "meal-popup-done";
        doneButton.textContent = "Done";

        doneButton.addEventListener("click", closeMealPopup);

        box.appendChild(doneButton);

    }


    // =====================================
    // CUSTOMIZE MEAL PLANNER
    // =====================================

    function openCustomizePopup(planKey) {

        const plan = mealPlans[planKey];

        if (!plan) return;

        const box = createPopup(
            "Customize " + plan.title,
            "⚙️"
        );

        const description = document.createElement("p");
        description.textContent =
            "Choose your food preferences to adjust the general meal suggestions.";

        box.appendChild(description);


        // FOOD PREFERENCE

        const preferenceLabel = document.createElement("label");
        preferenceLabel.textContent = "Food Preference:";

        const preferenceSelect = document.createElement("select");

        const preferenceOptions = [
            ["vegetarian", "Vegetarian"],
            ["egg", "Vegetarian + Eggs"],
            ["any", "No Preference"]
        ];

        preferenceOptions.forEach(function(data) {

            const option = document.createElement("option");
            option.value = data[0];
            option.textContent = data[1];

            preferenceSelect.appendChild(option);

        });

        preferenceLabel.appendChild(preferenceSelect);
        box.appendChild(preferenceLabel);


        // AVAILABLE INGREDIENTS

        const ingredientsLabel = document.createElement("label");
        ingredientsLabel.textContent = "Ingredients Available:";

        const ingredientsInput = document.createElement("input");
        ingredientsInput.type = "text";
        ingredientsInput.placeholder = "Example: Rice, tomato, onion";

        ingredientsLabel.appendChild(ingredientsInput);
        box.appendChild(ingredientsLabel);


        // FOODS TO AVOID

        const avoidLabel = document.createElement("label");
        avoidLabel.textContent = "Foods You Want to Avoid:";

        const avoidInput = document.createElement("input");
        avoidInput.type = "text";
        avoidInput.placeholder = "Example: Egg, peanuts";

        avoidLabel.appendChild(avoidInput);
        box.appendChild(avoidLabel);


        // GENERATE BUTTON

        const generateButton = document.createElement("button");
        generateButton.type = "button";
        generateButton.className = "meal-popup-done";
        generateButton.textContent = "Generate My Meal Ideas";

        box.appendChild(generateButton);


        // RESULTS

        const resultHeading = document.createElement("h3");
        resultHeading.textContent = "Your Customized Meal Ideas";

        const resultArea = document.createElement("div");
        resultArea.id = "custom-meal-results";

        box.append(resultHeading, resultArea);


        // GENERATE CUSTOM MEALS

        generateButton.addEventListener("click", function() {

            resultArea.innerHTML = "";

            let meals = getSelectedMeals(planKey).slice();

            const preference = preferenceSelect.value;

            const availableIngredients = ingredientsInput.value
                .split(",")
                .map(item => item.trim().toLowerCase())
                .filter(Boolean);

            const avoidedFoods = avoidInput.value
                .split(",")
                .map(item => item.trim().toLowerCase())
                .filter(Boolean);


            // REMOVE EGG MEALS IF VEGETARIAN

            if (preference === "vegetarian") {

                meals = meals.filter(function(meal) {
                    return !meal.toLowerCase().includes("egg");
                });

            }


            // REMOVE FOODS THE USER WANTS TO AVOID

            meals = meals.filter(function(meal) {

                const lowerMeal = meal.toLowerCase();

                return !avoidedFoods.some(function(food) {
                    return lowerMeal.includes(food);
                });

            });


            // PRIORITIZE MEALS MATCHING AVAILABLE INGREDIENTS

            if (availableIngredients.length > 0) {

                meals.sort(function(a, b) {

                    const aMatches = availableIngredients.filter(
                        ingredient => a.toLowerCase().includes(ingredient)
                    ).length;

                    const bMatches = availableIngredients.filter(
                        ingredient => b.toLowerCase().includes(ingredient)
                    ).length;

                    return bMatches - aMatches;

                });

            }


            // DISPLAY RESULTS

            if (meals.length === 0) {

                const message = document.createElement("p");

                message.textContent =
                    "No suggestions match these preferences. Try changing your selections.";

                resultArea.appendChild(message);

            } else {

                const list = document.createElement("ul");

                meals.forEach(function(meal) {

                    const item = document.createElement("li");
                    item.textContent = meal;

                    list.appendChild(item);

                });

                resultArea.appendChild(list);

            }


            // DISPLAY INGREDIENT INFORMATION

            if (availableIngredients.length > 0) {

                const ingredientMessage = document.createElement("p");

                ingredientMessage.textContent =
                    "Ingredients entered: " + availableIngredients.join(", ");

                resultArea.appendChild(ingredientMessage);

            }

            const note = document.createElement("p");

            note.className = "meal-plan-note";

            note.textContent =
                "These are general suggestions. Entering food preferences does not check allergies or medical suitability. Follow qualified healthcare guidance where needed.";

            resultArea.appendChild(note);

        });

    }

    // =====================================
    // PROFILE
    // =====================================

    function openProfilePopup() {

        const box = createPopup("My Profile", "👤");

        const label = document.createElement("label");
        label.textContent = "Display Name:";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "Enter a display name";
        nameInput.value = localStorage.getItem("freshcartProfileName") || "";

        label.appendChild(nameInput);
        box.appendChild(label);

        const saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.className = "meal-popup-done";
        saveButton.textContent = "Save Profile";

        saveButton.addEventListener("click", function() {
            localStorage.setItem("freshcartProfileName", nameInput.value.trim());
            alert("Profile saved!");
            closeMealPopup();
        });

        box.appendChild(saveButton);
    }


    // =====================================
    // SAVED RECIPES
    // =====================================

    function openSavedRecipesPopup() {

        const box = createPopup("Saved Recipes", "🔖");

        const recipes = JSON.parse(
            localStorage.getItem("freshcartSavedRecipes") || "[]"
        );

        if (recipes.length === 0) {

            const message = document.createElement("p");
            message.textContent =
                "You haven't saved any recipes yet.";

            box.appendChild(message);

        } else {

            const list = document.createElement("ul");

            recipes.forEach(function(recipe) {
                const item = document.createElement("li");
                item.textContent = recipe;
                list.appendChild(item);
            });

            box.appendChild(list);
        }
    }


    // =====================================
    // MY PREFERENCE
    // =====================================

    function openPreferencesPopup() {

        const box = createPopup("My Preferences", "⚙️");

        const label = document.createElement("label");
        label.textContent = "Choose your food preference:";

        const selector = document.createElement("select");

        const options = [
            ["vegetarian", "Vegetarian"],
            ["egg", "Vegetarian + Eggs"],
            ["any", "No Preference"]
        ];

        options.forEach(function(data) {
            const option = document.createElement("option");
            option.value = data[0];
            option.textContent = data[1];
            selector.appendChild(option);
        });

        selector.value =
            localStorage.getItem("freshcartFoodPreference") || "any";

        label.appendChild(selector);
        box.appendChild(label);

        const saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.className = "meal-popup-done";
        saveButton.textContent = "Save Preference";

        saveButton.addEventListener("click", function() {
            localStorage.setItem("freshcartFoodPreference", selector.value);
            alert("Your preference has been saved!");
            closeMealPopup();
        });

        box.appendChild(saveButton);
    }


    // =====================================
    // AI SMART MEAL PLANNER MENU
    // =====================================

    function openSmartPlannerPopup() {

        const box = createPopup("AI Smart Meal Planner", "🧠");

        const description = document.createElement("p");
        description.textContent = "Choose a meal planner:";
        box.appendChild(description);

        const options = [
            ["pregnancy", "🤰 Pregnancy Meal Ideas"],
            ["fitness", "💪 Fitness Meal Ideas"],
            ["diabetes", "🥗 Diabetes-Friendly Meal Ideas"]
        ];

        options.forEach(function(data) {

            const button = document.createElement("button");
            button.type = "button";
            button.className = "meal-popup-done";
            button.textContent = data[1];

            button.addEventListener("click", function() {
                openAdvancedPopup(data[0]);
            });

            box.appendChild(button);
        });

        const customizeButton = document.createElement("button");
        customizeButton.type = "button";
        customizeButton.className = "meal-popup-done";
        customizeButton.textContent = "⚙️ Customize Meal Planner";

        customizeButton.addEventListener("click", function() {
            openCustomizeChoicePopup();
        });

        box.appendChild(customizeButton);
    }


    // =====================================
    // CHOOSE WHICH PLANNER TO CUSTOMIZE
    // =====================================

    function openCustomizeChoicePopup() {

        const box = createPopup("Customize Meal Planner", "⚙️");

        const label = document.createElement("label");
        label.textContent = "Choose a meal planner:";

        const selector = document.createElement("select");

        const options = [
            ["pregnancy", "Pregnancy"],
            ["fitness", "Fitness"],
            ["diabetes", "Diabetes-Friendly"]
        ];

        options.forEach(function(data) {
            const option = document.createElement("option");
            option.value = data[0];
            option.textContent = data[1];
            selector.appendChild(option);
        });

        label.appendChild(selector);
        box.appendChild(label);

        const continueButton = document.createElement("button");
        continueButton.type = "button";
        continueButton.className = "meal-popup-done";
        continueButton.textContent = "Continue";

        continueButton.addEventListener("click", function() {
            openCustomizePopup(selector.value);
        });

        box.appendChild(continueButton);
    }



  
// =====================================
// THREE-DOT MENU CONTROLS
// =====================================

function closeAllMenus() {

    document.querySelectorAll(".meal-menu-dropdown.show")
        .forEach(function(menu) {
            menu.classList.remove("show");
        });

    document.querySelectorAll(".meal-menu-button")
        .forEach(function(button) {
            button.setAttribute("aria-expanded", "false");
        });

}


// =====================================
// MAIN MEAL PLANNER CLICK CONTROLS
// =====================================

mealPlannerSection.addEventListener("click", function(event) {

    // ---------------------------------
    // 1. THREE-DOT MENU BUTTON
    // ---------------------------------

    const menuButton = event.target.closest(".meal-menu-button");

    if (menuButton) {

        const dropdown = menuButton.nextElementSibling;

        if (!dropdown || !dropdown.classList.contains("meal-menu-dropdown")) {
            console.error("Meal Planner menu dropdown not found.");
            return;
        }

        const alreadyOpen = dropdown.classList.contains("show");

        closeAllMenus();

        if (!alreadyOpen) {

            dropdown.classList.add("show");

            menuButton.setAttribute("aria-expanded", "true");

        }

        return;
    }


    // ---------------------------------
    // 2. SHARED MENU OPTIONS
    // ---------------------------------

    const navigationButton = event.target.closest(
        ".meal-navigation-button"
    );

    if (navigationButton) {

        const action = navigationButton.dataset.action;

        closeAllMenus();

        switch (action) {

            case "profile":

                if (typeof openProfilePopup === "function") {
                    openProfilePopup();
                } else {
                    console.error("openProfilePopup function is missing.");
                }

                break;


            case "saved-recipes":

                if (typeof openSavedRecipesPopup === "function") {
                    openSavedRecipesPopup();
                } else {
                    console.error("openSavedRecipesPopup function is missing.");
                }

                break;


            case "preferences":

                if (typeof openPreferencesPopup === "function") {
                    openPreferencesPopup();
                } else {
                    console.error("openPreferencesPopup function is missing.");
                }

                break;


            case "smart-planner":

                if (typeof openSmartPlannerPopup === "function") {
                    openSmartPlannerPopup();
                } else {
                    console.error("openSmartPlannerPopup function is missing.");
                }

                break;


            default:

                console.warn("Unknown menu option:", action);

        }

        return;
    }


    // ---------------------------------
    // 3. EXPLORE BUTTONS
    // ---------------------------------

    const exploreButton = event.target.closest(
        ".meal-plan-explore[data-plan]"
    );

    if (exploreButton) {

        const planKey = exploreButton.dataset.plan;

        closeAllMenus();

        if (typeof openAdvancedPopup === "function") {
            openAdvancedPopup(planKey);
        } else {
            console.error("openAdvancedPopup function is missing.");
        }

        return;
    }

});


// =====================================
// 4. CLOSE MENU WHEN CLICKING OUTSIDE
// =====================================

document.addEventListener("click", function(event) {

    if (!event.target.closest(".meal-card-menu")) {
        closeAllMenus();
    }

});


// =====================================
// MEAL PLANNER LOADED
// =====================================

console.log("FreshCart Advanced Meal Planner loaded successfully.");

}); // CLOSE SECOND DOMCONTENTLOADED
