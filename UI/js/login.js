function signIn(){
    var user_name = document.getElementById('username').value;
    var pass_word = document.getElementById('password').value;


    //form validation
    if (user_name == ''){
        alert("Please fill in your username");
        return false
    }
    else if(pass_word ==''){
        alert("Please fill in your password");
        return false
    }
    else if(user_name =='admin' && pass_word =='admin1'){
        window.location.replace('admin_profile.html');
        alert("Welcome admin");
    }

    //posting data to the db
    var signin_data = {
        username: user_name,
        password: pass_word
    }


    fetch('http://127.0.0.1:5000/api/v1/auth/login',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(signin_data)
    })
        .then((response) => response.json())
        .then(function(message){
            if(message['token']){
                window.location.replace('user_profile.html');
                alert('successfully logged in');

                var token = message['token'];
                localStorage.setItem('token',token);
            }
            else if(message['message']=== 'Please enter valid username and password'){
                alert('Please enter valid username and password');
                return false
            }


        });


}