
//loadingspinner 
$(document).ready(() => {
    searchByName(" ").then(() => {
        $(".home").fadeOut(200)
        $("body").css("overflow", "visible")
    })
})
/*start nav*/

$(".menu i#open").on("click",function(event){
    if ($(".menu").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})

function openNav() {
    $(".menu").animate({
        left: 0
    }, 200)
    $("#open").removeClass("fa-align-justify");
    $("#open").addClass("fa-x");
    for (var i = 0; i <=4 ; i++) {
        $(".links li").animate({
            top: 0
        }, (i +10) * 50)
    }
}
function closeNav() {
    var toggle = $(".menu .navbar").outerWidth()
    $(".menu").animate({left: -toggle}, 500)
    $("#open").addClass("fa-align-justify");
    $("#open").removeClass("fa-x");
    $(".links li").animate({
        top: 400
    }, 200)
}
closeNav()

/*endt nav*/

/*start search*/
function SearchInputs() {
    search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value )" class="form-control bg-transparent " type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value )" maxlength="1" class="form-control bg-transparent" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    allData.innerHTML = ""
}

//variables 
const allData = document.getElementById("allData");
const search = document.getElementById("search");
let submitBtn;

async function searchByName(e){
    allData.innerHTML = ""
    $(".loading").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`)
    response = await response.json()
    displayMeals(response.meals.slice(0,20))
    $(".loading").fadeOut(200) 
};
async function searchByFLetter(e) {
    allData.innerHTML = ""
    $(".loading").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`)
    response = await response.json() 
    displayMeals(response.meals.slice(0,20)) 
    $(".loading").fadeOut(200) 
}
/*end search*/

