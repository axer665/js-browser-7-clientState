const modal = document.getElementById("subscribe-modal");
const modalClose = modal.querySelector(".modal__close");

// сохранение cookie
function setCookie(name, value, minutes) {
    let date = new Date;
    date.setMinutes(date.getMinutes() + minutes) // прибавляем минуты ко времени жизни печеньки
    document.cookie = name+"="+encodeURIComponent(value)+"; path=/; expires=" + date;
}

// получение значения cookie
function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}

// удаление cookie
function deleteCookie(name) {
    if (getCookie(name) !== "undefined") {
        document.cookie = name+"=; path=/; expires=-1";
    }
}

// показываем модаль
if (getCookie("modalClose") != "true" && !modal.classList.contains("modal_active")) {
    modal.classList.add("modal_active");
} 


modalClose.addEventListener("click", () => {
    // прячем модаль
    modal.classList.remove("modal_active");
    setCookie("modalClose", "true", 1);
})