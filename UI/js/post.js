function addRedflag(){
    //capture user input
    var name = document.getElementById('name').value;
    var description=document.getElementById('description').value;
    var latitude=document.getElementById('latitude').value;
    var longitude = document.getElementById("longitude").value;
    var comment=document.getElementById('comment').value;

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


    var post_data = {
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
        comment: comment
    }

    fetch('http://127.0.0.1:5000/api/v1/redflags',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(post_data)
    })
}