
$("#saveBtn").on("click", function() {
    let id = $(this).data("id")
    console.log(id)

    $.post("/articlesave/:id").then(function(data) {
        location.reload();
    })
})