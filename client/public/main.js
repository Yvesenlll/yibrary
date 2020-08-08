console.log("Loading main.js");

document.addEventListener("DOMContentLoaded", () => {
    $('.summernote').summernote({
        placeholder: 'Let the words tumble...',
        tabsize: 2,
        height: 300
    });
});