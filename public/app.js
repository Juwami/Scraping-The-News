
$("#saveBtn").on("click", function() {
    let id = $(this).data("id")
    console.log(id)

    $.post("/articlesave/:id").then(function(data) {
        console.log(data)
    })
})

$("#destroyBtn").on("click", function() {
    $.post("/destroy").then(function() {
        location.reload();
    })
})