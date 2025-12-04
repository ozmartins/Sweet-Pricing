const newDataElement = document.getElementById("js-data");

const entitiesTbody = select("#entities-table tbody");

const newEntityModal = select("#newEntityModal");

const getNewEntityModal = () => bootstrap.Modal.getOrCreateInstance(newEntityModal);

const insertEntityRow = (id, name) => {
    const safeId = escapeHTML(String(id));
    const safeName = escapeHTML(String(name));
    const rowHtml = `
                <tr data-id="${safeId}">
                <td class="text-muted">#${safeId}</td>
                <td>${safeName}</td>
                <td class="text-end">
                    <button type="button" class="btn btn-sm btn-outline-primary btn-entity-edit"
                            data-id="${safeId}" data-name="${safeName}">Edit</button>
                    <button type="button" class="btn btn-sm btn-outline-danger btn-entity-delete"
                            data-id="${safeId}" data-name="${safeName}">Delete</button>
                </td>
                </tr>`;
    entitiesTbody.insertAdjacentHTML("afterbegin", rowHtml);
};

const initNewEntityModule = () => {
    const newEntityForm = select("#newEntityForm");
    const saveNewEntityButton = select("#btnSaveNew");
    const newEntityNameInput = select("#new-name");
    const newEntityNameError = select("#new-name-error");
    const newEntityGeneralError = select("#new-general-error");

    const clearNewEntityErrors = () => {
        newEntityNameInput.classList.remove("is-invalid");
        newEntityNameError.textContent = "";
        newEntityGeneralError.classList.add("d-none");
        newEntityGeneralError.textContent = "";
    };

    onEvent(newEntityModal, "show.bs.modal", () => {
        newEntityForm?.reset();
        clearNewEntityErrors();
        setTimeout(() => newEntityNameInput?.focus(), 80);
    });

    onEvent(newEntityForm, "submit", async evt => {
        evt.preventDefault();
        clearNewEntityErrors();

        const name = newEntityNameInput.value?.trim() ?? "";
        if (!name) {
            newEntityNameInput.classList.add("is-invalid");
            newEntityNameError.textContent = "Informe o nome do registro.";
            return;
        }

        saveNewEntityButton.disabled = true;
        try {
            const formData = new FormData(newEntityForm);
            const createUrl = newDataElement.dataset.endpointCreate;
            const { ok, data } = await httpRequest(createUrl, {
                method: "POST",
                body: formData
            });

            if (!ok || !data?.ok) {
                if (data?.errors?.name) {
                    newEntityNameInput.classList.add("is-invalid");
                    newEntityNameError.textContent = data.errors.name.join(" ");
                } else {
                    newEntityGeneralError.classList.remove("d-none");
                    newEntityGeneralError.textContent = "Não foi possivel salvar o registro. Tente novamente.";
                }
                return;
            }

            getNewEntityModal().hide();
            showAlertMessage("Registro salvo com sucesso");
            insertEntityRow(data.id, data.name);
        } catch {
            newEntityGeneralError.classList.remove("d-none");
            newEntityGeneralError.textContent = "Network error. Please try again later.";
        } finally {
            saveNewEntityButton.disabled = false;
        }
    });
};

document.addEventListener("DOMContentLoaded", initNewEntityModule);