import toastr from "toastr";

toastr.options.positionClass = "toast-top-right";
toastr.options.closeButton = true;
toastr.options.showMethod = 'slideDown';
toastr.options.hideMethod = 'slideUp';
toastr.options.progressBar = true;
toastr.options.toastClass = "toastr"

window.onload = function () {
    document.getElementById("loading").style.display = "none"
}

$(document).ready(function () {
    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

$(".logOutButton").on("click", function () {
    $.ajax({
        type: "GET",
        url: "/user/logout",
        success: function (data) {
            window.location.reload();
        },
        cache: false
    });
});

