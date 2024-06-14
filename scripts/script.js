import { updatePassenger } from "./crud.mjs";


let user_score = 0;

var age_less_than_10_old = 90;
var age_between_10_and_18_old = 30;
var age_between_18_and_30_old = 20;
var age_more_than_30_old = 0;

var Primary_school = 10;
var middle_school = 18;
var high_school = 30;
var university = 50;

var programmer = 20;
var doctor = 17;
var engineer = 15;

var less_than_one_year = -7;
var between_one_and_5_years = -17;
var more_than_5_years = -27;
var never = -0;

async function get_specialization(){
  var specialization = document.getElementById("specialization").value;
  var specialization_other = document.getElementById("the_other_specialization").value;
  var the_other_specialization_c = document.getElementById("the_other_c");
    
  if(specialization == "other"){
    the_other_specialization_c.style.display = "inline";
    specialization = await get_Change_specialization();
  }else{
    the_other_specialization_c.style.display = "none";
    specialization = document.getElementById("specialization").value;
  }
  
  return specialization;
}

function saveData(data){
  updatePassenger(data);
  console.log(data[3]);
}

function getAllData() {
  var purpose = document.getElementById("purpose").value;
  getFormByPurpose(purpose);
  var duration = document.getElementById("duration").value;
  //var specialization = get_specialization();
  var company_name = document.getElementById("company_name").value;
  var fullName = document.getElementById("full-name").value;
  var age = parseInt(document.getElementById("age").value,10);
  var academicLevel = document.getElementById("academic-level").value;
  var specialization = document.getElementById("specialization").value;
  getFormBySpecialization(purpose , specialization);
  var specialization_ = document.getElementById("the_other_specialization").value;
  var precedents = document.getElementById("precedents").value;
 // var data =[fullName, age, purpose, duration, academicLevel, specialization, specialization_ ,company_name  ,precedents];
 
  return {fullName, age, purpose, duration, academicLevel, specialization, specialization_ ,company_name  ,precedents};
  //fullName, age, academicLevel, specialization, precedents
}

function getScore_age(age){
  let score_age = 0;
  if(age <= 10){
    score_age += age_less_than_10_old;
  }else if( age < 18 ){
    score_age += age_between_10_and_18_old;
  }else if( age <= 30 ){
    score_age += age_between_18_and_30_old;
  }else if( age > 30 ){
    score_age += age_more_than_30_old;
  }
  return score_age;
}

function getScore_academicLevel(academicLevel){
  let score_academicLevel = 0;
    if(academicLevel == "Primary_school"){
      score_academicLevel += Primary_school;
    }else if(academicLevel == "middle_school"){
      score_academicLevel += middle_school;
    }else if(academicLevel == "high_school"){
      score_academicLevel += high_school;
    }else if(academicLevel == "university"){
      score_academicLevel += university;
    }

  return score_academicLevel;
}

function getScore_specialization(specialization){
  let score_specialization = 0;
    if(specialization == "programmer"){
      score_specialization += programmer;
    }else if(specialization == "doctor"){
      score_specialization += doctor;
    }else if(specialization == "engineer"){
      score_specialization += engineer;
    }

  return score_specialization;
}

function getScore_precedents(precedents){
  let score_precedents = 0;
    if(precedents == "less_than_one_year"){
      score_precedents += less_than_one_year;
    }else if(precedents == "between_one_and_5_years"){
      score_precedents += between_one_and_5_years;
    }else if(precedents == "more_than_5_years"){
      score_precedents += more_than_5_years;
    }else if(precedents == "never"){
      score_precedents += never;
    }

  return score_precedents;
}

function check_name(name){
  let band_name = [ "Adnen Houidi" , "adnen houidi" , "Adnen" , "adnen" , "Houidi" , "houidi" , "adnen " , "Adnen " , "houidi " , "Houidi " , "adnen houidi " , "Adnen houidi " , "Adnen Houidi " , "Adnen Houidi " , "عدنان هويدي" , "عدنان" , "هويدي" , "عدنان " , "عدنان هويدي " , "AdNeN" , "アドナん" ];
  var is_band = false;
  let band_message = "";
  let nameSpan = `<span class="red-span">${name}</span>`;
  if( band_name.includes(name) ){
    band_message = `sory, mr.${nameSpan}, but we can't accept anyone with that name`;
    is_band = true;
  }else{
    is_band = false;
  }
  return {is_band , band_message , name };
}

function rapport(){
  var data = getAllData();
  var check_name_result = check_name(data.fullName);
  var score_age = getScore_age(data.age);
  var score_academicLevel = getScore_academicLevel(data.academicLevel);
  var score_specialization = getScore_specialization(data.specialization);
  var score_precedents = getScore_precedents(data.precedents);
  user_score = score_age + score_academicLevel + score_specialization + score_precedents;

  
  writeData(score_age , score_academicLevel , score_specialization , user_score , check_name_result);
}

