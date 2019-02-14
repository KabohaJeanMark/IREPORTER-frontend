var user_token = localStorage.getItem('token')

function addRedflag(){
    //capture user input
    var name = document.getElementById('name').value;
    var description=document.getElementById('description').value;
    var latitude=document.getElementById('latitude').value;
    var longitude = document.getElementById("longitude").value;
    var comment=document.getElementById('comment').value;
    var image = document.getElementById('image').value;

    //validation
    //var userInputs = [name, description, latitude, longitude, comment];

    //for(var i = 0; i<userInputs.length; i++){
     //   if (userInputs[i] == 0){
     //       alert("please fill in "+ userInputs[i]);
       //     return false;
       // }
   // }
    if (name == ""){
       alert("Please fill in name");
   }
    else if(description == ""){
       alert("Please fill in description");
   }
    else if (latitude == ""){
        alert("Please fill in latitude coordinates");
} 
    else if (longitude == ""){
        alert("Please fill in longitude coordinates");
} 
    else if(comment ==""){
        alert("Please fill in description");
    }
    else if(image == ""){
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

    fetch('http://127.0.0.1:5000/api/v1/redflags',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            Authorization:`Bearer ${user_token}`
        },
        body:JSON.stringify(post_data)
    })
    .then((response) => response.json())
        .then(function(message){
            if(message['data'][0]['message'] === 'Created red_flag record'){
                alert('Created red_flag record');
                window.location.replace('userprofile.html');

            }
            else if(message['msg'] === 'Token has expired'){
                alert('please log in again');
                window.location.replace('index.html');

            }


        });
}