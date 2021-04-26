

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit' ,(e)=>{
    e.preventDefault()
    const email = loginForm['email'].value  
    const password = loginForm['password'].value

    auth.signInWithEmailAndPassword(email,password).then(cred=>{
        console.log(cred.user)
        alert("You Logged In")
    }).catch(err=>{
        res.status(400).json(err)
    })

})