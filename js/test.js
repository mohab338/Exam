let row= document.querySelector('.row');
let cont=document.querySelector('.cont');
let forma=document.querySelector('.forma');
let body=document.body;
let result=[];
let userName,
    userEmail,
    userPhone,
    userAge,
    userPassword,
    userRePassword,
    userNameAlert,
    userEmailAlert,
    userPhoneAlert,
    userAgeAlert,
    userpasswordAlert,
    userRepasswordAlert;

$('.selecto').click(function(){
    $('.leftNav').toggle(500,function(){
        $('.search').slideToggle(500,function(){
            $('.categories').slideToggle(200,function(){
                $('.area').slideToggle(200,function(){
                    $('.ingred').slideToggle(200,function(){
                        $('.contact').slideToggle(500)
                    })
                })
            })
        })
    });
    

})

async function defaults(){
    let meal=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let response= await meal.json();
    result= response.meals;
    console.log(result);
    displayData();
    

   
   

}


function displayData(){
    let categ='';
    for(let i=0;i<result.length;i++){
        categ+=`
        <div class="col-lg-3 position-relative">
     <div onclick=' getDataById(${result[i].idMeal})'>
                
        <div class="layer fs-2 px-3"><div>${result[i].strMeal}
        </div>
        
    </div>


        <img class="w-100" src="${result[i].strMealThumb}
        " alt="">
</div>
</div>
        `

    }
    row.innerHTML=categ;
    

  
    


    
}

async function getDataById(id){
    let trs='';
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let response=await x.json();
    console.log(response);
    trs+=`
    <div class="row">
    <div class="col-lg-6">
        <img class="w-75" src="${response.meals[0].strMealThumb}" alt="">


    </div>
    <div class="col-lg-6 text-white">
        <h2>instructions</h2>
        <p>${response.meals[0].strInstructions}</p>
        <div class="d-flex justify-content-start">
            <p class="px-1 fw-bold">Area:</p>
            <p>${response.meals[0].strArea}</p>
        </div>
        <div class="d-flex justify-content-start">
            <p class="px-1 fw-bold">Category:</p>
            <p>${response.meals[0].strCategory}</p>
        </div>
        <h2>Recipes:</h2>
        <div class="d-flex flex-wrap mb-4 ">
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient1}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient2}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient3}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient4}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient5}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient6}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient7}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient8}</div>
            <div class="recipeBg p-2  m-2 rounded">${response.meals[0].strIngredient9}</div>
       
            

        </div>
        <h2>Tags</h2>
        <div class="d-flex flex-wrap mb-4">
            <div class="tagBg p-2  m-2 rounded">${response.meals[0].strTags}</div>



        </div>
        <div>
            <div class="btn bg-success text-white"><a href="${response.meals[0].strSource}">Source</a></div>
            <div class="btn bg-danger"><a href="${response.meals[0].strYoutube}">youtube</a></div>
        </div>
        

        
    </div>

</div>
    
    `
    row.innerHTML=trs;



    



}
 defaults();


async function category(){
   
    let meals= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
   let response= await meals.json();
    result=response.categories;
    console.log(result);
    displayData();
   

    
    
}

async function search(){
    
    forma.innerHTML=`
    <input id=inp1 type="text" class="form form-control me-3 bg-black text-white names" onkeyup="filterSearch()" placeholder="Search By Name">
    <input id=inp2 type="text" class="form form-control bg-black text-white letters" placeholder="Search By First Letter..." maxlength="1" >
    `
    row.innerHTML='';
    $('#inp1').keyup(function(){
        console.log($('#inp1').val());
        filterSearch($('#inp1').val());
    })
   $('#inp2').keyup(function(){
    filterSearch($('#inp2').val());

   })
}

 async function filterSearch(id){
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`)

    let response=await x.json();
    result=response.meals;
    console.log(result);
    
   
    let trs='';

    for(let i=0;i<result.length;i++){
        trs+=`
        <div class="col-lg-3 position-relative">
        <div onclick=' getDataById(${result[i].idMeal})'>
                   
           <div class="layer fs-2 px-3"><div>${result[i].strMeal}
           </div>
           
       </div>
   
   
           <img class="w-100" src="${result[i].strMealThumb}
           " alt="">
       
   
     </div>
   </div>

        `
    }

    row.innerHTML=trs;
}

 async function categories(){
    let x= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let response= await x.json();
    console.log(response.categories);
    result=response.categories;
    let trs='';
    for(let i=0;i<result.length;i++){
   
       trs+=`
       
       <div class="col-lg-3 position-relative">
        <div onclick="filterCateg('${result[i].strCategory}')">
                   
           <div class="layer fs-2 px-3"><div>${result[i].strCategory}
           </div>
           
       </div>
   
   
           <img class="w-100" src="${result[i].strCategoryThumb}
           " alt="">
   </div>
   </div>
   
       
       `
    }
    row.innerHTML=trs;
    forma.innerHTML='';

}

 
async function filterCateg(cara){
    let trs='';
    let x= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cara}`)
    let response=await x.json();
    result=response.meals;
    console.log(result);
    for(let i=0;i<result.length;i++){
        trs+=`
        <div class="col-lg-3 position-relative">
       
        <div onclick=' getDataById(${result[i].idMeal})'>
        <div class="layer fs-2 px-3"><div>${result[i].strMeal}
        </div>
        
    </div>


        <img class="w-100" src="${result[i].strMealThumb}
        " alt="">
</div>
</div>

        
        
        `
    }
    row.innerHTML=trs;
    forma.innerHTML='';


}

