

document.getElementById('btn-click').addEventListener('click', function() {
    const enterUsername = document.getElementById('enter-username');
    const Username = enterUsername.value;
    console.log(Username);

    const enterPassword = document.getElementById('enter-password');
    const Password = enterPassword.value;
    console.log(Password);

    if(Username === 'admin' && Password === 'admin123') {
        alert('Login successful!');

        window.location.assign('./home.html');

    }  else if (Username === '' && Password === '' || Username === ' ' && Password === ' '){
        alert('plz enter your username and password')
    }
       else {
        alert('Login failed! Please check your Username and Password.');
        return;
    }
})