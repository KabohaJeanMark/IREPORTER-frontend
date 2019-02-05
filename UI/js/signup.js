function regUser(){
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
    if(lname ==''){
        alert("please fill in your last name");
        return false
    }
    if(oname ==''){
        alert("please fill in your other name");
        return false
    }
    if(username ==''){
        alert("please fill in your username");
        return false
    }
    if (phonenumber == ''){
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
}