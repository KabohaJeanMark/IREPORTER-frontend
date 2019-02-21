window.onload = function getAllUsers(){
    fetch("https://kjmkirepohost.herokuapp.com/api/v1/admin/users", {
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
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>User name</th>
                    <th>Email</th>
                    <th>Created at</th>
                    <th>Admin role</th>
                    <th>Update Role</th>
                    
                </tr> `;
                message['data'].forEach(function (data){
                    var user_id =data.user_id;
                    localStorage.setItem('user_id',user_id);
                    table_output+=`<tr>
                    <td>${data.firstname} ${data.lastname} ${data.othername}</td>
                    <td>${data.phonenumber}</td>
                    <td>${data.username}</td>
                    <td>${data.email}</td>
                    <td>${data.created_at}</td>
                    <td>${data.admin}</td>
                    <td><input type="button"  id="submit" value="make admin" class="button2" onclick="updateAdminRole()"</td>
                </tr>`;
                });
                document.getElementById('allUserViews').innerHTML=table_output;
            }else{
                // display message to  the user incase they don't have any parcel orders
                document.getElementById('allUserViews').style.color="red";
                document.getElementById('allUserViews').innerHTML=`<h2>empty users list</h2>`;
            }
        });
    }

function updateAdminRole(user_id){
    var user_id = localStorage.getItem('user_id');
    var user_token = localStorage.getItem('token');

    var updated_role ={
        user_role: "True"
    }

    fetch(`https://kjmkirepohost.herokuapp.com/api/v1/admin/${user_id}/status`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'x-access-token': user_token
        },
        body: JSON.stringify(updated_role)
    })
        .then((response) => response.json())
        .then(function (message) {
            if (message['data'][0]['message'] === "Updated user's role to admin") {
                alert("Updated user's role to admin");
                window.location.replace('all_users.html');

            }
            else if (message['error'] === 'token is invalid!') {
                alert('please log in again');
                window.location.replace('index.html');

            }
            else{
                alert('user record not found');
                window.location.replace('all_users.html')
            }
    
    
            });
}