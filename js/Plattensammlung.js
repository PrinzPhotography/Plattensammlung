$(document).ready(function () {
    sammlung();
    selectArtist();
    sammlungFilter();
    neuerEintrag();
    $('.check').click(function() {
        if($('.check').is(':checked')) {
            genreFilter = this.value;
            filterSammlung();
        } else {
        sammlung()}
    });
    search();
    artistAlbum();
    edit();
    backvor();
});
let arraySammlung = [];
function sammlung() {
        $.ajax({
            url: 'Platten_select.php',
            type: 'POST',
            data : {
                DATA:'selectSammlung',
            },
            dataType:'json',
            success : function(data) {
                data.forEach(function (element, i) {
                    $('#ganzeSammlung').append('<button class="albenIndex" id="'+i+'">'+'<span>'+element['KUENSTLER']+'</span>'+'<br>'+'<br>'+'<i>'+element['ALBUM']+'</i>'+'<br>'+'<br>'+'</button>');
                });
                detailAlbum();
            },
            error : function(request,error)
            {
                alert("Request: "+JSON.stringify(request));
            }
        });
}

let letter = "";
function selectArtist() {
    $('.category').click(function () {
        //$('#artistList').empty();
        $('#artistList').html('');
        letter = this.id;
        $.ajax({
            url: 'Platten_select.php',
            type: 'POST',
            data: {
                DATA:'selectAz',
                'letter': letter,
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                data.forEach(function (element) {
                    $('#artistList').append('<button class="albenIndex">' + element['KUENSTLER'] + '</button>');
                });
                artistAlbum();
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
        sammlungFilter();
    });
}

let genre = "";
function sammlungFilter() {
    $('.content').click(function () {
        $('#ganzeSammlung').html('');
        genre = this.id;
        $.ajax({
            url: 'Platten_select.php',
            type: 'POST',
            data: {
                DATA: 'selectGenre',
                'genre': genre,
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                data.forEach(function (element) {
                    $('#ganzeSammlung').append('<button class="albenIndex">' +element['KUENSTLER']+'<br>'+'<br>'+'<i>'+element['ALBUM']+'</i>'+'<br>'+'</button>');
                });
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    });
}

function neuerEintrag() {
    $('#form').submit(function(event){
        event.preventDefault();
    });
    $("#insert").click(function() {
        imageUpload();
        $.ajax({
            url: 'Platten_insert.php',
            type: 'POST',
            data : {
                'artist' : $("#artist").val(),
                'album' : $("#album").val(),
                'erscheinungsjahr' : $("#Erscheinungsjahr").val(),
                'genre' : $("#genre").val(),
                'medium' : $("#medium").val()
            },
            dataType:'json',
            success : function(data) {
                alert(data['success']);
                $('#newAlbum').html('');
                $('#newAlbum').text('Kürzlich hinzugefügt:');
                $('#form').html('');
                selectNewest();
                $('#form').append('<div class="preview">'+'<img src="" id="img" width="100%" height="100%">'+'</div>')
            },
            error : function(request,error)
            {
                alert("Schon vorhanden Error");
            }
        });
        $('#forminsert')[0].reset();
    });
}

let genreFilter = ""
function filterSammlung() {
        $('#ganzeSammlung').html('');
        $.ajax({
            url: 'Platten_select.php',
            type: 'POST',
            data: {
                DATA: 'genreFilter',
                'genre': genreFilter,
            },
            dataType: 'json',
            success: function (data) {
                data.forEach(function (element) {
                    $('#ganzeSammlung').append('<button class="albenIndexFilter">' +element['KUENSTLER']+'<br>'+'<i>'+'<br>'+element['ALBUM']+'</i>'+'<br>'+'</button>');
                });
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    }

let suche = ""
function search() {
$('#searchButton').click(function(){
    $('#ganzeSammlung').html('');
    suche = $('#suche').val()
    $.ajax({
        url: 'Platten_select.php',
        type: 'POST',
        data : {
            DATA:'search',
            'suche' : suche,
        },
        dataType:'json',
        success : function(data) {
            data.forEach(function (element) {
                $('#ganzeSammlung').append('<button class="albenIndex">'+element['KUENSTLER']+'<br>'+'<br>'+'<i>'+element['ALBUM']+'</i>'+'<br>'+'<br>'+'</button>');
            });
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });
})
}
let titleAlbum = "";
function edit(){
    $('.albenIndex').click(function(){
        $('#overlay').show();
        titleAlbum = $(this).text();
        $('#platte').append('<i>'+'"'+titleAlbum+'"'+'</i>');
        deleteAlbum();
    })
}
function backvor() {
    $("#vor").hover(function(){
        $(this).css("background-color", "rgba(0,0,0, .1)");
    }, function(){
        $(this).css("background-color", "rgba(0,0,0, .0)");
    });
    $("#back").hover(function(){
        $(this).css("background-color", "rgba(0,0,0, .1)");
    }, function(){
        $(this).css("background-color", "rgba(0,0,0, .0)");
    });
}
let data = "";
function artistAlbum() {
    $('.albenIndex').click(function () {
        $('#artistList').html('');
        data = $(this).text();
        console.log(data);
        $.ajax ({
            url: 'Platten_select.php',
            type: 'POST',
            data: {
                DATA: 'albenKünstler',
                'alben':data,
            },
            dataType: 'json',
            success: function (data) {
                data.forEach(function (element, i) {
                    $('#artistList').append('<button class="albenIndex" id="'+i+'">'+'<i>'+element['ALBUM']+'</i>'+'<br>'+'</button>');
                });
                edit();
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    });
}

function deleteAlbum() {
    $('#unsub').click(function () {

        console.log(titleAlbum);
        $.ajax ({
            url: 'Platten_select.php',
            type: 'POST',
            data: {
                DATA: 'delete',
                'albumDelete':titleAlbum,
            },
            dataType: 'json',
            success: function (data) {
                alert(data['erfolg']);
                $('#overlay').hide();
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    });
    $('#abbrechen').click(function() {
        $('#platte').html('');
        $('#overlay').hide();
    });
}
function selectNewest() {
    $.ajax({
        url: 'Platten_select.php',
        type: 'POST',
        data : {
            DATA:'selectNewest',
        },
        dataType:'json',
        success : function(data) {
            data.forEach(function (element) {
                $('#form').append('<button class="albenIndex">'+element['KUENSTLER']+'<br>'+'<br>'+'<i>'+element['ALBUM']+'</i>'+'<br>'+'<br>'+'</button>');
            });
        },
        error : function(request,error)
        {
            alert("Request: "+JSON.stringify(request));
        }
    });
}
let artistDetail = "";
let albumDetail = "";
function detailAlbum() {
    $('.albenIndex').click(function () {
        artistDetail = $(this).find('span').text();
        albumDetail = $(this).find('i').text();
        $('#ganzeSammlung').html('');
        console.log(artistDetail);
        console.log(albumDetail);
        $.ajax ({
            url: 'Platten_select.php',
            type: 'POST',
            data: {
                DATA: 'albumDetail',
                'artistDetail':artistDetail,
                'albumDetail':albumDetail,
            },
            dataType: 'json',
            success: function (data) {
                data.forEach(function (element, i) {
                    $('#ganzeSammlung').append('<button class="albenIndex" id="detail">'+'<span>'+element['KUENSTLER']+'</span>'+'<br>'+'<br>'+'<br>'+'<br>'+'<i>'+element['ALBUM']+'</i>'+'<br>'+'<br>'+'</button>'+'<br>');
                    $('#ganzeSammlung').append('<div id="detailTitle">'+'<p>Infos</p>'+'<hr id="detailHr">'+'</div>')
                    $('#ganzeSammlung').append('<div id="detailDiv">'+'<b>Artist:</b>'+' '+'<i>'+artistDetail+'</i>'+'<br>'+'<b>Album:</b>'+' '+'<i>'+albumDetail+'</i>'+'<br>'+'<b>Release:</b>'+' '+'<i>'+element['ERSCHEINUNGSJAHR']+'</i>'+'<br>'+'<b>Kategorie:</b>'+' '+'<i>'+element['GENRE']+'</i>'+'<br>'+'</div>')
                    $('#ganzeSammlung').append('<div id="nextlast">'+'<b><</b>'+'<b>></b>')
                });
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
            }
        });
    });
}

function imageUpload() {
    let fd = new FormData();
    let files = $('#image')[0].files[0];
        fd.append('image',files);

        $.ajax({
            url: 'upload.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    $('#img').attr('src',response);
                    $('.preview img').show();
                }else{
                    alert('File not uploaded');
                }
            }
        })
}
