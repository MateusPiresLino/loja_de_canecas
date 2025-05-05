$(document).ready(function() {
    $('#linkProduto').click(function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('#Produto').offset().top
        }, 1000);
    })

    $('.container_sobre, container_sobre').hide();
    

    $('.slide_sobre').click(function() {
        $('.container_sobre').slideToggle(1000)
    })

    $('.menu_hamburguer').click(function() {
        $('nav').slideToggle(600);
    })
})