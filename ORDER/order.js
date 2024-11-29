let x = document.querySelector(".order");
x.addEventListener("click", function (e) {
    console.log("hello");
    if (!x.classList.contains('animate')) {
        x.classList.add('animate');
        setTimeout(() => {
            x.classList.remove('animate');
        }, 10000);
    }
});