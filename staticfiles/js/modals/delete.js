const confirmDeleteModal = select(".confirm-delete-modal");

const getConfirmDeleteModal = () =>
    bootstrap.Modal.getOrCreateInstance(confirmDeleteModal);

let selectedEntityId = null

const initDeleteModule = () => {
    delegateEvent(document, "click", ".btn-entity-delete", (_evt, button) => {
        selectedEntityId = button.dataset.id ?? "";
        getConfirmDeleteModal().show();

    });

    const confirmDeleteButton = select(".confirm-delete-button")

    onEvent(confirmDeleteButton, "click", async () => {
        const id = selectedEntityId?.trim();

        if (!id) return;

        try {
            const deleteUrl = "delete/" + encodeURIComponent(id);

            const { ok } = await httpRequest(deleteUrl, { method: "POST" });

            if (ok) {
                window.location.reload();
                showAlertMessage("Registro removido com sucesso!", "success");
            }
            else {
                showAlertMessage("Erro ao remover registro.", "danger");
            }
        } catch (error) {
            showAlertMessage("Falha de comunicação com o servidor: " + error, "danger");
        }
        finally {
            getConfirmDeleteModal().hide();
            selectedEntityId = null;
        }
    });
};

document.addEventListener("DOMContentLoaded", initDeleteModule);

const modalEl = document.getElementById('confirmDeleteModal');

modalEl.addEventListener('shown.bs.modal', function () {
    const deleteBtn = modalEl.querySelector('.confirm-delete-button');
    deleteBtn.focus();
});
