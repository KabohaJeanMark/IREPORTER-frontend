function regUser(){
    //getting user input data from form
    var fname = document.getElementById('firstName').value;
	var lname = document.getElementById('lastName').value;
	var oname = document.getElementById('otherName').value;
    var username = document.getElementById('username').value;
    var phonenumber = document.getElementById('phonenumber').value;
    var email = document.getElementById("email").value;
    var password = document.getElementById('password').value;


    //form input validation
    if(fname ==''){
        alert("please fill in your first name");
        return false
    }
    else if(lname ==''){
        alert("please fill in your last name");
        return false
    }
    else if(oname ==''){
        alert("please fill in your other name");
        return false
    }
    else if(username ==''){
        alert("please fill in your username");
        return false
    }
    else if (phonenumber == ''){
        alert("please fill in your phone number");
        return false
    }
    else if(email== ''){
        alert("please fill in your enter email");
        return false
    }else if(password== ''){
        alert("please enter your password");
        return false
    }

    //posting to the db

    var user_regdata = {
        first_name:fname,
        last_name:lname,
        othernames:oname,
        username:username,
        phone_number: phonenumber,
        email:email,
        password:password
    }

    fetch('http://127.0.0.1:5000/api/v1/auth/signup',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(user_regdata)
    })
        .then((response) => response.json())
        //.then(response => response.text())
        //.then(text => console.log(text))
        .then(function(message){
            if(message['message']=== 'That username already exists'){
                alert('That username already exists');
                return false
            }
            else if(message['message']=== 'That email is already taken'){
                alert('That email is already taken');
                return false
            }
            else if(message['message']=== 'The phone number should be a string of atleast 10 digits'){
                alert('The phone number should be a string of atleast 10 digits');
                return false
            }
            else if(message['message']=== 'The email address is in the wrong format'){
                alert('The email address is in the wrong format');
                return false
            }
            else if(message['message']=== 'The username should be a normal string without special characters'){
                alert('The username should be a normal string without special characters');
                return false
            }

            
            else if(message['data'][0]['message']==='User has been succesfully created'){
            	window.location.replace('index.html');
                alert('User has been succesfully registered');
            }
    });
    
}