function getJson() {
    $.getJSON("/articles", function(data) {
        $("#savedArticles").hide();
      
      for (var i = 0; i < data.length; i++) {
       
        $("#articles").append("<div class='panel panel-primary'> <div class='panel-heading'><h3 data-id='" + data[i]._id + "'>" + data[i].title + "<br />" +  "</h3></div>" + "<div class='panel-body'><p>" + data[i].summary + "</p>" + "<br>" +
        "<h5>" + "<a href='" + data[i].link + "'>" + "Article link" + '</a>' + "</h5>" +
          "<button class='view-notes' type='button' data-target='#noteModal' data-toggle='modal' data-id='" + data[i]._id + "'>" + "View Notes" + "</button>" +
          "<button class='save-article' type='submit' data-id='" + data[i]._id + "'>" + "Save Article" + "</button></div></div>"  + "<br>" + "<br>" + "<br>"
          
        );
      }
    });
  }

  getJson();

  $(document).on("click", ".view-notes", function() {
    
    $("#notes").empty();
    $("#newNote").empty();
    
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
      })

      .done(function(data) {
        console.log(data);

        $("#noteModal").modal("show");
        
        $("#newNote").append("<input id='title-input' name='title' >" + "<br>");
        
        $("#newNote").append("<textarea id='body-input' name='body'></textarea>" + "<br>");
        
        $("#newNote").append("<button data-id='" + data._id + "' class='save-note'>Save Note</button>");

        if (data.note.length != 0) {
            for (var i = 0; i < data.note.length; i++) {
              $("#notes").append(
                "<h3>" + data.note[i].title + "</h3>" +
                "<p>" + data.note[i].body + "</p>" +
                "<button data-id='" + data.note[i]._id + "' articleId='" + thisId + "' class='delete-note'>Delete Note</button>"
              );
            }
            }
            else {
              $("#notes").append("There are currently no notes for this article" + "<br>" + "<br>");
      
            }
      
          });
      });