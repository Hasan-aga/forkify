"use strict";
import icons from "url:../../img/icons.svg";
import View from "./view";
import fracty from "fracty";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _data;
  b;
  _errorMessage = `¯\\_(ツ)_/ <br>Oh oh! something went wrong, try again!`;
  _successMessage = "";

  addHandlerRender(handler) {
    console.log("icons:", icons);
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const clickedButton = e.target.closest(".btn--tiny");
      if (!clickedButton) return;
      const changeAmount = +clickedButton.dataset.changeby;
      handler(changeAmount);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const clickedButton = e.target.closest(".btn--bookmark");
      if (!clickedButton) return;
      handler();
    });
  }
  _generateMarkup() {
    return `
  
    <figure class="recipe__fig">
      <img src="${this._data.image_url}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cooking_time
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button data-changeBy="-1" class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}.svg#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-changeBy="1" class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}.svg#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
        
      </div>
      <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
      <svg>
        <use href="${icons}.svg#icon-user"></use>
      </svg>
    </div>
      
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}.svg#icon-bookmark${
      this._data.bookmark ? "-fill" : ""
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
      </div>

       
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.source_url}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
`;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? fracty(ing.quantity).toString() : ""
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }
}

export default new RecipeView();
