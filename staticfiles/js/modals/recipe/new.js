var productIdForNewRecipe = 0

const newRecipeModal = select("#newRecipeModal");

const getNewRecipeModal = () => bootstrap.Modal.getOrCreateInstance(newRecipeModal);

const initNewRecipeModule = () => {
    if (!newRecipeModal) return;

    const newRecipeForm = select("#newRecipeForm");
    const saveNewRecipeButton = select("#btnSaveRecipe");

    const productIdInput = select("#product-id");

    const yieldsInput = select("#new-recipe-yields");
    const yieldsError = select("#new-recipe-yields-error");

    const prepTimeInput = select("#new-recipe-preptime");
    const prepTimeError = select("#new-recipe-preptime-error");

    const generalError = select("#new-recipe-general-error");

    const clearNewRecipeErrors = () => {
        if (yieldsInput) {
            yieldsInput.classList.remove("is-invalid");
            if (yieldsError) yieldsError.textContent = "";
        }

        if (prepTimeInput) {
            prepTimeInput.classList.remove("is-invalid");
            if (prepTimeError) prepTimeError.textContent = "";
        }

        if (generalError) {
            generalError.classList.add("d-none");
            generalError.textContent = "";
        }
    };

    onEvent(newRecipeModal, "show.bs.modal", () => {
        newRecipeForm?.reset();
        clearNewRecipeErrors();
    });

    onEvent(newRecipeForm, "submit", async evt => {
        evt.preventDefault();
        clearNewRecipeErrors();

        if (saveNewRecipeButton) saveNewRecipeButton.disabled = true;

        try {
            const formData = new FormData(newRecipeForm);

            const { ok, data } = await httpRequest("/recipe/create", {
                method: "POST",
                body: formData
            });

            if (!ok || !data?.ok) {
                const errors = data?.errors ?? {};

                if (errors.yields && yieldsInput && yieldsError) {
                    yieldsInput.classList.add("is-invalid");
                    yieldsError.textContent = errors.yields.join(" ");
                }

                if (errors.preparationTimeInMinutes && prepTimeInput && prepTimeError) {
                    prepTimeInput.classList.add("is-invalid");
                    prepTimeError.textContent = errors.preparationTimeInMinutes.join(" ");
                }

                if (!errors.yields && !errors.preparationTimeInMinutes && generalError) {
                    generalError.classList.remove("d-none");
                    generalError.textContent = "Não foi possível salvar o registro. Tente novamente.";
                }

                return;
            }

            getNewRecipeModal().hide();
            showAlertMessage("Registro salvo com sucesso");
            window.location.href = "/recipe/recover/" + productIdForNewRecipe
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
        productIdForNewRecipe = button.dataset.id;

        const { ok, data } = await httpRequest("/recipe/search?q=" + button.dataset.id, {
            method: "GET"
        });

        if (!ok || data.recipes.length === 0) {
            productIdInput.value = productIdForNewRecipe ?? "";
            getNewRecipeModal().show();
        }
        else {
            window.location.href = "/recipe/recover/" + productIdForNewRecipe;
        }
    });
};

document.addEventListener("DOMContentLoaded", initNewRecipeModule);