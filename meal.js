// script.js
"use strict";

const caloriesInput = document.getElementById("calories");
const generateMealBtn = document.getElementById("btn");
const mealPlanContainer = document.getElementById("meal-plan");
const toast = document.getElementById('toast');

// Sample meal data
const meals = [
    {
        id: 1,
        title: "Chicken Salad",
        calories: 350,
        image: "chicken-salad.jpg",
        ingredients: ["Chicken", "Lettuce", "Tomatoes", "Cucumber", "Olive Oil"],
        equipment: ["Bowl", "Knife"],
        steps: ["Chop ingredients", "Mix ingredients in a bowl", "Serve"]
    },
    {
        id: 2,
        title: "Grilled Salmon",
        calories: 500,
        image: "GrilledSalmon.jpg",
        ingredients: ["Salmon", "Lemon", "Garlic", "Olive Oil"],
        equipment: ["Grill", "Tongs"],
        steps: ["Season salmon", "Grill salmon for 10 minutes", "Serve"]
    },
    {
        id: 3,
        title: "Vegetable Stir Fry",
        calories: 300,
        image: "vegetable-stir-fry.jpg",
        ingredients: ["Bell Peppers", "Broccoli", "Carrots", "Soy Sauce", "Olive Oil"],
        equipment: ["Pan", "Spatula"],
        steps: ["Chop vegetables", "Stir fry vegetables in a pan", "Serve"]
    },
    {
        id: 4,
        title: "Pasta Bolognese",
        calories: 600,
        image: "PastaBolognese.jpg",
        ingredients: ["Pasta", "Ground Beef", "Tomato Sauce", "Onions", "Garlic"],
        equipment: ["Pot", "Pan"],
        steps: ["Cook pasta", "Prepare sauce", "Combine pasta and sauce", "Serve"]
    },
    {
        id: 5,
        title: "Fruit Smoothie",
        calories: 200,
        image: "Mixed-Berry-Smoothie.jpg",
        ingredients: ["Banana", "Strawberries", "Yogurt", "Honey"],
        equipment: ["Blender"],
        steps: ["Combine ingredients in blender", "Blend until smooth", "Serve"]
    }
];


function displayToast(message) {
    toast.classList.add('toast');
    toast.innerHTML = `<i class="fa-solid fa-circle-xmark"> </i>${message}`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function generateMealItem(meal) {
    const mealItem = document.createElement('div');
    mealItem.classList.add('meal-item');
    mealItem.innerHTML = `
        <img src="${meal.image}" alt="${meal.title}">
        <h3>${meal.title}</h3>
        <p>${meal.calories} calories</p>
        <button onclick="showRecipe(${meal.id})">Get Recipe</button>
    `;
    mealPlanContainer.appendChild(mealItem);
}

function showRecipe(id) {
    const meal = meals.find(meal => meal.id === id);
    const ingredients = meal.ingredients.map(ing => `<li>${ing}</li>`).join('');
    const equipment = meal.equipment.map(eq => `<li>${eq}</li>`).join('');
    const steps = meal.steps.map(step => `<li>${step}</li>`).join('');

    const recipeModal = document.createElement('div');
    recipeModal.classList.add('recipe-modal');
    recipeModal.innerHTML = `
        <div class="recipe-content">
            <span class="close-button" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>${meal.title}</h2>
            <img src="${meal.image}" alt="${meal.title}">
            <h3>Ingredients</h3>
            <ul>${ingredients}</ul>
            <h3>Equipment</h3>
            <ul>${equipment}</ul>
            <h3>Steps</h3>
            <ol>${steps}</ol>
        </div>
    `;
    document.body.appendChild(recipeModal);
}

function generateMealPlan() {
    const calories = parseInt(caloriesInput.value);
    if (isNaN(calories) || calories <= 0) {
        displayToast('Please enter a valid number of calories');
        return;
    }

    mealPlanContainer.innerHTML = '';
    const filteredMeals = meals.filter(meal => meal.calories <= calories);
    if (filteredMeals.length === 0) {
        displayToast('No meals found for the given calories');
    } else {
        filteredMeals.forEach(meal => generateMealItem(meal));
    }
}

generateMealBtn.addEventListener('click', generateMealPlan);
