const entitiesTbody = select("#entities-table tbody");

const newEntityModal = select("#newEntityModal");
const getNewEntityModal = () => bootstrap.Modal.getOrCreateInstance(newEntityModal);

const initNewEntityModule = () => {
    if (!newEntityModal) return;

    const newEntityForm = select("#newEntityForm");
    const saveNewEntityButton = select("#btnSaveEntity");

    const productSelect = select("#entity-product");
    const productError = select("#entity-product-error");

    const yieldsInput = select("#entity-yields");
    const yieldsError = select("#entity-yields-error");

    const prepTimeInput = select("#entity-preptime");
    const prepTimeError = select("#entity-preptime-error");

    const generalError = select("#entity-general-error");

    const clearNewEntityErrors = () => {
        if (productSelect) {
            productSelect.classList.remove("is-invalid");
            if (productError) productError.textContent = "";
        }

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

    const loadEntityProducts = async () => {
        if (!productSelect) return;

        productSelect.innerHTML = "";
        productSelect.disabled = true;

        try {
            const { ok, data } = await httpRequest("/product/search", {
                method: "GET"
            });

            if (!ok || !Array.isArray(data.products)) {
                throw new Error("Resposta inválida ao carregar produtos.");
            }

            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "Selecione um produto...";
            productSelect.appendChild(placeholder);

            data.products.forEach(prod => {
                const opt = document.createElement("option");
                opt.value = prod.id;
                opt.textContent = prod.name;
                productSelect.appendChild(opt);
            });

        } catch (err) {
            console.error(err);
            if (generalError) {
                generalError.classList.remove("d-none");
                generalError.textContent = "Não foi possível carregar a lista de produtos.";
            }
        } finally {
            productSelect.disabled = false;
        }
    };

    onEvent(newEntityModal, "show.bs.modal", () => {
        newEntityForm?.reset();
        clearNewEntityErrors();
        loadEntityProducts();
        setTimeout(() => productSelect?.focus(), 120);
    });

    onEvent(newEntityForm, "submit", async evt => {
        evt.preventDefault();
        clearNewEntityErrors();

        const productValue = productSelect?.value?.trim() ?? "";
        if (!productValue) {
            if (productSelect) productSelect.classList.add("is-invalid");
            if (productError) productError.textContent = "Selecione um produto.";
            return;
        }

        if (saveNewEntityButton) saveNewEntityButton.disabled = true;

        try {
            const formData = new FormData(newEntityForm);

            const { ok, data } = await httpRequest("create", {
                method: "POST",
                body: formData
            });

            if (!ok || !data?.ok) {
                const errors = data?.errors ?? {};

                if (errors.product && productSelect && productError) {
                    productSelect.classList.add("is-invalid");
                    productError.textContent = errors.product.join(" ");
                }

                if (errors.yields && yieldsInput && yieldsError) {
                    yieldsInput.classList.add("is-invalid");
                    yieldsError.textContent = errors.yields.join(" ");
                }

                if (errors.preparationTimeInMinutes && prepTimeInput && prepTimeError) {
                    prepTimeInput.classList.add("is-invalid");
                    prepTimeError.textContent = errors.preparationTimeInMinutes.join(" ");
                }

                if (!errors.product && !errors.yields && !errors.preparationTimeInMinutes && generalError) {
                    generalError.classList.remove("d-none");
                    generalError.textContent = "Não foi possível salvar o registro. Tente novamente.";
                }

                return;
            }

            getNewEntityModal().hide();
            showAlertMessage("Registro salFvo com sucesso");
            window.location.reload();
        } catch {
            if (generalError) {
                generalError.classList.remove("d-none");
                generalError.textContent = "Erro de rede. Por favor, tente novamente.";
            }
        } finally {
            if (saveNewEntityButton) saveNewEntityButton.disabled = false;
        }
    });
};

document.addEventListener("DOMContentLoaded", initNewEntityModule);