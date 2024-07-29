function nextStep(step) {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(stepElement => stepElement.style.display = 'none');
    document.getElementById('step' + step).style.display = 'block';
}

function orderSmoothie() {
    const name = document.getElementById('name').value.trim();
    const size = document.getElementById('size').value;
    const base = document.getElementById('base').value;
    const fruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked')).map(fruit => fruit.value);
    const additions = Array.from(document.querySelectorAll('input[name="additions"]:checked')).map(addition => addition.value);

    // Basic validation
    if (!name) {
        alert('Please enter your name.');
        return;
    }

    if (!size) {
        alert('Please select a size.');
        return;
    }

    if (!base) {
        alert('Please select a base.');
        return;
    }

    if (fruits.length === 0) {
        alert('Please select at least one fruit.');
        return;
    }

    // Calculate total price
    const smoothie = new Smoothie(name, size, base, fruits, additions);
    document.getElementById('smoothieDetails').innerHTML = smoothie.describe();
    document.getElementById('totalPrice').innerText = `Total Price: ₹${smoothie.calculateTotalPrice()}`;

    // Show thank you message and summary
    nextStep(6);
}

class Smoothie {
    constructor(name, size, base, fruits, additions) {
        this.name = name;
        this.size = size;
        this.base = base;
        this.fruits = fruits;
        this.additions = additions;
    }

    describe() {
        return `
            <h2>Smoothie Order</h2>
            <p><strong>Name:</strong> ${this.name}</p>
            <p><strong>Size:</strong> ${this.size}</p>
            <p><strong>Base:</strong> ${this.base}</p>
            <p><strong>Fruits:</strong> ${this.fruits.join(', ')}</p>
            <p><strong>Additions:</strong> ${this.additions.join(', ')}</p>
            <div>${this.getFruitImages()}</div>
            <p id="totalPrice"></p>
            <p>Thank you for your order!</p>
        `;
    }

    getFruitImages() {
        const fruitImages = {
            Strawberry: 'images/strawberry.jpg',
            Banana: 'images/banana.jpg',
            Mango: 'images/mango.jpg',
            Blueberry: 'images/blueberry.jpg',
            Pineapple: 'images/pineapple.jpg'
        };

        return this.fruits.map(fruit => `<img src="${fruitImages[fruit]}" alt="${fruit}">`).join('');
    }

    calculateTotalPrice() {
        const prices = {
            small: 100,
            medium: 150,
            large: 200,
            milk: 20,
            yogurt: 25,
            water: 15,
            juice: 30,
            Strawberry: 10,
            Banana: 8,
            Mango: 12,
            Blueberry: 15,
            Pineapple: 10,
            Honey: 5,
            'Chia Seeds': 7,
            'Protein Powder': 20
        };

        let total = 0;

        // Size price
        total += prices[this.size] || 0;

        // Base price
        total += prices[this.base] || 0;

        // Fruit prices
        this.fruits.forEach(fruit => {
            total += prices[fruit] || 0;
        });

        // Additions prices
        this.additions.forEach(addition => {
            total += prices[addition] || 0;
        });

        return total.toFixed(2);
    }
}