async function area(){
    let trs='';
let x =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
let response= await x.json()
result=response.meals;
console.log(result);
for(let i=0;i<result.length;i++){
    trs+=`
    <div class="col-lg-3 position-relative">
    <div onclick="filterByArea('${result[i].strArea}')">

    <div><i class="icon build  fa-solid fa-city"></i>></div>
    <div class='fs-3 text-white'>${result[i].strArea}</div>
    </div>

</div>

    
    `
}
row.innerHTML=trs;
forma.innerHTML='';

}

async function filterByArea(id){
    let trs='';
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`);
    let response=await x.json();
    result=response.meals;
    for(let i=0;i<result.length;i++){
        trs+=`
        <div class="col-lg-3 position-relative">
        <div onclick=' getDataById(${result[i].idMeal})'>
                   
           <div class="layer fs-2 px-3"><div>${result[i].strMeal}
           </div>
           
       </div>
   
   
           <img class="w-100" src="${result[i].strMealThumb}
           " alt="">
   </div>
   </div>
   
   
        
        `
    }
    row.innerHTML=trs;
    forma.innerHTML='';


}

async function ingred(){
    trs='';
    let x=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let response=await x.json();
    result=response.meals;
    console.log(result);
    for(let i=0;i<20;i++){
        trs+=`
        <div class="col-lg-3 position-relative mb-5 text-center">
        <div onclick="filterIngred('${result[i].strIngredient}')">

    <div><i class="iconingred fs-1 fa-solid fa-bowl-food"></i></div>
    <div class='fs-2 text-white'>${result[i].strIngredient}</div>
    <div class='testingred text-white'>${result[i].strDescription}</div>
    </div>
    </div>



        
        `
    }
    row.innerHTML=trs;
    forma.innerHTML='';
}

async function filterIngred(id){
    let trs='';
    let x=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`);
    let response= await x.json();
    result=response.meals;
    for(let i=0;i<result.length;i++){
        trs+=`
        <div class="col-lg-3 position-relative">
        <div onclick=' getDataById(${result[i].idMeal})'>
                   
           <div class="layer fs-2 px-3"><div>${result[i].strMeal}
           </div>
           
       </div>
   
   
           <img class="w-100" src="${result[i].strMealThumb}
           " alt="">
   </div>
   </div>
        
        `
    }
    row.innerHTML=trs;
    forma.innerHTML='';

}