/*start displayMeals*/
function displayMeals(parameter) {
    let categories = " ";
    for (let i = 0; i < parameter.length; i++) {
        categories += `
        <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="getfullMealDetails('${parameter[i].idMeal}')">
                    <img class="w-100" src="${parameter[i].strMealThumb}">
                    <div class="meal-layer  position-absolute d-flex align-items-center text-black p-2">
                        <h3>${parameter[i].strMeal}</h3>
                    </div>
                </div>
        </div>`
    }
    allData.innerHTML = categories
}
/*start async function  & display catergory*/
async function getCategory() {
    allData.innerHTML = ""
    $(".loading").fadeIn(200)
    search.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let res = await response.json()
    displayCategory(res.categories)
    $(".loading").fadeOut(200)
}
function displayCategory(parameter) {
    let categories = "";
    for (let i = 0; i < parameter.length; i++) {
        categories += `
        <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="getFilterCategory('${parameter[i].strCategory}')" >
                    <img class="w-100" src="${parameter[i].strCategoryThumb}">
                    <div class="meal-layer text-black mx-auto">
                        <h3 class="text-center">${parameter[i].strCategory}</h3>
                        <p clas="par mt-2">${parameter[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    allData.innerHTML = categories
}
/*end async function & display catergory*/
/*start async function & display area*/
async function getArea() {
    allData.innerHTML = ""
    $(".loading").fadeIn(200)
    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let res = await respone.json()
    console.log(respone.meals);
    displayArea(res.meals)
    $(".loading").fadeOut(200)
}
function displayArea(parameter) {
    let categories = "";
    for (let i = 0; i < parameter.length; i++) {
        categories += `
        <div class="col-md-3">
                <div class="img rounded-2" onclick="getFilterArea('${parameter[i].strArea}')">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${parameter[i].strArea}</h3>
                </div>
        </div>`
    }
    allData.innerHTML = categories
}
/*end async function & display area*/
/*start async function & display Ingredient*/
async function getIngredient() {
    allData.innerHTML = ""
    $(".loading").fadeIn(200)
    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let res = await respone.json()
    console.log(respone.meals);
    displayIngredient(res.meals.slice(0,20))
    $(".loading").fadeOut(200)
}
function displayIngredient(parameter) {
    let categories = "";
    for (let i = 0; i < parameter.length; i++) {
        categories += `
        <div class="col-md-3">
                <div class="img rounded-2" onclick="getFilterIngredient('${parameter[i].strIngredient}')">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${parameter[i].strIngredient}</h3>
                        <p>${parameter[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div> `
    }
    allData.innerHTML = categories
}
/*end async function & display Ingredient*/
/*start async function filter */
async function getFilterCategory(category) {
    allData.innerHTML = ""
    $(".loading").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let res = await response.json()
    displayMeals(res.meals.slice(0,20))
    $(".loading").fadeOut(200)
}
async function getFilterArea(area) {
    allData.innerHTML = ""
    $(".loading").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let res = await response.json()
    displayMeals(res.meals.slice(0,20))
    $(".loading").fadeOut(200)
}
async function getFilterIngredient(ingredients) {
    allData.innerHTML = ""
    $(".loading").fadeIn(200)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let res = await response.json()
    displayMeals(res.meals.slice(0,20))
    $(".loading").fadeOut(200)
}
/*end async function filter */
async function getfullMealDetails(mealID) {
    allData.innerHTML = ""
    $(".loading").fadeIn(200)
    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let res = await respone.json();
    displaygetfullMealDetails(res.meals[0])
    $(".loading").fadeOut(200)
}
function displaygetfullMealDetails(meals) {
        search.innerHTML = "";
        
        let ingredients = ``
        //ingradiends1,ingradiends2,ingradiends3,ingradiends4,....
        for(let i = 1; i <= 25; i++) {
            if (meals[`strIngredient${i}`])//ingradiends1  
            { 
                //ingradiends+1
                //ingradiends1+1
                //ingradiends2+1
                //ingradiends3+1
                ingredients += `<li class="alert alert-info m-2 p-1">${meals[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}</li>`
            }
        }
        let tagsStr = ``
        for (let i = 0; i <=3; i++) {
            if(meals[`tagsStr${i}`])
            {
                tagsStr += `<li class="alert alert-danger m-2 p-1">${tagsStr[i]}</li>`
            }
        }
        let categories = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meals.strMealThumb}" alt="">
            <h2>${meals.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meals.strInstructions}</p>
            <h3><span class="SPAN">Area : </span>${meals.strArea}</h3>
            <h3><span class="SPAN">Category : </span>${meals.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="listt gap-2">${ingredients}</ul>
            <h3>Tags :</h3>
            <ul class="listt gap-2">${tagsStr}</ul>
            <a target="_blank" href="${meals.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meals.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`
    
    allData.innerHTML = categories
 } 
/*strat contact*/

function Contact() {
    allData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="Nameinput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="name allowed" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="Emailinput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="email valid" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="Phoneinput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="valid Phone" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageinput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="valid age" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="Passwordinput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="valid password" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="Conf_password input" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="valid password_confirm" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")

/*start focus inputs*/
    document.getElementById("Nameinput").addEventListener("focus", () => {
        usernameValid = true
    })

    document.getElementById("Emailinput").addEventListener("focus", () => {
        emailValid = true
    })

    document.getElementById("Phoneinput").addEventListener("focus", () => {
        phoneValid = true
    })

    document.getElementById("ageinput").addEventListener("focus", () => {
        ageValid = true
    })

    document.getElementById("Passwordinput").addEventListener("focus", () => {
        passwordValid = true
    })

    document.getElementById("Conf_password input").addEventListener("focus", () => {
        conf_passwordValid = true
    })
    /*end focus inputs*/
}

//variables
let usernameValid = false;
let emailValid = false;
let phoneValid = false;
let ageValid = false;
let passwordValid = false;
let conf_passwordValid = false;

//check validaition
function inputsValidation() {
    if (usernameValid) {
        if (nameValidation()) {
            document.getElementById("name allowed").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("name allowed").classList.replace("d-none", "d-block")

        }
    }
    if (emailValid) {

        if (emailValidation()) {
            document.getElementById("email valid").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("email valid").classList.replace("d-none", "d-block")

        }
    }

    if (phoneValid) {
        if (phoneValidation()) {
            document.getElementById("valid Phone").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("valid Phone").classList.replace("d-none", "d-block")

        }
    }

    if (ageValid) {
        if (ageValidation()) {
            document.getElementById("valid age").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("valid age").classList.replace("d-none", "d-block")

        }
    }

    if (passwordValid) {
        if (passwordValidation()) {
            document.getElementById("valid password").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("valid password").classList.replace("d-none", "d-block")

        }
    }
    if (conf_passwordValid) {
        if (conf_passwordValidation()) {
            document.getElementById("valid password_confirm").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("valid password_confirm").classList.replace("d-none", "d-block")

        }
    }
}

/*start regex*/
function nameValidation() {
    let =(/^[a-zA-Z ]+$/.test(document.getElementById("Nameinput").value))
}

function emailValidation() {
    let= (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("Emailinput").value))
}

function phoneValidation() {
    let= (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("Phoneinput").value))
}

function ageValidation() {
    let= (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageinput").value))
}

function passwordValidation() {
    let= (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("Passwordinput").value))
}

function conf_passwordValidation() {
    let= document.getElementById("Conf_password input").value == document.getElementById("Passwordinput").value
}
/*end regex*/