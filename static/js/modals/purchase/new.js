const newPurchaseModal = select("#newPurchaseModal");

const getNewPurchaseModal = () => bootstrap.Modal.getOrCreateInstance(newPurchaseModal);

const initNewPurchaseModule = () => {
    if (!newPurchaseModal) return;

    const newPurchaseForm = select("#newPurchaseForm");
    const saveNewRecipeButton = select("#newBtnSavePurchase");    

    const supplierInput = select("#new-purchase-supplier");
    const supplierError = select("#new-purchase-supplier-error");    

    const generalError = select("#new-purchase-general-error");

    const clearNewRecipeErrors = () => {
        supplierInput.classList.remove("is-invalid");
        supplierError.textContent = "";        
    };

    onEvent(newPurchaseModal, "show.bs.modal", async () => {
        newPurchaseForm?.reset();
        clearNewRecipeErrors();

        const select = document.getElementById('new-purchase-supplier');
        const { ok, data } = await httpRequest('/supplier/search', { method: "GET" });

        if (!ok) {
            getNewPurchaseModal().hide();
            showAlertMessage("Não foi possível carregar a lista de fornecedores. Tente novamente.");
        }

        data.suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier.id;
            option.textContent = supplier.name;
            select.appendChild(option);
        });
    });

    onEvent(newPurchaseForm, "submit", async evt => {
        evt.preventDefault();
        clearNewRecipeErrors();

        if (saveNewRecipeButton) saveNewRecipeButton.disabled = true;

        try {
            const formData = new FormData(newPurchaseForm);

            const { ok, data } = await httpRequest("/purchase/create", {
                method: "POST",
                body: formData
            });

            if (!ok || !data?.ok) {
                if (data?.errors?.supplier) {
                    supplierInput.classList.add("is-invalid");
                    supplierError.textContent = data.errors.ingredient.join(" ");
                }                
                else {
                    generalError.classList.remove("d-none");
                    generalError.textContent = "Não foi possivel salvar o registro. Tente novamente.";
                }
                return;
            }

            getNewPurchaseModal().hide();
            showAlertMessage("Registro salvo com sucesso");
            window.location.reload();
        } catch {
            if (generalError) {
                generalError.classList.remove("d-none");
                generalError.textContent = "Erro de rede. Por favor, tente novamente.";
            }
        } finally {
            if (saveNewRecipeButton) saveNewRecipeButton.disabled = false;
        }
    });    
};

document.addEventListener("DOMContentLoaded", initNewPurchaseModule);