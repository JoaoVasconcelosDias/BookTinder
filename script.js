$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

$body = $("body");

$(document).on({
    ajaxStart: function () { $body.addClass("loading"); },
    ajaxStop: function () { $body.removeClass("loading"); }
});

/*$("#buttonPesquisa").click (function() {
    var paramPesquisar = $("#pesquisa").val();
    pesquisar(paramPesquisar);

})*/

function Book(title, descr, img, buy) {   /*construtor*/                                                              /*atributos*/
    this.title = title;
    this.descr = descr;
    this.img = img;
    this.buy = buy;
    this.like = 0;
    this.dislike = 0;
    this.favorite = 0;


    this.render = function () {
        $("#title").html(this.title);
        $("#descricao").html(this.descr);
        $(".img-thumbnail").attr('src', this.img);
        $(".compra").attr('href', this.buy);
        $(".img-thumbnail").animateCss("lightSpeedIn")
    }

}

function Queue() {
    this.data = [];

    this.enqueue = function (element) {
        this.data.push(element);
    }

    this.dequeue = function () {
        var result = this.data[0];
        this.data.shift();
        return result;
    }
}


function Library() {                                                 /*métodos, saõ as funções apresentadas num construtor*/
    this.books = new Queue();
    this.booksRead = new Queue();
    this.actualBook = null;
    this.addBook = function (book) {
        this.books.enqueue(book);
    }
    this.nextBook = function () {
        this.actualBook = this.books.dequeue();
        if (this.actualBook === undefined)
            return false;
        this.booksRead.enqueue(this.actualBook);
        this.actualBook.render();



    }
    this.like = function () {
        this.actualBook.like++;
    }
    this.dislike = function () {
        this.actualBook.dislike++;
    }
    this.favorite = function () {
        this.actualBook.favorite++;
    }


}

/*var book1 = new Book("https://images-na.ssl-images-amazon.com/images/I/51tW-UJVfHL._SX321_BO1,204,203,200_.jpg", "<strong>Lord of the Rings: The Fellowship of the Ring</strong>", "Texto", "Compre em", "https://www.amazon.com/Fellowship-Ring-Being-First-Rings/dp/0547928211/ref=sr_1_1?ie=UTF8&qid=1501075167&sr=8-1&keywords=fellowship+of+the+ring", "https://www.wook.pt/")
var book2 = new Book("https://images-na.ssl-images-amazon.com/images/I/51zwIlXzbSL._SX328_BO1,204,203,200_.jpg", "<strong>Lord of the Rings: The Two Towers</strong>", "Texto", "Compre em", "https://www.amazon.com/Two-Towers-Being-Second-Rings/dp/0547928203/ref=sr_1_2?ie=UTF8&qid=1501075202&sr=8-2&keywords=the+two+towers", "https://www.wook.pt/")
var book3 = new Book("https://images-na.ssl-images-amazon.com/images/I/51MlPWDaXGL._SX331_BO1,204,203,200_.jpg", "<strong>Lord of the Rings: The Return of the King</strong>", "Texto", "Compre em", "https://www.amazon.com/Return-King-Being-Third-Rings/dp/054792819X/ref=sr_1_1?ie=UTF8&qid=1501075386&sr=8-1&keywords=the+return+of+the+king", "https://www.wook.pt/")

book1.render();

var library = new Library();
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);


library.nextBook(a);
*/

var library = new Library();
var count = 0;
function init() {
    $.get("https://www.googleapis.com/books/v1/volumes?q=Tolkien+inauthor:Tolkien&startIndex=" + count).done(function (data) {     //o data é o call back do json
        for (var i = 0; i < data.items.length; i++) {
            var googleBook = data.items[i];
            var title = googleBook.volumeInfo.title != null ? googleBook.volumeInfo.title : "Titulo";//data.items[i].volumeInfo.title;
            var descr = googleBook.volumeInfo.description != null ? googleBook.volumeInfo.description : "Description";
            var img = googleBook.volumeInfo.imageLinks != null ? googleBook.volumeInfo.imageLinks.thumbnail : "http://www.beep.es/Imagenes/no_imagen.jpg";
            var buy = googleBook.saleInfo.buyLink != null ? googleBook.saleInfo.buyLink : "Sem Compra";

            var a = new Book(title, descr, img, buy)
            library.addBook(a);
        }
        library.nextBook();

    }).fail(function (data) {

    })
}

init("tolkien");

var totalLikes = 0;
var totalDislikes = 0;
var totalFavorites = 0;
function Stats() {

    var book;
    //while we can dequeue books
    while ((book = library.booksRead.dequeue()) !== undefined) {
        //counting total likes and total dislikes for all books
        totalLikes += book.like;
        totalDislikes += book.dislike;
        totalFavorites += book.favorite;

        var html = "<tr>";
        html += "<td>";
        html += book.title;
        html += "</td>";
        html += "<td>";
        html += book.like;
        html += "</td>";
        html += "<td>";
        html += book.favorite;
        html += "</td>";
        html += "<td>";
        html += book.dislike;
        html += "</td>";
        html += "</tr>";
        $('#counter').append(html);
    }

    $("#contador1").text(totalLikes);
    $("#contador3").text(totalFavorites);
    $("#contador2").text(totalDislikes);

}

$(document).ready(function () {


    $("#buttonPesquisa").click(function () {
        $login = $(this).parent();
        $login.hide();
        $("#mainPage").show();
    });

    $('#buttonLike').click(function () {
        library.like();
        if (library.nextBook() === false) {
            $("#mainPage").hide();
            $("#endPage").show();
            Stats()
        }
    });

    $('#buttonFav').click(function () {
        library.favorite();
        if (library.nextBook() === false) {
            $("#mainPage").hide();
            $("#endPage").show();
            Stats()
        }

    });

    $('#buttonDislike').click(function () {
        library.dislike();
        if (library.nextBook() === false) {
            $("#mainPage").hide();
            $("#endPage").show();
            Stats()
        }
    });

    $("#endPage").on("click", ".endbutton", function () {
        $("#endPage").hide();
        $("#mainPage").show();
        count += 10;
        init("tolkien");
    });


});

