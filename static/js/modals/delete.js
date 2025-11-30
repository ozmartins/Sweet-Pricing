const page_data = JSON.parse(document.getElementById("page-data").textContent);

const confirmDeleteModal = select(".confirm-delete-modal");

const ensureEmptyRowIfNeeded = () => {
            if (!entitiesTbody?.querySelector("tr")) {
                entitiesTbody.insertAdjacentHTML("beforeend", `
                    <tr class="empty-row">
                        <td colspan="3" class="text-center text-muted py-4">Nenhum registro encontrado.</td>
                    </tr>`);
            }
        };

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
            const deleteUrl = page_data.endpoint_delete.replace("{id}", encodeURIComponent(id));
            const { ok } = await httpRequest(deleteUrl, { method: "POST" });

            if (ok) {
                document.querySelector(`tr[data-id="${CSS.escape(id)}"]`)?.remove();
                ensureEmptyRowIfNeeded();
                showAlertMessage("Registro removido com sucesso!", "success");
            }
            else {
                showAlertMessage("Erro ao remover registro.", "danger");
            }
        } catch (error) {
            showAlertMessage("Falha de comunicação com o servidor", "danger");
        }
        finally {
            getConfirmDeleteModal().hide();
            selectedEntityId = null;
        }
    });
};

const initFocusOnDeleteModal = () => {
    focusPrimaryButtonOnModalShow(deleteConfirmModalElement);
};
document.addEventListener("DOMContentLoaded", initDeleteModule);
document.addEventListener("DOMContentLoaded", initFocusOnDeleteModal);