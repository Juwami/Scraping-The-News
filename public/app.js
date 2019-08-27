
$("#saveBtn").on("click", function() {
    let id = $(this).data("id")
    console.log(id)

    $.post("/articlesave/:id").then(function() {
        location.reload();
    })
})

$("#destroyBtn").on("click", function() {
    $.post("/destroy").then(function() {
        location.reload();
    })
})