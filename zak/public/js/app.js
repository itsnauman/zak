$(document).ready(function() {
    /**
     * Increment the up votes counter
     */
    $(".box .media .button.is-upvote").click(function(e) {
        e.preventDefault();
        var id = $(this).data("id");
        var that = this;

        $.ajax({
            type: "POST",
            url: "/upvote",
            data: {
                "_id": id
            },
            success: function() {
                var votes = $(that).find('.post-upvotes');
                votes.text(parseInt(votes.text()) + 1);
            }
        });
    });

    /**
     * Delete user post from the profile page
     */
    $(".box .media .media-right.post-delete").on('click', function() {
        var id = $(this).data("id");
        var that = this;

        $.ajax({
            type: "DELETE",
            url: "/post",
            data: {
                "_id": id
            },
            success: function() {
                $(that).parent().parent().remove();
            }
        });
    });


    /**
     * Delete a user comment
     */
    $("#delete-comment.media-right").on('click', function() {
        console.log('clicked');
        var id = $(this).attr("data-id");
        var post_id = $(this).attr('data-post');
        var that = this;

        $.ajax({
            type: "DELETE",
            url: "/post/comment",
            data: {
                "_id": id,
                "post_id": post_id
            },
            success: function() {
                $(that).parent().remove();
            }
        });
    });

});
