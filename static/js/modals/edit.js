const editEntityModalElement = select("#editEntityModal");

const getEditEntityModal = () => bootstrap.Modal.getOrCreateInstance(editEntityModalElement);

const initEditEntityModule = () => {
    const editEntityForm = select("#editEntityForm");
    const saveEditedEntityButton = select("#btnEditSave");
    const editEntityIdInput = select("#edt-id");
    const editEntityNameInput = select("#edt-name");
    const editEntityNameError = select("#edt-error-name");
    const editEntityGeneralError = select("#edt-error-general");

    const clearEditEntityErrors = () => {
        editEntityNameInput.classList.remove("is-invalid");
        editEntityNameError.textContent = "";
        editEntityGeneralError.classList.add("d-none");
        editEntityGeneralError.textContent = "";
    };

    onEvent(editEntityModalElement, "show.bs.modal", clearEditEntityErrors);

    delegateEvent(document, "click", ".btn-entity-edit", (_evt, button) => {
        clearEditEntityErrors();
        editEntityIdInput.value = button.dataset.id ?? "";
        editEntityNameInput.value = button.dataset.name ?? "";
        getEditEntityModal().show();
    });

    onEvent(editEntityForm, "submit", async evt => {
        evt.preventDefault();
        clearEditEntityErrors();

        const id = (editEntityIdInput.value ?? "").trim();
        const name = (editEntityNameInput.value ?? "").trim();
        if (!id) { editEntityGeneralError.classList.remove("d-none"); editEntityGeneralError.textContent = "ID inválido ."; return; }
        if (!name) { editEntityNameInput.classList.add("is-invalid"); editEntityNameError.textContent = "Informe o nome."; return; }

        saveEditedEntityButton.disabled = true;
        try {
            const formData = new FormData(editEntityForm);
            const updateUrl = "update/"+encodeURIComponent(id);
            const { ok, data } = await httpRequest(updateUrl, { method: "POST", body: formData });

            if (!ok || !data?.ok) {
                if (data?.errors?.name) {
                    editEntityNameInput.classList.add("is-invalid");
                   editEntityNameError.textContent = data.errors.name.join(" ");
                } else {
                    editEntityGeneralError.classList.remove("d-none");
                    editEntityGeneralError.textContent = "Não foi possivel salvar o registro. Tente novamente.";
                }
                return;
            }

            getEditEntityModal().hide();
            showAlertMessage("Registro salvo com sucesso");
            window.location.reload();
        } catch {
            editEntityGeneralError.classList.remove("d-none");
            editEntityGeneralError.textContent = "Erro de rede. Por favor, tente novamente.";
        } finally {
            saveEditedEntityButton.disabled = false;
        }
    });
};

document.addEventListener("DOMContentLoaded", initEditEntityModule);