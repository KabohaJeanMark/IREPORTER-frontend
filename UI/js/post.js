var user_token = localStorage.getItem('token')
document.getElementById('add_red').addEventListener('submit', addRedflag);
function addRedflag(e) {
    e.preventDefault();
    //capture user input
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var location = document.getElementById('location').value;
    var comment = document.getElementById('comment').value;
    var image = document.getElementById('image').value;
    if (name == "") {
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('name').style.border = "2px #F00 solid";
    }

    if (description == "") {
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('description').style.border = "2px #F00 solid";
    }

    if (location == "") {
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('location').style.border = "2px #F00 solid";
    }

    if (comment == "") {
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('comment').style.border = "2px #F00 solid";
    }

    if (image == "") {
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('image').style.border = "2px #F00 solid";
    }

    else if (image == "" && comment == "" && location == "" && description == "" && name == "") {
        document.getElementById('message').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field detected</p>";
        document.getElementById('image').style.border = "2px #F00 solid";
    }
    else {
        var post_data = {
            name: name,
            description: description,
            location: location,
            images: image,
            comment: comment
        }
        fetch('http://127.0.0.1:5000/api/v1/incidents/redflags', {
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
                if (message['data'][0]['message'] === 'Created incident record') {
                    alert('Created red_flag record');
                    window.location.replace('userprofile.html');

                }
                else if (message['error'] === 'token is invalid!') {
                    alert('please log in again');
                    window.location.replace('index.html');

                }


            });

    }

}

window.onload = function GetRedFlags() {
    fetch("https://127.0.0.1:5000/api/v1/incidents/red-flags", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-access-token': user_token
        },
    })
        .then((response) => response.json())
        .then(response => console.log(response))
        .then(function (message) {
            if (message['data']) {
                incident_records = ``

                for (var item = message['data'].length - 1; item >= 0; item--) {
                    redflagId = message['data'][incident].id
                    incidentStatus = message['data'][incident].status
                    incident_records = ``

                    if (incidentStatus === 'draft') {
                        incident_records += ` <div class="row userList">
                        <div class="col-11">
                            <table id="myTable">
                                <tr class="header">
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Location</th>
                                    <th>State</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr> 
                                <tr>
                                    <td id= "incident_type" >${message['data'][item].type}</td><td id= "incident_name">${message['data'][incident].name}</td><td id="incident_description">${message['data'][incident].description}</td>
                                    <td id="incident_image">${message['data'][incident].image}</td><td id="location">${message['data'][item].location}</td>
                                    <td id= "status">draft</td>
                                    <td><a href="userEdit.html" id="submit" class="button2">Edit</a></td>
                                    <td><input type="submit" value="delete" class="button2"></td>
                                </tr>
                            </table>
                        </div><br/><br/>`
                        
                    }
                    else {
                        incident_records += `
                        <div class="col-11">
                            <table id="myTable">
                                <tr class="header">
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Location</th>
                                    <th>State</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr> 
                                <tr>
                                    <td id= "incident_type" >${message['data'][item].type}</td>
                                    <td id= "incident_name">
                                    ${message['data'][incident].name}
                                    </td>
                                    <td id="incident_description">${message['data'][incident].description}</td>
                                    <td id="incident_image">${message['data'][incident].image}</td>
                                    <td id="location">${message['data'][incident].location}</td>
                                    <td id= "status">${message['data'][incident].status}</td>
                                    <td>You cannot Edit</td>
                                    <td>You cannot delete</td>
                                </tr>
                            </table>
                        </div>
                        
                        <br/>
                        <br/>
                        <br/>`

                    }
                }
                document.getElementById('redflagViews').innerHTML = incident_records;
            }
            else if(message['message'] === 'incident record not found'){
                    incident_records = `<h1>red-flag records not found!</h1>`;
                    document.getElementById('redflagViews').innerHTML = incident_records;
                }
            else{
                    incident_records=`<h1>token has expired please login again!</h1>`
                    document.getElementById('redflagViews').innerHTML=incident_records;
                }
            
            
        });
        
    }
