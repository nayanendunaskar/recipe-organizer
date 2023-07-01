import { useNavigate } from "react-router-dom";
import { recipes } from "../Database/recipes";
import { useData } from "../Contexts/DataProvider";
import { useState } from "react";

export const AllRecipes = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useData();
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
  
  return (
    <>
      <h1>All Recipes</h1>
      <input
        onChange={(event) =>
          dispatch({ type: "SEARCH_BY", payload: event.target.value })
        }
      />
      <h2>Filters</h2>
      <label>
        <input
          name="category"
          checked={state.category === "recipeName"}
          type="radio"
          onChange={() => dispatch({ type: "SEARCH_BY_NAME" })}
        />
        Name
      </label>
      <label>
        <input
          name="category"
          type="radio"
          checked={state.category === "ingredients"}
          onChange={() => dispatch({ type: "SEARCH_BY_INGREDIENTS" })}
        />
        Ingredients
      </label>
      <label>
        <input
          name="category"
          type="radio"
          checked={state.category === "cuisineType"}
          onChange={() => dispatch({ type: "SEARCH_BY_CUISINE" })}
        />
        Cuisine
      </label>
      <div className="posts">
        {state.filteredRecipes.map(
          ({
            id,
            recipeName,
            imageUrl,
            ingredients,
            cookingInstructions,
            cuisineType,
          }) => (
            <div className="post" key={id}>
              <img
                src={imageUrl}
                alt={recipeName}
                onClick={() => navigate(`/recipe/${id}`)}
              />
              <i class="fa-solid fa-pen "></i>
              <i class="fa-solid fa-trash trash"></i>
              <h3>{recipeName}</h3>
              <p>Cuisine Type: {cuisineType}</p>
              <p>
                Ingredients: <button>See recipe</button>
              </p>
              <p>
                Instructions: <button>See recipe </button>
              </p>
            </div>
          )
        )}
        <i
          class="fa-solid fa-circle-plus plus"
          onClick={() => setShowNewRecipeForm(!showNewRecipeForm)}
        ></i>
        {showNewRecipeForm && (
          <div>
            <label>
              <input />
            </label>
          </div>
        )}
      </div>
    </>
  );
};