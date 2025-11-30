const select = (selector, root = document) => root.querySelector(selector);
const selectAll = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const onEvent = (element, eventName, handler, options) => element && element.addEventListener(eventName, handler, options)

const delegateEvent = (root, eventName, selector, handler) =>
    onEvent(root, eventName, evt => {
        const target = evt.target.closest(selector);
        if (target && root.contains(target)) {
            handler(evt, target);
        }
    })

const getCookie = name => {
    const parts = document.cookie?.split(";") ?? [];
    for (const raw of parts) {
        const c = raw.trim();
        if (c.startsWith(name + "=")) return decodeURIComponent(c.slice(name.length + 1));
    }
    return null;
};

const getCsrfToken = () => document.querySelector("input[name=csrfmiddlewaretoken]")?.value || getCookie("csrftoken") || "";

const httpRequest = async (url, { method = "GET", body, headers = {} } = {}) => {
    const response = await fetch(url, {
        method,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            ...(method !== "GET" ? { "X-CSRFToken": getCsrfToken() } : {}),
            ...headers
        },
        body
    });
    let data = null;
    try { data = await response.json(); } catch { }
    return { ok: response.ok, status: response.status, data };
};

const showAlertMessage = (message, type = "success") => {
    const alertId = "alert-" + Date.now();
    const markup = `
                <div id="${alertId}" role="alert" class="alert alert-${type} alert-data-bs-dismissible fade show mt-3 shadown-sm">
                    ${escapeHTML(message)}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>`
    select("#alert-container")?.insertAdjacentHTML("beforeend", markup);
    setTimeout(() => document.getElementById(alertId)?.remove(), 3500);
}

const escapeHTML = text => String(text ?? "").replace(/[&<>"'`=\/]/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;"
}[ch] || ch));

const focusPrimaryButtonOnModalShow = modalEl =>
    onEvent(modalEl, "shown.bs.modal", () => modalEl.querySelector(".modal-footer .btn.btn-primary")?.focus());