function tempAlert(msg, duration) {
    let el = document.createElement("div");
    el.style = "-webkit-backdrop-filter: blur(10px);backdrop-filter: blur(10px);";
    el.className = "group-create-successfully";
    el.innerHTML = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "                 style=\"position: absolute; margin-top: 14px;margin-left: 20px\">\n" +
        "                <path d=\"M19 9.17715V10.0051C18.9989 11.9459 18.3704 13.8344 17.2084 15.3888C16.0463 16.9432 14.413 18.0804 12.5518 18.6307C10.6907 19.1809 8.70153 19.1149 6.88102 18.4423C5.06051 17.7697 3.50619 16.5266 2.44986 14.8985C1.39354 13.2704 0.891812 11.3444 1.01951 9.40783C1.14721 7.47126 1.89749 5.62784 3.15845 4.15252C4.41942 2.67719 6.12351 1.649 8.01657 1.22128C9.90963 0.79357 11.8902 0.989255 13.663 1.77915\"\n" +
        "                      stroke=\"#1D9191\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
        "                <path d=\"M19 3L10.5385 12L8 9.3027\" stroke=\"#1D9191\" stroke-width=\"2\" stroke-linecap=\"round\"\n" +
        "                      stroke-linejoin=\"round\"></path>\n" +
        "            </svg>\n" +
        "            <div style='position: absolute;color: #8A949B;margin-left: 60px;margin-top: 14px;font-size: 14px;'>" + msg + "</div>\n" +
        "            <div class=\"green-boarder-line\"></div>";
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, duration);
    document.getElementById("notification-box").appendChild(el);
}

function tempWarningAlert(msg, duration) {
    let el = document.createElement("div");
    el.style = "-webkit-backdrop-filter: blur(10px);backdrop-filter: blur(10px);";
    el.className = "group-create-successfully";
    el.innerHTML = "<svg style=\"position: absolute; left: 20px; top: 2px\" width=\"46\" height=\"41\" viewBox=\"0 0 46 41\"\n" +
        "                 fill=\"none\"\n" +
        "                 xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "                 transform=\"scale(0.55)\">\n" +
        "                <path d=\"M19.476 3.92549L2.53604 32.2055C2.18677 32.8103 2.00197 33.4961 2.00002 34.1945C1.99806 34.893 2.17902 35.5797 2.52489 36.1865C2.87076 36.7933 3.36949 37.299 3.97145 37.6532C4.57342 38.0074 5.25764 38.1978 5.95604 38.2055H39.836C40.5344 38.1978 41.2187 38.0074 41.8206 37.6532C42.4226 37.299 42.9213 36.7933 43.2672 36.1865C43.6131 35.5797 43.794 34.893 43.7921 34.1945C43.7901 33.4961 43.6053 32.8103 43.256 32.2055L26.316 3.92549C25.9595 3.3377 25.4575 2.85173 24.8584 2.51446C24.2594 2.17718 23.5835 2 22.896 2C22.2086 2 21.5327 2.17718 20.9336 2.51446C20.3346 2.85173 19.8326 3.3377 19.476 3.92549V3.92549Z\"\n" +
        "                      stroke=\"#D87820\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
        "                <path d=\"M22.8965 14.2055V22.2055\" stroke=\"#D87820\" stroke-width=\"4\" stroke-linecap=\"round\"\n" +
        "                      stroke-linejoin=\"round\"></path>\n" +
        "                <path d=\"M22.8965 30.2055H22.9165\" stroke=\"#D87820\" stroke-width=\"4\" stroke-linecap=\"round\"\n" +
        "                      stroke-linejoin=\"round\"></path>\n" +
        "            </svg>\n" +
        "            <div style='position: absolute;color: #8A949B;margin-left: 76px;margin-top: 14px;font-size: 14px;'>\n" +
        "                " + msg + "\n" +
        "            </div>\n" +
        "            <div class=\"green-boarder-line\" style=\"background: #D87820\"></div>";
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, duration);
    document.getElementById("notification-box").appendChild(el);
}

function tempErrorAlert(msg, duration) {
    let el = document.createElement("div");
    el.style = "-webkit-backdrop-filter: blur(10px);backdrop-filter: blur(10px);";
    el.className = "group-create-successfully";
    el.innerHTML = "<svg style=\"position: absolute; left: 20px; top: 2px\" width=\"46\" height=\"41\" viewBox=\"0 0 46 41\"\n" +
        "                 fill=\"none\"\n" +
        "                 xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "                 transform=\"scale(0.55)\">\n" +
        "                <path d=\"M19.476 3.92549L2.53604 32.2055C2.18677 32.8103 2.00197 33.4961 2.00002 34.1945C1.99806 34.893 2.17902 35.5797 2.52489 36.1865C2.87076 36.7933 3.36949 37.299 3.97145 37.6532C4.57342 38.0074 5.25764 38.1978 5.95604 38.2055H39.836C40.5344 38.1978 41.2187 38.0074 41.8206 37.6532C42.4226 37.299 42.9213 36.7933 43.2672 36.1865C43.6131 35.5797 43.794 34.893 43.7921 34.1945C43.7901 33.4961 43.6053 32.8103 43.256 32.2055L26.316 3.92549C25.9595 3.3377 25.4575 2.85173 24.8584 2.51446C24.2594 2.17718 23.5835 2 22.896 2C22.2086 2 21.5327 2.17718 20.9336 2.51446C20.3346 2.85173 19.8326 3.3377 19.476 3.92549V3.92549Z\"\n" +
        "                      stroke=\"#CB2D3E\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
        "                <path d=\"M22.8965 14.2055V22.2055\" stroke=\"#CB2D3E\" stroke-width=\"4\" stroke-linecap=\"round\"\n" +
        "                      stroke-linejoin=\"round\"></path>\n" +
        "                <path d=\"M22.8965 30.2055H22.9165\" stroke=\"#CB2D3E\" stroke-width=\"4\" stroke-linecap=\"round\"\n" +
        "                      stroke-linejoin=\"round\"></path>\n" +
        "            </svg>\n" +
        "            <div style='position: absolute;color: #8A949B;margin-left: 76px;margin-top: 14px;font-size: 14px;'>\n" +
        "                " + msg + "\n" +
        "            </div>\n" +
        "            <div class=\"green-boarder-line\" style=\"background: #CB2D3E\"></div>";
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, duration);
    document.getElementById("notification-box").appendChild(el);
}

