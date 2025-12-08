var ingredientIdForEditing = 0;

const editRecipeItemModalElement = select("#editRecipeItemModal");

const getEditRecipeItemModal = () => {    
    return bootstrap.Modal.getOrCreateInstance(editRecipeItemModalElement);
}

const initEditRecipeItemModule = () => {
    const editRecipeItemForm = select("#editRecipeItemForm");

    const recipeItemIdInput = select("#recipe-item-id");

    const ingredientInput = select("#edit-recipe-item-ingredient");
    const ingredientError = select("#edit-recipe-item-ingredient-error");

    const quantityInput = select("#edit-recipe-item-quantity");
    const quantityError = select("#edit-recipe-item-quantity-error");

    const unitInput = select("#edit-recipe-item-unit");
    const unitError = select("#edit-recipe-item-unit-error");

    const generalError = select("#edit-recipe-item-general-error");

    const clearEditRecipeItemErrors = () => {
        ingredientInput.classList.remove("is-invalid");
        ingredientError.textContent = "";

        quantityInput.classList.remove("is-invalid");
        quantityError.textContent = "";

        unitInput.classList.remove("is-invalid");
        unitError.textContent = "";
    };

    onEvent(editRecipeItemModalElement, "show.bs.modal", async () => {
        clearEditRecipeItemErrors();
        const select = document.getElementById('edit-recipe-item-ingredient');
        const { ok, data } = await httpRequest('/ingredient/search', { method: "GET" });
        
        if (!ok) {
            getEditRecipeItemModal().hide();
            showAlertMessage("Não foi possível carregar a lista de ingredientes. Tente novamente.");
        }
        
        data.ingredients.forEach(ingredient => {
            const option = document.createElement('option');
            option.value = ingredient.id;
            option.textContent = ingredient.name;
            select.appendChild(option);
        });        

        select.value = ingredientIdForEditing;
    });

    delegateEvent(document, "click", ".edit-recipe-item", (_evt, button) => {
        ingredientIdForEditing = button.dataset.ingredient ?? "";
        clearEditRecipeItemErrors();
        recipeItemIdInput.value = button.dataset.id ?? "";
        ingredientInput.value = ingredientIdForEditing;
        quantityInput.value = button.dataset.quantity?.replace(".", "").replace(",", ".") ?? "";
        unitInput.value = button.dataset.unit ?? "";
        getEditRecipeItemModal().show();
    });

    onEvent(editRecipeItemForm, "submit", async evt => {
        evt.preventDefault();
        clearEditRecipeItemErrors();

        const ingredient = (ingredientInput.value ?? "").trim();
        const quantity = (quantityInput.value ?? "").trim();
        const unitOfMeasure = (unitInput.value ?? "").trim();

        if (!ingredient) { ingredientInput.classList.add("is-invalid"); ingredientError.textContent = "Informe o ingreediente."; return; }
        if (!quantity) { quantityInput.classList.add("is-invalid"); quantityError.textContent = "Informe a quantidade do ingrediente."; return; }
        if (!unitOfMeasure) { unitInput.classList.add("is-invalid"); unitError.textContent = "Informe a unidade de medida da quantidade."; return; }

        try {
            const formData = new FormData(editRecipeItemForm);
            const updateUrl = "/recipe-item/update/" + encodeURIComponent(recipeItemIdInput.value);
            const { ok, data } = await httpRequest(updateUrl, { method: "POST", body: formData });

            if (!ok || !data?.ok) {
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

            getEditRecipeItemModal().hide();
            showAlertMessage("Registro salvo com sucesso");
            window.location.reload();
        } catch {
            generalError.classList.remove("d-none");
            generalError.textContent = "Erro de rede. Por favor, tente novamente.";
        }
    });
};

document.addEventListener("DOMContentLoaded", initEditRecipeItemModule);