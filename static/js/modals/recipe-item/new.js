var recipeIdForNewRecipeItem = 0

const newRecipeItemModal = select("#newRecipeItemModal");

const getNewRecipeItemModal = () => bootstrap.Modal.getOrCreateInstance(newRecipeItemModal);

const initNewRecipeItemModule = () => {
    if (!newRecipeItemModal) return;

    const newRecipeItemForm = select("#newRecipeItemForm");
    const saveNewRecipeButton = select("#newBtnSaveRecipeItem");

    const ingredientInput = select("#new-recipe-item-ingredient");
    const ingredientError = select("#new-recipe-item-ingredient-error");

    const quantityInput = select("#new-recipe-item-quantity");
    const quantityError = select("#new-recipe-item-quantity-error");

    const unitInput = select("#new-recipe-item-unit");
    const unitError = select("#new-recipe-item-unit-error");

    const generalError = select("#new-recipe-item-general-error");

    const clearNewRecipeErrors = () => {
        ingredientInput.classList.remove("is-invalid");
        ingredientError.textContent = "";

        quantityInput.classList.remove("is-invalid");
        quantityError.textContent = "";

        unitInput.classList.remove("is-invalid");
        unitError.textContent = "";
    };

    onEvent(newRecipeItemModal, "show.bs.modal", () => {
        newRecipeItemForm?.reset();
        clearNewRecipeErrors();
    });

    onEvent(newRecipeItemForm, "submit", async evt => {
        evt.preventDefault();
        clearNewRecipeErrors();

        if (saveNewRecipeButton) saveNewRecipeButton.disabled = true;

        try {
            const formData = new FormData(newRecipeItemForm);

            const { ok, data } = await httpRequest("/recipe-item/create", {
                method: "POST",
                body: formData
            });

            if (!ok || !data?.ok) {
                const errors = data?.errors ?? {};

                if (data?.errors?.ingredient) {
                    ingredientInput.classList.add("is-invalid");
                    ingredientError.textContent = data.errors.ingredient.join(" ");
                }
                else if (data?.errors?.quantity) {
                    quantityInput.classList.add("is-invalid");
                    quantityError.textContent = data.errors.quantity.join(" ");
                }
                else if (data?.errors?.unit) {
                    unitInput.classList.add("is-invalid");
                    unitError.textContent = data.errors.unit.join(" ");
                }
                else {
                    generalError.classList.remove("d-none");
                    generalError.textContent = "Não foi possivel salvar o registro. Tente novamente.";
                }
                return;
            }

            getNewRecipeModal().hide();
            showAlertMessage("Registro salvo com sucesso");
            window.location.href = "/recipe/recover/" + recipeIdForNewRecipeItem
        } catch {
            if (generalError) {
                generalError.classList.remove("d-none");
                generalError.textContent = "Erro de rede. Por favor, tente novamente.";
            }
        } finally {
            if (saveNewRecipeButton) saveNewRecipeButton.disabled = false;
        }
    });

    delegateEvent(document, "click", ".btn-recipe-create", async (_evt, button) => {
        recipeIdForNewRecipeItem = button.dataset.id;
        getNewRecipeModal().show();
    });
};

document.addEventListener("DOMContentLoaded", initNewRecipeItemModule);