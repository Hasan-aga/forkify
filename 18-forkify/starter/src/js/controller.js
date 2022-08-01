import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchValue from './views/searchValue.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    console.log(model.state);
    recipeView.render(model.state);
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
    resultsView.render(model.state);
  } catch (error) {
    console.error(`could not get results. ${error}`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchValue.addSearchHandler(controlSearchResults);
};

init();

controlSearchResults();
