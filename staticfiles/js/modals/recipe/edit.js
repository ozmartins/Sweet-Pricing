const editRecipeModalElement = select("#editRecipeModal");

const getEditRecipeModal = () => bootstrap.Modal.getOrCreateInstance(editRecipeModalElement);

const initEditRecipeModule = () => {
    const editRecipeForm = select("#editRecipeForm");

    const recipeIdInput = select("#recipe-id");
    const productIdInput = select("#product-id");

    const yieldsInput = select("#edit-recipe-yields");
    const yieldsError = select("#edit-recipe-yields-error");

    const prepTimeInput = select("#edit-recipe-preptime");
    const prepTimeError = select("#edit-recipe-preptime-error");

    const generalError = select("#edit-recipe-general-error");

    const clearEditRecipeErrors = () => {
        yieldsInput.classList.remove("is-invalid");
        yieldsError.textContent = "";

        prepTimeInput.classList.remove("is-invalid");
        prepTimeError.textContent = "";
    };

    onEvent(editRecipeModalElement, "show.bs.modal", () => {
        clearEditRecipeErrors();
    });

    delegateEvent(document, "click", "#edit-recipe", (_evt, button) => {
        clearEditRecipeErrors();
        recipeIdInput.value = button.dataset.id ?? "";
        productIdInput.value = button.dataset.product ?? "";
        yieldsInput.value = button.dataset.yields?.replace(".", "").replace(",", ".") ?? "";
        prepTimeInput.value = button.dataset.preptime ?? "";
        getEditRecipeModal().show();
    });

    onEvent(editRecipeForm, "submit", async evt => {
        evt.preventDefault();
        clearEditRecipeErrors();

        const yields = (yieldsInput.value ?? "").trim();
        const prepTime = (prepTimeInput.value ?? "").trim();

        if (!yields) { yieldsInput.classList.add("is-invalid"); yieldsError.textContent = "Informe o rendimento da receita."; return; }
        if (!prepTime) { prepTimeInput.classList.add("is-invalid"); prepTimeError.textContent = "Informe o tempo de preparo da receita."; return; }

        try {
            const formData = new FormData(editRecipeForm);
            const updateUrl = "/recipe/update/" + encodeURIComponent(recipeIdInput.value);
            const { ok, data } = await httpRequest(updateUrl, { method: "POST", body: formData });

            if (!ok || !data?.ok) {
                if (data?.errors?.yields) {
                    yieldsInput.classList.add("is-invalid");
                    yieldsError.textContent = data.errors.yields.join(" ");
                }
                else if (data?.errors?.prepTime) {
                    prepTimeInput.classList.add("is-invalid");
                    prepTimeError.textContent = data.errors.prepTime.join(" ");
                }
                else {
                    generalError.classList.remove("d-none");
                    generalError.textContent = "Não foi possivel salvar o registro. Tente novamente.";
                }
                return;
            }

            getEditRecipeModal().hide();
            showAlertMessage("Registro salvo com sucesso");
            window.location.reload();
        } catch {
            generalError.classList.remove("d-none");
            generalError.textContent = "Erro de rede. Por favor, tente novamente.";
        }
    });
};

document.addEventListener("DOMContentLoaded", initEditRecipeModule);