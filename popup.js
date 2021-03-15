$("#btn").on("click", () => {
    chrome.storage.local.get(data => {
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        const content = JSON.stringify(data);
        const blob = new Blob([bom, content], { "type": "application/json" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    });
});