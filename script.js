
$(document).ready(function () {


    $(".entrada").click(function () {
        $login = $(this).parent();
        $login.hide();
        $("#mainPage").show();
    });



    $('#buttonLike').click(function () {
        library.like();
            if(library.nextBook() === false){
                $("#mainPage").hide();
                $("#endPage").show();
                Stats()
            }


        /*$currentBook = $('.Book.active');
        $nextBook = $currentBook.next('.Book');
        var index = $('.Book').index($currentBook);
        library[index].opinion = $(this).attr('data-Opinion');

        if($nextBook.length > 0){
            $currentBook.removeClass('active');
            $nextBook.addClass('active');
        }
        else{
            Likescounter();
            complete();
            completeLikes();
            $('#mainPage').hide();
            $('#endPage').show();
        }*/
    });
    $('#buttonDislike').click(function () {
        library.dislike();
            if(library.nextBook() === false){
                $("#mainPage").hide();
                $("#endPage").show();
                Stats()
            }

    });
});

function Book(image, title, descr, compra, linkAmazon, linkWook) {   /*construtor*/
    this.image = image;                                                               /*atributos*/
    this.title = title;
    this.descr = descr;
    this.compra = compra;
    this.linkAmazon = linkAmazon;
    this.linkWook = linkWook;
    this.like = 0;
    this.dislike = 0;


    this.render = function () {
        $(".img-thumbnail").attr('src', this.image);
        $("#title").html(this.title);
        $("#descricao").html(this.descr);
        $("#compra").html(this.compra);
        $(".linkAmazon").attr('href', this.linkAmazon);
        $(".linkWook").attr('href', this.linkWook);

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
    //this.index = 1;
    this.addBook = function (book) {
        this.books.enqueue(book);
    }
    this.nextBook = function () {
        this.actualBook = this.books.dequeue();
            if(this.actualBook === undefined)
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
    
    

}

var book1 = new Book("https://images-na.ssl-images-amazon.com/images/I/51tW-UJVfHL._SX321_BO1,204,203,200_.jpg", "<strong>Lord of the Rings: The Fellowship of the Ring</strong>", "Texto", "Compre em", "https://www.amazon.com/Fellowship-Ring-Being-First-Rings/dp/0547928211/ref=sr_1_1?ie=UTF8&qid=1501075167&sr=8-1&keywords=fellowship+of+the+ring", "https://www.wook.pt/")
var book2 = new Book("https://images-na.ssl-images-amazon.com/images/I/51zwIlXzbSL._SX328_BO1,204,203,200_.jpg", "<strong>Lord of the Rings: The Two Towers</strong>", "Texto", "Compre em", "https://www.amazon.com/Two-Towers-Being-Second-Rings/dp/0547928203/ref=sr_1_2?ie=UTF8&qid=1501075202&sr=8-2&keywords=the+two+towers", "https://www.wook.pt/")
var book3 = new Book("https://images-na.ssl-images-amazon.com/images/I/51MlPWDaXGL._SX331_BO1,204,203,200_.jpg", "<strong>Lord of the Rings: The Return of the King</strong>", "Texto", "Compre em", "https://www.amazon.com/Return-King-Being-Third-Rings/dp/054792819X/ref=sr_1_1?ie=UTF8&qid=1501075386&sr=8-1&keywords=the+return+of+the+king", "https://www.wook.pt/")

book1.render();

var library = new Library();
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);


library.nextBook();

function Stats() {
    var totalLikes = 0;
    var totalDislikes = 0;

    var book;
    //while we can dequeue books
    while ((book = library.booksRead.dequeue()) !== undefined) {
        //counting total likes and total dislikes for all books
        totalLikes += book.like;
        totalDislikes += book.dislike;

        var html = "<tr>";
        html += "<td>";
        html += book.title;
        html += "</td>";
        html += "<td>";
        html += book.like;
        html += "</td>";
        html += "<td>";
        html += book.dislike;
        html += "</td>";
        html += "</tr>";
        $('#tbody').append(html);
    }

    $("#contador1").text(totalLikes);
    $("#contador2").text(totalDislikes);
}


/*function complete() {

    $.each(library, function (index, livro) {

        var html = `
                <tr>
                <td> `+ livro.title + `
                </td>
                <td> `+ livro.opinion + `
                </td>
                </tr>`;

        $('#tblresults tbody').append(html);

    });

}









function completeLikes() {

    var html = `
                <tr>
                <td> `+ Likes + `
                </td>
                <td> `+ Dislikes + `
                </td>
                </tr>`;

    $('#tblLikes tbody').append(html);


}


/*var Likes = 0;
var Dislikes = 0;
function Likescounter() {

    $.each(library, function (index, livro) {
        if (livro.opinion == "gosto") {
            Likes++;
        }
        else if (livro.opinion == "naogosto") {
            Dislikes++;
        }

    });
}    




function loadData(){
    var HTMLtoInsert=


    $.each(library,function(index,livro){
        $('#bookContainer').append(HTMLtoInsert);
        $lastInserted = $('.livro:last-child');

        $('img',$lastInserted).attr('src',livro.image);
        $('h2',$lastInserted).html(livro.title);
        $('p1',$lastInserted).html(livro.descr);
        $('p',$lastInserted).text(livro.compra);
        $('a.linkAmazon',$lastInserted).attr('href',livro.links.linkAmazon);
        $('a.linkWook',$lastInserted).attr('href',livro.links.linkWook);
    });
    $('.livro:first-child').addClass('active'); 

}

loadData();*/

