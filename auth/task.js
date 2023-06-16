const formContainer = document.getElementById("signin");
const form = document.getElementById("signin__form");
const formInputs = Array.from(form.querySelectorAll("input"));
const welcomeContainer = document.getElementById("welcome");
const iserIdBlock = document.getElementById("user_id");
const logoutButton = document.getElementById("button_logout");

const storage = window.localStorage;
// идентификатор пользователя из хранилища
let userId = storage.getItem("userId");
const xhr = new XMLHttpRequest();

// если уже есть идентификатор пользователя, отображаем информацию о нем
if (userId) {
    login(userId);
} else { // иначе, отображаем форму
    auth();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(form);
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
    xhr.send(formData);
});

logoutButton.addEventListener("click", () => {
    storage.removeItem("userId");
    logout();
});

// отправка запроса на авторизацию
function auth() {
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE) {
            let data = JSON.parse(xhr.response);
            console.log(data);
            if (data.success === false) {
                alert("Неправильно указан Логин или Пароль");
            } else {
                login(data.user_id);
                storage.setItem("userId", data.user_id);
            }
            formInputs.forEach(input => {
                input.value = "";
            })
        }
    });
}

// отображение информации о пользователе
function login(userId) {
    formContainer.classList.remove("signin_active");
    iserIdBlock.textContent = userId;
    welcomeContainer.classList.add("welcome_active");
}

// отображение формы
function logout() {
    formContainer.classList.add("signin_active");
    iserIdBlock.textContent = null;
    welcomeContainer.classList.remove("welcome_active");
}
