let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
let submit = document.getElementById('submit');
let myForm = document.querySelector('form');



firstName.addEventListener('blur', function (e) {
    isEmpty(e.target);
});

lastName.addEventListener('blur', function (e) {
    isEmpty(e.target);
});

password.addEventListener('blur', function (e) {
    isEmpty(e.target);

    let isValid = validatePassword(password.value);
    let comparePasswords = password.value === confirmPassword.value;

    if (isValid && comparePasswords) {
        confirmPassword.style.borderBottom = '2px solid #F2F2F2';
        password.style.borderBottom = '2px solid #F2F2F2';
        password.classList.remove('redBorder');
        confirmPassword.classList.remove('redBorder');
        
    } else {
        confirmPassword.style.borderBottom = '2px solid red';
        password.style.borderBottom = '2px solid red';
        password.classList.add('redBorder');
        confirmPassword.classList.add('redBorder');
    }
});

confirmPassword.addEventListener('blur', function (e) {
    isEmpty(e.target);

    let isValid = validatePassword(confirmPassword.value);
    let comparePasswords = password.value === confirmPassword.value;

    if (isValid && comparePasswords) {
        confirmPassword.style.borderBottom = '2px solid #F2F2F2';
        password.style.borderBottom = '2px solid #F2F2F2';
        confirmPassword.classList.remove('redBorder');
        password.classList.remove('redBorder');
        
    } else {
        confirmPassword.style.borderBottom = '2px solid red';
        password.style.borderBottom = '2px solid red';
        confirmPassword.classList.add('redBorder');
        password.classList.add('redBorder');
    }
});

email.addEventListener('blur', function (e) {

    let validateEmailResult = validateEmail(e.target.value);
    if (!validateEmailResult) {
        email.style.borderBottom = '2px solid red';
        email.classList.add('redBorder');
    }
    else {
        email.style.borderBottom = '2px solid #F2F2F2';
        email.classList.remove('redBorder');
    }

});

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function isEmpty(e) {
    if (e.value === "") {
        e.style.borderBottom = '2px solid red';
        e.classList.add('redBorder');
    }
    else {
        e.style.borderBottom = '2px solid #F2F2F2';
        e.classList.remove('redBorder');
    }
}


function validatePassword(text) {
    // Проверка длины пароля
    if (text.length < 8) {
        return false;
    }

    // Проверка наличия заглавных и строчных букв и цифр
    var hasUpperCase = false;
    var hasLowerCase = false;
    var hasNumber = false;

    for (var i = 0; i < text.length; i++) {
        var char = text[i];

        if (/[A-Z]/.test(char)) {
            hasUpperCase = true;
        } else if (/[a-z]/.test(char)) {
            hasLowerCase = true;
        } else if (/[0-9]/.test(char)) {
            hasNumber = true;
        }
    }

    // Проверка выполнения всех требований
    return hasUpperCase && hasLowerCase && hasNumber;
}

submit.addEventListener('click', async function(e) {
    e.preventDefault();

    let isDataValidate = false;

    if (firstName.value !== "" && lastName.value !== "" && email.value !== "" && password.value !== "" && confirmPassword.value !== "") {
        if (document.querySelectorAll('.redBorder').length === 0) {
            isDataValidate = true;
        }
    }
    
    console.log(document.querySelector('.redBorder'));

    if (!isDataValidate) {
        submit.classList.add('wow', 'tada', 'animated');
       

        setTimeout(() => {
            submit.classList.remove('wow', 'tada', 'animated');
           
        }, 2000);

        return;
    }

    let formData = new FormData(myForm);

    let response = await fetch('http://hirahira.zzz.com.ua/Registration_Form_test/', {
        method: 'POST',
        body: formData
      })
  
      if (response.ok) {
        //this hosting doesn't support json data packets, so I use text
        let result = response.text;
        console.log(result);

        myForm.reset();
        alert('Регистрация прошла успешно!');

        let informationBlock = document.querySelector('.informationBlock');
        let newBlock = document.createElement('div');
        newBlock.classList.add('newBlock')

        let newH2 = document.createElement('h2');
        newH2.innerHTML = 'Thank you';
        newH2.classList.add('newH2')
        newBlock.appendChild(newH2);

        let newP = document.createElement('p');
        newP.innerHTML = 'you registered!';
        newP.classList.add('newP')
        newBlock.appendChild(newP);

        informationBlock.parentElement.prepend(newBlock);
        informationBlock.remove();
      }
      else {
        alert('Error: ' + response.status);
      }
})