function writeData(score_age , score_academicLevel , score_specialization , user_score , check_name_result){
  // console.log(check_name_result.name);
  var section_1 = document.getElementById("section-1");
  var section_2 = document.getElementById("section-2");
  var showData = document.getElementById("show");
  var span = document.createElement("span");
  section_1.style.display = "flex";
  section_2.style.display = "none";

  if(check_name_result.is_band){
    showData.innerHTML = check_name_result.band_message;
  }else{
    
    var nameSpan = `<span class="grean-span">${check_name_result.name}</span>`;
    var scoreSpan = `<span class="grean-span">${user_score}</span>`;
    if(user_score >= 50 && check_name_result.name != ""){
      showData.innerHTML = `Congradulation mr.${nameSpan} ! Your score is [_${scoreSpan}_] . so, you can travel to our contry `;
    }else if(user_score >= 50 && check_name_result.name == ""){
      nameSpan = `<span class="red-span">${"unknown"}</span>`;
      scoreSpan = `<span class="grean-span">${user_score}</span>`;
      showData.innerHTML = `sorry Mr.${nameSpan} ! Your score is [_${scoreSpan}_] ,so but you have to put you name to let you travel to our country `;
    }else if(user_score <= 50 && check_name_result.name == ""){
      nameSpan = `<span class="red-span">${"unknown"}</span>`;
      scoreSpan = `<span class="red-span">${user_score}</span>`;
      showData.innerHTML = `I'm sorry mr.${nameSpan} ! but, your score is [_${scoreSpan}_] . so you can't travel to our contry `;
    }else if(user_score <= 50 && check_name_result.name != ""){
      nameSpan = `<span class="red-span">${check_name_result.name}</span>`;
      scoreSpan = `<span class="red-span">${user_score}</span>`;
      showData.innerHTML = `I'm sorry mr.${nameSpan} ! but your score is [_${scoreSpan}_] so you can't travel to our contry `;
    }
  }
  
  
}

document.getElementById("btn_showData").addEventListener("click",function(){
  rapport();
  var data = [getAllData().fullName , getAllData().age , getAllData().purpose , getAllData().duration , getAllData().academicLevel , getAllData().specialization , getAllData().specialization_ , getAllData().company_name , getAllData().precedents];
  var data_ = getAllData();
  saveData(data_);
});




//fullName, age, purpose, duration, academicLevel, specialization, specialization_ ,company_name  ,precedents


function ul_control() {
  var ul = document.getElementById("menuList");
  var a = document.getElementsByClassName("a");
  var li = document.getElementsByClassName("li");
  if( ul.style.height != "2.5em" ){
    ul.style.height = "2.5em";
    for(var i = 0 ; i < a.length ; i++){
      a[i].style.opacity = "1";
      li[i].style.borderTop = "0.5px solid #1581DD";
    }
    ul.style.borderTop = "1px solid #1581DD";
  }else{
    ul.style.height = "0em";
    for(var i = 0 ; i < a.length ; i++){
      a[i].style.opacity = "0";
      li[i].style.border = "none";
    }
    ul.style.border = "none";
  }
  console.log("clicked !");
}


//function back_() {
//  var section_1 = document.getElementById("section-1");
//  var section_2 = document.getElementById("section-2");
//    section_1.style.display = "none";
//    section_2.style.display = "flex";
//}



// font-size: 1.5em;
// font-weight: 900;



var back_btn = document.getElementById('back-btn').addEventListener('click',function(){
  var section_1 = document.getElementById("section-1");
  var section_2 = document.getElementById("section-2");
  section_1.style.display = "none";
  section_1.visibility = "hidden";
  section_2.style.display = "flex";
  section_2.visibility = "visible";
});


//function back_back(){
////  var section_1 = document.getElementById("section-1");
//  var section_2 = document.getElementById("section-2");
//  section_1.style.display = "none";
//  section_1.visibility = "hidden";
//  section_2.style.display = "flex";
//  section_2.visibility = "visible";
//}

document.getElementById("purpose").addEventListener("change",function(){
  getAllData();
});
document.getElementById("specialization").addEventListener("change",function(){
  getAllData();
});




function getFormByPurpose(purpose){
  var duration = document.getElementById("duration_c");
  var academic_level = document.getElementById("academic-level_c");
  var specialization = document.getElementById("specialization_c");
  var company_name = document.getElementById("company_name_c");
  var company_name = document.getElementById("company_name_c");
  
  if(purpose == "tourist"){
    
    duration.style.display = "inline";
    academic_level.style.display = "none";
    specialization.style.display = "none";
    company_name.style.display = "inline";
    company_name.style.display = "none";
    
  }else if(purpose == "business_trip"){
    
    duration.style.display = "none";
    academic_level.style.display = "inline";
    specialization.style.display = "inline";
    company_name.style.display = "inline";
    company_name.style.display = "inline";
    
  }else if(purpose == "study_abroad"){
    
    duration.style.display = "none";
    academic_level.style.display = "inline";
    specialization.style.display = "inline";
    company_name.style.display = "none";
    company_name.style.display = "none";
    
  }else if(purpose == "relocation"){
    
    duration.style.display = "none";
    academic_level.style.display = "inline";
    specialization.style.display = "inline";
    company_name.style.display = "none";
    company_name.style.display = "none";
    
  }else{

    duration.style.display = "none";
    academic_level.style.display = "none";
    specialization.style.display = "none";
    company_name.style.display = "none";
    company_name.style.display = "none";
    
  }

 
  
}

async function getFormBySpecialization(purpose , specialization){
  var the_other_specialization_c = document.getElementById("the_other_c");
  if(specialization == "other"  && (purpose == "business_trip" || purpose == "study_abroad" || purpose == "relocation" ) ){
    the_other_specialization_c.style.display = "inline";
      let specialization_ = await get_Change_specialization();
      
      return specialization_;
  }else{
      the_other_specialization_c.style.display = "none";
    return "";
  }
}

function get_Change_specialization(){
  return new Promise ((resolve) => {
    document.getElementById("the_other_specialization").addEventListener("change", function (){
      var specialization = document.getElementById("the_other_specialization").value;
      resolve(specialization);
    });
  });
  
  
}