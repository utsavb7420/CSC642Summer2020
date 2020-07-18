let fname=document.getElementById('first-name')
let lname=document.getElementById('last-name')
let address=document.getElementById('address')
let zipcode=document.getElementById('zipcode')
let dob=document.getElementById('dob')
let education=document.getElementById('education')
let feet=document.getElementById('feet')
let inches=document.getElementById('inches')
let phone=document.getElementById('phone')
let email=document.getElementById('email')
let confirmEmail=document.getElementById('confirm-email')
let gridCheck=document.getElementById('gridCheck')
let btn=document.querySelector('.submit-btn')

localStorage.clear();

function GenerateCaptcha() {
    var chr1 = Math.ceil(Math.random() * 10) + '';
    var chr2 = Math.ceil(Math.random() * 10) + '';
    var chr3 = Math.ceil(Math.random() * 10) + '';
    document.getElementById('captcha-error').innerText=""
    var str = new Array(4).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"](); });
    var captchaCode = str + chr1 + chr2 + chr3;
    document.getElementById("txtCaptcha").innerHTML = captchaCode
}

/* Validating Captcha Function */
function captchaValidate() {
    document.getElementById('captcha-error').innerText=""
    var str1 = removeSpaces(document.getElementById('txtCaptcha').innerText);
    var str2 = removeSpaces(document.getElementById('txtCompare').value);
    if (str1 !== str2){
        document.getElementById('captcha-error').innerText="Catpcha does not match"
    }
    return true
}

/* Remove spaces from Captcha Code */
function removeSpaces(string) {
    return string.split(' ').join('');
}
function phoneValidate(){
  var pattern = /^\d{7}$/;
  if(phone.value !== ""){
        document.getElementById('phone-error').innerText=""
        if(!phone.value.match(pattern)){
            document.getElementById('phone-error').innerText="Phone number must contain 7 positive digits"
        }
        return true
    }
    else{
        document.getElementById('phone-error').innerText="Must not be empty"
    }
}
function emailValidate(){
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value !== ""){
        document.getElementById('email-error').innerText=""
        if(!email.value.match(mailformat)){
            document.getElementById('email-error').innerText="Invalid email"
        }
        return true
    }
    else{
        document.getElementById('email-error').innerText="Must not be empty"
    }
}
function matchEmail(){
    if(confirmEmail.value !== ""){
        document.getElementById('confirmEmail-error').innerText=""
        if(email.value !== confirmEmail.value){
            document.getElementById('confirmEmail-error').innerText="Email must match"
        }
        return true
    }
    else{
        document.getElementById('confirmEmail-error').innerText="Must not be empty"
    }
}
function nameValidate(){
    if(fname.value !== "" && lname.value !== ""){
        document.getElementById('name-error').innerText=""
        if(fname.value.length > 40 || lname.value.length > 40){
            document.getElementById('name-error').innerText="Name must not exceed 40 characters"
        }
        return true
    }
    else{
        document.getElementById('name-error').innerText="Name must not be empty"
    }
}
function zipcodeValidate(){
    var pattern = /^\d{5}$/;
    if(zipcode.value !== ""){
        document.getElementById('zipcode-error').innerText=""
        if(!zipcode.value.match(pattern)){
            document.getElementById('zipcode-error').innerText="Invalid zipcode. Zipcode must contain 5 positive digits"
        }
        return true
    }
    else{
        document.getElementById('zipcode-error').innerText="Zipcode must not be empty"
    }
}
function addressValidate(){
    if(address.value !== ""){
        document.getElementById('address-error').innerText=""
        if(address.value.length > 40 ){
            document.getElementById('address-error').innerText="Address must not exceed 40 characters"
        }
        return true
    }
    else{
        document.getElementById('address-error').innerText="Address must not be empty"
    }
}
function isEmpty(){
    if(dob.value === ""){
        document.getElementById('dob-error').innerText="Must not be empty"
    }
    if(feet.value === "" || inches.value === ""){
        document.getElementById('height-error').innerText="Height must not be empty"
    }
    if(!gridCheck.checked){
        document.getElementById('gridCheck-error').innerText="You must agree before submitting form"
    }
    else
        return true
}
const submitForm=(e)=>{
    e.preventDefault()
    isEmpty()
    nameValidate()
    emailValidate()
    matchEmail()
    phoneValidate()
    addressValidate()
    zipcodeValidate()
    captchaValidate()
    if(isEmpty()===true && nameValidate()===true && emailValidate()===true && matchEmail()===true && phoneValidate()===true && addressValidate()===true && zipcodeValidate()===true && captchaValidate()===true){
        console.log('successfully submitted');
        document.querySelector('.submit-btn').style.backgroundColor="#2ecc71"
        document.querySelector('.alert').style.display="block"
        window.localStorage.setItem('name', `${fname.value} ${lname.value}`)
        window.localStorage.setItem('address',address.value)
        window.localStorage.setItem('zipcode',zipcode.value)
        window.localStorage.setItem('dob',dob.value)
        window.localStorage.setItem('education', education.value)
        window.localStorage.setItem('height', `${feet.value}ft ${inches.value}in`)
        window.localStorage.setItem('phone', phone.value)
        window.localStorage.setItem('email', email.value)
    }
    //console.log('successfully submitted');
}

btn.addEventListener('click',submitForm)