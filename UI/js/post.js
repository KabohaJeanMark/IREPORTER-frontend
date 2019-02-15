var user_token = localStorage.getItem('token')
document.getElementById('add_red').addEventListener('submit', addRedflag);
function addRedflag(e) {
    e.preventDefault();
    //capture user input
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById("longitude").value;
    var comment = document.getElementById('comment').value;
    var image = document.getElementById('image').value;
    if(name == ""){
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('name').style.border = "2px #F00 solid";
    }

    if(description == ""){
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('description').style.border = "2px #F00 solid";
    }

    if(latitude == ""){
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('latitude').style.border = "2px #F00 solid";
    }

    if(longitude == ""){
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('longitude').style.border = "2px #F00 solid";
    }

    if(comment == ""){
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('comment').style.border = "2px #F00 solid";
    }

    if(image == ""){
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('image').style.border = "2px #F00 solid";
    }

    else if (image == ""&& comment =="" && latitude =="" && description =="" && name ==""){
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('image').style.border = "2px #F00 solid";
    }
    else {
        var post_data = {
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
        images: image,
        comment: comment
    }
        fetch('http://127.0.0.1:5000/api/v1/redflags', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            Authorization: `Bearer ${user_token}`
        },
        body: JSON.stringify(post_data)
    })
        .then((response) => response.json())
        .then(function (message) {
            if (message['data'][0]['message'] === 'Created red_flag record') {
                alert('Created red_flag record');
                window.location.replace('userprofile.html');

            }
            else if (message['msg'] === 'Token has expired') {
                alert('please log in again');
                window.location.replace('index.html');

            }


        });

    }
    //validation
    //var userInputs = [name, description, latitude, longitude, comment];

    //for(var i = 0; i<userInputs.length; i++){
    //   if (userInputs[i] == ""){
    //       alert("please fill in "+ userInputs[i]);
    //     return false;
    // }
    // }
    // if (name == "") {
    //     alert("Please fill in name");
    // }
    // if (description == "") {
    //     alert("Please fill in description");
    // }
    // if (latitude == "") {
    //     alert("Please fill in latitude coordinates");
    // }
    // if (longitude == "") {
    //     alert("Please fill in longitude coordinates");
    // }
    // if (comment == "") {
    //     alert("Please fill in description");
    // }
   // if (image == "") {
     //   alert("Please fill in image url");
   // }


    // var post_data = {
    //     name: name,
    //     description: description,
    //     latitude: latitude,
    //     longitude: longitude,
    //     images: image,
    //     comment: comment
    // }

    // fetch('http://127.0.0.1:5000/api/v1/redflags', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-type': 'application/json',
    //         Authorization: `Bearer ${user_token}`
    //     },
    //     body: JSON.stringify(post_data)
    // })
    //     .then((response) => response.json())
    //     .then(function (message) {
    //         if (message['data'][0]['message'] === 'Created red_flag record') {
    //             alert('Created red_flag record');
    //             window.location.replace('userprofile.html');

    //         }
    //         else if (message['msg'] === 'Token has expired') {
    //             // alert('please log in again');
    //             // window.location.replace('index.html');

    //         }


    //     });
}

function addIntervention() {
    //capture user input
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById("longitude").value;
    var comment = document.getElementById('comment').value;
    var image = document.getElementById('image').value;

    //validation
    if (name == "") {
        alert("Please fill in name");
    }
    else if (description == "") {
        alert("Please fill in description");
    }
    else if (latitude == "") {
        alert("Please fill in latitude coordinates");
    }
    else if (longitude == "") {
        alert("Please fill in longitude coordinates");
    }
    else if (comment == "") {
        alert("Please fill in description");
    }
    else if (image == "") {
        alert("Please fill in image url");
    }


    var post_data = {
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
        images: image,
        comment: comment
    }

    fetch('http://127.0.0.1:5000/api/v1/interventions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            Authorization: `Bearer ${user_token}`
        },
        body: JSON.stringify(post_data)
    })
        .then((response) => response.json())
        .then(function (message) {
            if (message['data'][0]['message'] === 'Created intervention record') {
                alert('Created intervention record');
                window.location.replace('userprofile.html');

            }
            else if (message['msg'] === 'Token has expired') {
                alert('please log in again');
                window.location.replace('index.html');

            }
        });
}