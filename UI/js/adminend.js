window.onload = function getAllIncidents(){
    fetch("http://127.0.0.1:5000/api/v1/incidents", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
            
        },
    })
    .then((response)=> response.json())
        .then(function (message){
            if(message['data']){
                table_output =`<table id="myTable">
                <tr class="header">
                    <th>Type</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Location</th>
                    <th>Comment</th>
                    <th>State</th>
                    <th>Update</th>
                    
                </tr> `;
                message['data'].forEach(function (data){
                    var inc_id =data.incident_id;
                    localStorage.setItem('inc_id',inc_id);
                    table_output+=`<tr>
                    <td>${data.type}</td>
                    <td>${data.name}</td>
                    <td>${data.description}</td>
                    <td>${data.images}</td>
                    <td>${data.location}</td>
                    <td>${data.comment}</td>
                    <td>${data.status}</td>
                    <td><a href="update_status.html" id="submit" class="button2">Update status</a></td>
                </tr>`;
                });
                document.getElementById('allIncidentViews').innerHTML=table_output;
            }else{
                // display message to  the user incase they don't have any parcel orders
                document.getElementById('allIncidentViews').style.color="red";
                document.getElementById('allIncidentViews').innerHTML=`<h2>empty parcel orders list</h2>`;
            }
        });
    }

function updateStatus(redflag_id){
    var patched_status = document.getElementById('ed_status').value;
    var redflag_id = localStorage.getItem('redflag_id');
    var user_token = localStorage.getItem('token');

    if (patched_status == "") {
        document.getElementById('message_status').innerHTML = "<p style='color: #f00; margin: 5px;'><strong>Error:</strong> Empty field new status</p>";
        document.getElementById('ed_status').style.border = "2px #F00 solid";
    }
    var updated_status ={
        status: patched_status
    }

    fetch(`http://127.0.0.1:5000/api/v1/incidents/${redflag_id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': user_token
        },
        body: JSON.stringify(updated_status)
    })
        .then((response) => response.json())
        .then(function (message) {
            if (message['data'][0]['message'] === "Updated incident's status") {
                alert("Updated incident's status");
                window.location.replace('user_profile.html');

            }
            else if (message['error'] === 'token is invalid!') {
                alert('please log in again');
                window.location.replace('index.html');

            }
            else{
                alert('incident record not found');
                window.location.replace('user_profile.html')
            }
    
    
            });
}