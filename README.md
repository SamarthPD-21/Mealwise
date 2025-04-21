# MealWise

MealWise is a modern web application designed to simplify meal planning and grocery management. Users can explore recipes, plan meals for the week, and generate a grocery list based on their planned meals. The app is powered by the Spoonacular API and features a clean, responsive design.

---

## Live Demo

**Access the live application here:**  
[MealWise on Vercel](https://mealwise-six.vercel.app)

---

## Features

### 1. **Random Recipes**
- Explore random recipes fetched from the Spoonacular API.
- Search for recipes by keywords.
- Save recipes to the weekly planner for meal planning.

### 2. **Weekly Planner**
- Plan meals for each day of the week.
- View unassigned meals and assign them to specific days.
- Remove meals from specific days.
- Automatically updates the grocery list when meals are added or removed.

### 3. **Grocery List**
- Dynamically generates a grocery list based on planned meals.
- Displays ingredients grouped by day.
- Includes checkboxes for each ingredient to track purchased items.
- Expandable day-wise cards with smooth animations.

### 4. **Recipe Details**
- View detailed information about a recipe, including:
  - Ingredients
  - Cooking steps
  - Nutrition information
  - Summary
- Link to the full recipe on the Spoonacular website.

---

## Tech Stack

- **Frontend:** React, React Router
- **Styling:** CSS (with animations and responsive design)
- **API Integration:** Spoonacular API
- **State Management:** React Context API
- **Deployment:** Vercel
- **Local Storage:** Persist user data (e.g., weekly meals, grocery list) across sessions.

---

## Installation (For Local Development)

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mealwise.git
   cd mealwise
