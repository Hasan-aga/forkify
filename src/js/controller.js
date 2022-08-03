import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchValue from "./views/searchValue.js";
import resultsView from "./views/resultsView.js";
import { paginationView } from "./views/pagenationView.js";
import { bookmarksView } from "./views/bookmarksView.js";
import uploadRecipeView from "./views/uploadRecipeView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    console.log(recipeView);
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    resultsView.update(model.getResultsOfPage());
    bookmarksView.render(model.state.bookmarks);
  } catch (error) {
    console.error(`failed to get recipe: (${error})`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchValue.query;
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    console.log("model.state", model.state);
    const paginatedResults = model.getResultsOfPage();
    console.log("paginatedResults", paginatedResults);
    resultsView.render(paginatedResults);
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(`could not get results. ${error}`);
    resultsView.renderError(error.message);
  }
};

const controlPagination = function (destinationPage) {
  resultsView.render(model.getResultsOfPage(destinationPage));
  paginationView.render(model.state.search);
};

const controlServings = function (changeAmount) {
  //update the ingriedients
  model.updateServings(changeAmount);

  //display new ingriedients
  // recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  model.switchBookmark();
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (data) {
  try {
    const uploadedRecipe = await model.uploadRecipe(data);
    model.state.recipe = uploadedRecipe;
    window.location.hash = uploadedRecipe.id;
    controlBookmark();
    uploadRecipeView.switchFormAndOverlay();
  } catch (error) {
    uploadRecipeView.renderError(`Error, ${error}`);
  }
};

const init = function () {
  model.getBookmarksFromLocal();
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchValue.addSearchHandler(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  uploadRecipeView.addShowRecipeFormHandler();
  uploadRecipeView.addUploadRecipeHandler(controlUploadRecipe);
};

init();
