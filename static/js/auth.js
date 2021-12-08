let signup_button = document.getElementById("signup-button");
let signin_button = document.getElementById("signin-button");

signup_button.onclick = () => {
    let login = document.getElementById("LoginInput");
    let pass = document.getElementById("PasswordInput");
    if (login.value === '') alert("Пустой логин");
    if (pass.value === '') alert("Пустой пароль");

    $.ajax({
        url: '/reg',
        method: 'post',
        data: {
            login: login.value,
            pass: pass.value
        }
    }).done(function (data) {
        if (data['status'] === 'ok') {
            window.location.href = '/';
        } else {
            alert(data['message']);
        }
    })
}
