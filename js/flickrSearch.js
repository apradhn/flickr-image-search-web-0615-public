$(document).ready(function(){

    $('#search').click(function() {
    var query = $('#keyword').val();
    console.log(query);

    fetchJSON(query);

    });
    
});


function fetchJSON(query) {
    var url = 'https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags='+query+'&jsoncallback=?';

    $.getJSON(url).done(function(data) {
        displayPhotos(data);
    });
}

function displayPhotos(data) {
    var photoData = data.photos.photo;

    var photos = getResults(photoData);

    var html = buildTags(photos);

    $('#feed').html(html);

    buildFancyBox();
}

function buildFancyBox() {
    $('.fancybox').fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });
}

function getResults(photos) {
    var results = [];
    var url;
    var photo;

    for (var i = 0; i < photos.length; i++) {
        photo = photos[i];
        url = [
        'http://farm',
        photo.farm,
        '.staticflickr.com/',
        photo.server,
        '/',
        photo.id,
         '_',
         photo.secret,
         '.jpg'
        ];
        url = url.join('');
        results.push({title: photo.title, url: url});
    };
    return results;
}

function buildTags(photos) {
    var tags = [];
    var photo;
    var tag;

    for (var i = 0; i < photos.length; i++) {
        photo = photos[i];
        tag = '';
        tag += '<a class="fancybox" rel="gallery1"';
        tag += 'href="' + photo.url + '"';
        tag += 'title="' + photo.title + '">';
        tag += '<img src="' + photo.url + '" width="100"/>';
        tag += '</a>';
        tags.push(tag);
    };

    return tags.join('');
}
/*

API url: 

https://www.flickr.com/services/api/request.rest.html

AJAX request URLwith tags=cat (search term = cat):

https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=cat&jsoncallback=?

JSON Snippet:

jsonFlickrApi({
    "photos": {
        "page": 1,
        "pages": 46641,
        "perpage": 100,
        "total": "4664056",
        "photo": [
            {
                "id": "7790251192",
                "owner": "80992738@N00",
                "secret": "50b0af1b38",
                "server": "8440",
                "farm": 9,
                "title": "Friends",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },

info about creating photo url from son data: http://www.flickr.com/services/api/misc.urls.html

http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

Example Test:

http://farm9.staticflickr.com/8440/7790251192_50b0af1b38.jpg

*/