function contactus(){
    
   
  row.innerHTML=`      
  <h2 class='text-white text-center fs-2 mb-5'>Contact Us...</h2>                 
    <div class="col-lg-6">

   <div class="form-group">
       <input class="bg-transparent mb-4 form-control shadow " onkeyup='validation()' id="name" placeholder="Enter Your Name">
       <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
           Special Characters and Numbers not allowed
       </div>
   </div>
   
       <div class="form-group">
           <input class="bg-transparent mb-4 form-control shadow " onkeyup="validation()" id="email" placeholder="Enter Your email">
           <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
           enter valid email
           </div>
                   <div class="form-group">
                       <input class="bg-transparent mb-4 form-control shadow " onkeyup="validation()" id="phone" placeholder="phone">
                       <div class="alert mt-1 alert-danger d-none" id="phonealert" role="alert">
                       enter valid phone
                       </div>
                <div class="col-lg-6">
                   
                </div> 

<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-5">Submit</button>
</div>


</div> 


</div>
<div class=" col-lg-6" >
<div class="form-group">
<input class="bg-transparent mb-4 form-control shadow " onkeyup="validation()" id="age" placeholder="age">
<div class="alert mt-1 alert-danger d-none" id="agealert" role="alert">
enter valid number
</div>
</div>

<div class="form-group">
<input type='password' class="bg-transparent mb-4 form-control shadow " onkeyup="validation()" id="password" placeholder="pass">
<div class="alert mt-1 alert-danger d-none" id="passwordalert" role="alert">
enter valid password
</div>
</div>


<div class="form-group">
<input type='password' class="bg-transparent mb-4 form-control shadow  " onkeyup="validation()" id="rePassword" placeholder="repass">
<div class="alert mt-1 alert-danger d-none" id="repasswordalert" role="alert">
enter valid password
</div>

</div>
</div>  `
userName = document.getElementById("name"),
userEmail = document.getElementById("email"),
userPhone = document.getElementById("phone"),
userAge = document.getElementById("age"),
userPassword = document.getElementById("password"),
userRePassword = document.getElementById("rePassword"),
userNameAlert = document.getElementById("namealert"),
userEmailAlert = document.getElementById("emailalert"),
userPhoneAlert = document.getElementById("phonealert"),
userAgeAlert = document.getElementById("agealert"),
userpasswordAlert = document.getElementById("passwordalert"),
userRepasswordAlert = document.getElementById("repasswordalert");
row.innerHTML=eee;
forma.innerHTML='';
    
}

function userNameValid() {


   return /^[a-zA-Z ]+$/.test(userName.value)
}
function userEmailValid() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}

function userPhoneValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}

function userAgeValid() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function userPasswordValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}

function userRePasswordValid() {
    return userPassword.value == userRePassword.value
}
 
function validation(){
  console.log ('sdasd')
    if (userNameValid()) {
        userName.classList.remove("is-invalid")
        userName.classList.add("is-valid")
        userNameAlert.classList.add("d-none")


    } else {
        userName.classList.remove("is-valid")
        userName.classList.add("is-invalid")

        userNameAlert.classList.remove("d-none")
    }
    if (userEmailValid() ) {
        userEmail.classList.remove("is-invalid")
        userEmail.classList.add("is-valid")
        userEmailAlert.classList.add("d-none")
        // userNameAlert.classList.replace("d-block", "d-none")

    } else {
        userEmail.classList.remove("is-valid")
        userEmail.classList.add("is-invalid")

        userEmailAlert.classList.remove("d-none")
    }
    if (userPhoneValid()  ) {
        userPhone.classList.remove("is-invalid")
        userPhone.classList.add("is-valid")
        userPhoneAlert.classList.add("d-none")
    

    } else {
        userPhone.classList.remove("is-valid")
        userPhone.classList.add("is-invalid")

        userPhoneAlert.classList.remove("d-none")
    }
    if (userAgeValid()  ) {
        userAge.classList.remove("is-invalid")
        userAge.classList.add("is-valid")
        userAgeAlert.classList.add("d-none")
        

    } else {
        userAge.classList.remove("is-valid")
        userAge.classList.add("is-invalid")

        userAgeAlert.classList.remove("d-none")
    }
    if (userPasswordValid()   ) {
        userPassword .classList.remove("is-invalid")
        userPassword .classList.add("is-valid")
        userpasswordAlert.classList.add("d-none")
    

    } else {
        userPassword.classList.remove("is-valid")
        userPassword.classList.add("is-invalid")

        userpasswordAlert.classList.remove("d-none")
    }
    if ( userRePasswordValid()  ) {
        userRePassword.classList.remove("is-invalid")
        userRePassword.classList.add("is-valid")
        userRepasswordAlert.classList.add("d-none")
        // userNameAlert.classList.replace("d-block", "d-none")

    } else {
        userRePassword.classList.remove("is-valid")
        userRePassword.classList.add("is-invalid")

        userRepasswordAlert.classList.remove("d-none")
    }
if(userNameValid()&&userEmailValid()&& userPhoneValid() &&userAgeValid() &&userPasswordValid()&& userRePasswordValid() ){
    document.getElementById("submitBtn").removeAttribute("disabled")
}else{
    document.getElementById("submitBtn").setAttribute("disabled","true")
}





}


