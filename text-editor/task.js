const editor = document.getElementById("editor");
const clearButton = document.getElementById("editor_clear");
const localStorage = window.localStorage;

if (localStorage.getItem("editorText")) {
    editor.value = localStorage.getItem("editorText");
}

editor.addEventListener("input", (event) => {
    const value = event.target.value
    localStorage.setItem("editorText", value);
});

clearButton.addEventListener("click", (event) => {
    editor.value = "";
    localStorage.removeItem("editorText");
});