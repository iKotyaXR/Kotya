$(document).ready(function() {
    $('.bata').on('click', () => {
        $("#test").slideDown('slow')
            .animate({ height: "+=200" }, 'slow')
            .animate({ width: "+=200" }, 'slow')
            .animate({ marginLeft: "+=100" }, 'slow')
            .slideUp('slow')
            .slideDown('slow')
            .animate({ width: "-=200" }, 'slow')
            .animate({ height: "-=200" }, 'slow')
            .animate({ marginLeft: "-=100" }, 'slow')
        return false;
    })

})