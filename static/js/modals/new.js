const newDataElement = document.getElementById("js-data");

const entitiesTbody = select("#entities-table tbody");

const newEntityModal = select("#newEntityModal");

const getNewEntityModal = () => bootstrap.Modal.getOrCreateInstance(newEntityModal);

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
            const { ok, data } = await httpRequest("create", {
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
            window.location.reload();
        } catch {
            newEntityGeneralError.classList.remove("d-none");
            newEntityGeneralError.textContent = "Erro de rede. Por favor, tente novamente.";
        } finally {
            saveNewEntityButton.disabled = false;
        }
    });
};

document.addEventListener("DOMContentLoaded", initNewEntityModule);