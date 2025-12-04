const dataElement = document.getElementById("js-data");
  
const endpointTemplate = dataElement.dataset.endpointDelete;

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
            const deleteUrl = endpointTemplate.replace("{id}", encodeURIComponent(id));
            
            const { ok } = await httpRequest(deleteUrl, { method: "POST" });
            
            if (ok) {
                document.querySelector(`tr[data-id="${CSS.escape(id)}"]`)?.remove();
                showAlertMessage("Registro removido com sucesso!", "success");
            }
            else {
                showAlertMessage("Erro ao remover registro.", "danger");
            }
        } catch (error) {
            showAlertMessage("Falha de comunicação com o servidor: "+ error, "danger");
        }
        finally {
            getConfirmDeleteModal().hide();
            selectedEntityId = null;
        }
    });
};

document.addEventListener("DOMContentLoaded", initDeleteModule);