function confirmWindow(message1, message2, func) {
    let home = document.getElementById("windows-container");
    let confirm_window = document.createElement("div");
    confirm_window.innerHTML = "<div class=\"blur-window rectangular-notification-window \" id=\"confirm-window\">\n" +
        "        <div class=\"middle-container-text\" style=\"margin-left: 40px; margin-top: 35px\">Delete all Profiles</div>\n" +
        "        <div class=\"middle-container-text\"\n" +
        "             style=\"margin-left: 40px; margin-top: 100px; font-size: 12px;color: #ACB4BA\">\n" +
        "            " + message1 + "\n" +
        "            <p><b>" + message2 + "</b></p>\n" +
        "        </div>\n" +
        "        <button class=\"button-active\" onclick='document.getElementById(\"confirm-window\").remove();'>закрыть</button>\n" +
        "        <button class=\"red-button\" onclick='" + func + "document.getElementById(\"confirm-window\").remove();'>Сохранить\n" +
        "        </button>\n" +
        "    </div>";
    home.appendChild(confirm_window);
}

function newConfirmWindow(msg1, msg2, func) {
    let home = document.getElementById("windows-container");
    let confirm_window = document.createElement("div");
    confirm_window.className = "blur-window warning-window";
    confirm_window.id = "confirm-window";
    confirm_window.innerHTML = "<svg style=\"position: absolute; top: 60px; left: 120px\" width=\"46\" height=\"41\" viewBox=\"0 0 46 41\" fill=\"none\"\n" +
        "             xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "             transform=\"scale(1.3)\">\n" +
        "            <path d=\"M19.476 3.92549L2.53604 32.2055C2.18677 32.8103 2.00197 33.4961 2.00002 34.1945C1.99806 34.893 2.17902 35.5797 2.52489 36.1865C2.87076 36.7933 3.36949 37.299 3.97145 37.6532C4.57342 38.0074 5.25764 38.1978 5.95604 38.2055H39.836C40.5344 38.1978 41.2187 38.0074 41.8206 37.6532C42.4226 37.299 42.9213 36.7933 43.2672 36.1865C43.6131 35.5797 43.794 34.893 43.7921 34.1945C43.7901 33.4961 43.6053 32.8103 43.256 32.2055L26.316 3.92549C25.9595 3.3377 25.4575 2.85173 24.8584 2.51446C24.2594 2.17718 23.5835 2 22.896 2C22.2086 2 21.5327 2.17718 20.9336 2.51446C20.3346 2.85173 19.8326 3.3377 19.476 3.92549V3.92549Z\"\n" +
        "                  stroke=\"#CB2D3E\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
        "            <path d=\"M22.8965 14.2055V22.2055\" stroke=\"#CB2D3E\" stroke-width=\"4\" stroke-linecap=\"round\"\n" +
        "                  stroke-linejoin=\"round\"></path>\n" +
        "            <path d=\"M22.8965 30.2055H22.9165\" stroke=\"#CB2D3E\" stroke-width=\"4\" stroke-linecap=\"round\"\n" +
        "                  stroke-linejoin=\"round\"></path>\n" +
        "        </svg>\n" +
        "        <div class=\"middle-container-text\" style=\"top: 115px; left: 95px; font-size: 24px;\"><b>Warning!</b></div>\n" +
        "        <div class=\"middle-container-text\" style=\"top: 175px; left: 40px; font-size: 14px; text-align: center\">\n" +
        "            " + msg1 + "\n" +
        "            <br>" + msg2 + "<br></div>\n" +
        "        <button class=\"button-active\" onclick='document.getElementById(\"confirm-window\").remove();'>закрыть</button>\n" +
        "        <button class=\"red-button\" onclick='" + func + "document.getElementById(\"confirm-window\").remove();' style=\"margin-top: 255px; margin-left: 60px; width: 85px\">Delete</button>";
    home.appendChild(confirm_window);
}


function removeAllWindows() {
    let windows = document.getElementById("windows-container");
    while (windows.firstChild) {
        windows.removeChild(windows.firstChild);
    }
}