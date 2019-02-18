var user_token = localStorage.getItem('token')
document.getElementById('add_interv').addEventListener('submit', addIntervention);
function addIntervention(e) {
    e.preventDefault();
    //capture user input
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById("longitude").value;
    var comment = document.getElementById('comment').value;
    var image = document.getElementById('image').value;
    if (name == "") {
        document.getElementById('messageInterv').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('name').style.border = "2px #F00 solid";
    }

    if (description == "") {
        document.getElementById('messageInterv').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('description').style.border = "2px #F00 solid";
    }

    if (latitude == "") {
        document.getElementById('messageInterv').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('latitude').style.border = "2px #F00 solid";
    }

    if (longitude == "") {
        document.getElementById('messageInterv').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('longitude').style.border = "2px #F00 solid";
    }

    if (comment == "") {
        document.getElementById('messageInterv').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('comment').style.border = "2px #F00 solid";
    }

    if (image == "") {
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('image').style.border = "2px #F00 solid";
    }

    else if (image == "" && comment == "" && latitude == "" && description == "" && name == "") {
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
        fetch('http://127.0.0.1:5000/api/v1/interventions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'x-access-token': user_token
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

}