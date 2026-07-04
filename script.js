let patients=JSON.parse(localStorage.getItem("patients"))||[];
let doctors=JSON.parse(localStorage.getItem("doctors"))||[];
let appointments=JSON.parse(localStorage.getItem("appointments"))||[];
let editPatientId=null;
let editDoctorId=null;

displayPatients();
displayDoctors();
displayAppointments();
updateDashboard();

function savePatients(){
localStorage.setItem("patients",JSON.stringify(patients));
}

function saveDoctors(){
localStorage.setItem("doctors",JSON.stringify(doctors));
}

function saveAppointments(){
localStorage.setItem("appointments",JSON.stringify(appointments));
}

function clearPatientForm(){

document.getElementById("name").value="";
document.getElementById("age").value="";
document.getElementById("disease").value="";
document.getElementById("gender").selectedIndex=0;
document.getElementById("status").selectedIndex=0;
document.getElementById("date").value="";
editPatientId=null;

}

function addPatient(){

let name=document.getElementById("name").value.trim();
let age=document.getElementById("age").value.trim();
let disease=document.getElementById("disease").value.trim();
let gender=document.getElementById("gender").value;
let status=document.getElementById("status").value;
let date=document.getElementById("date").value;

if(name==""||age==""||disease==""||date==""){
alert("Please fill all fields");
return;
}

if(editPatientId==null){

patients.push({

id:Date.now(),

name,

age,

gender,

disease,

status,

date

});

}else{

patients=patients.map(patient=>{

if(patient.id==editPatientId){

return{

id:editPatientId,

name,

age,

gender,

disease,

status,

date

};

}

return patient;

});

}

savePatients();

displayPatients();

clearPatientForm();

}

function displayPatients(){

let table=document.getElementById("patientTable");

table.innerHTML="";

patients.forEach(patient=>{

let badge="";

if(patient.status=="Admitted"){

badge="<span class='badge admitted'>Admitted</span>";

}else if(patient.status=="Discharged"){

badge="<span class='badge discharged'>Discharged</span>";

}else{

badge="<span class='badge observation'>Under Observation</span>";

}

table.innerHTML+=`

<tr>

<td>${patient.name}</td>

<td>${patient.age}</td>

<td>${patient.gender}</td>

<td>${patient.disease}</td>

<td>${badge}</td>

<td>${patient.date}</td>

<td>

<button class="edit-btn" onclick="editPatient(${patient.id})">

Edit

</button>

<button class="delete-btn" onclick="deletePatient(${patient.id})">

Delete

</button>

</td>

</tr>

`;

});

updateDashboard();

}

function editPatient(id){

let patient=patients.find(patient=>patient.id==id);

document.getElementById("name").value=patient.name;
document.getElementById("age").value=patient.age;
document.getElementById("disease").value=patient.disease;
document.getElementById("gender").value=patient.gender;
document.getElementById("status").value=patient.status;
document.getElementById("date").value=patient.date;

editPatientId=id;

}

function deletePatient(id){

if(confirm("Delete Patient?")){

patients=patients.filter(patient=>patient.id!=id);

savePatients();

displayPatients();

}

}

function searchPatient(){

let value=document.getElementById("search").value.toLowerCase();

let rows=document.querySelectorAll("#patientTable tr");

rows.forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)?"":"none";

});

}

function addDoctor(){

let doctor=document.getElementById("doctorName").value.trim();
let specialization=document.getElementById("specialization").value.trim();

if(doctor==""||specialization==""){
alert("Please fill all fields");
return;
}

if(editDoctorId==null){

doctors.push({

id:Date.now(),

doctor,

specialization

});

}else{

doctors=doctors.map(doc=>{

if(doc.id==editDoctorId){

return{

id:editDoctorId,

doctor,

specialization

};

}

return doc;

});

}

saveDoctors();

displayDoctors();

document.getElementById("doctorName").value="";
document.getElementById("specialization").value="";
editDoctorId=null;

}

function displayDoctors(){

let table=document.getElementById("doctorTable");

let select=document.getElementById("doctorAppointment");

table.innerHTML="";

select.innerHTML="<option value=''>Select Doctor</option>";

doctors.forEach(doc=>{

table.innerHTML+=`

<tr>

<td>${doc.doctor}</td>

<td>${doc.specialization}</td>

<td>

<button class="edit-btn"

onclick="editDoctor(${doc.id})">

Edit

</button>

<button class="delete-btn"

onclick="deleteDoctor(${doc.id})">

Delete

</button>

</td>

</tr>

`;

select.innerHTML+=`

<option value="${doc.doctor}">

${doc.doctor} (${doc.specialization})

</option>

`;

});

updateDashboard();

}

function editDoctor(id){

let doctor=doctors.find(doc=>doc.id==id);

document.getElementById("doctorName").value=doctor.doctor;
document.getElementById("specialization").value=doctor.specialization;

editDoctorId=id;

}

function deleteDoctor(id){

if(confirm("Delete Doctor?")){

doctors=doctors.filter(doc=>doc.id!=id);

saveDoctors();

displayDoctors();

}

}
function addAppointment(){

let patient=document.getElementById("patientAppointment").value.trim();

let doctor=document.getElementById("doctorAppointment").value;

let date=document.getElementById("appointmentDate").value;

let time=document.getElementById("appointmentTime").value;

if(patient==""||doctor==""||date==""||time==""){

alert("Please fill all fields");

return;

}

appointments.push({

id:Date.now(),

patient,

doctor,

date,

time

});

saveAppointments();

displayAppointments();

document.getElementById("patientAppointment").value="";

document.getElementById("doctorAppointment").value="";

document.getElementById("appointmentDate").value="";

document.getElementById("appointmentTime").value="";

}

function displayAppointments(){

let table=document.getElementById("appointmentTable");

table.innerHTML="";

appointments.forEach(app=>{

table.innerHTML+=`

<tr>

<td>${app.patient}</td>

<td>${app.doctor}</td>

<td>${app.date}</td>

<td>${app.time}</td>

<td>

<button class="delete-btn"

onclick="deleteAppointment(${app.id})">

Delete

</button>

</td>

</tr>

`;

});

updateDashboard();

}

function deleteAppointment(id){

if(confirm("Delete Appointment?")){

appointments=appointments.filter(app=>app.id!=id);

saveAppointments();

displayAppointments();

}

}

function calculateBill(){

let consultation=Number(document.getElementById("consultationFee").value)||0;

let room=Number(document.getElementById("roomCharge").value)||0;

let medicine=Number(document.getElementById("medicineCharge").value)||0;

let other=Number(document.getElementById("otherCharge").value)||0;

let total=consultation+room+medicine+other;

document.getElementById("totalBill").innerHTML="₹"+total.toLocaleString("en-IN");

}

function updateDashboard(){

document.getElementById("count").innerHTML=patients.length;

document.getElementById("doctorCount").innerHTML=doctors.length;

document.getElementById("appointmentCount").innerHTML=appointments.length;

document.getElementById("beds").innerHTML=120-patients.length;

document.getElementById("occupancy").innerHTML=Math.round((patients.length/120)*100)+"%";

}

const patientCanvas=document.getElementById("patientChart");

if(patientCanvas){

new Chart(patientCanvas,{

type:"doughnut",

data:{

labels:[

"Admitted",

"Discharged",

"Observation"

],

datasets:[{

data:[

patients.filter(p=>p.status=="Admitted").length,

patients.filter(p=>p.status=="Discharged").length,

patients.filter(p=>p.status=="Under Observation").length

],

backgroundColor:[

"#16a34a",

"#ef4444",

"#f59e0b"

],

borderWidth:0

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:"bottom"

}

}

}

});

}

const admissionCanvas=document.getElementById("admissionChart");

if(admissionCanvas){

new Chart(admissionCanvas,{

type:"bar",

data:{

labels:[

"Jan",

"Feb",

"Mar",

"Apr",

"May",

"Jun",

"Jul"

],

datasets:[{

label:"Admissions",

data:[

10,

14,

20,

16,

25,

30,

patients.length

],

backgroundColor:"#2563eb",

borderRadius:8

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

},

scales:{

y:{

beginAtZero:true

}

}

}

});

}
function showToast(message,color){

let toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

toast.style.background=color;

document.body.appendChild(toast);

setTimeout(()=>{

toast.style.opacity="0";

toast.style.transform="translateX(100px)";

setTimeout(()=>{

toast.remove();

},500);

},2500);

}

function exportPatients(){

let csv="Name,Age,Gender,Disease,Status,Date\n";

patients.forEach(patient=>{

csv+=`${patient.name},${patient.age},${patient.gender},${patient.disease},${patient.status},${patient.date}\n`;

});

let blob=new Blob([csv],{

type:"text/csv"

});

let link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="Patients.csv";

link.click();

}

function printBill(){

window.print();

}

window.onload=function(){

displayPatients();

displayDoctors();

displayAppointments();

updateDashboard();

showToast("Welcome to CarePlus Hospital","#2563eb");

}

document.addEventListener("click",function(e){

if(e.target.tagName=="BUTTON"){

e.target.style.transform="scale(.96)";

setTimeout(()=>{

e.target.style.transform="scale(1)";

},150);

}

});

setInterval(()=>{

let beds=document.getElementById("beds");

if(beds){

beds.innerHTML=120-patients.length;

}

},1000);

function refreshCharts(){

if(window.patientChart){

window.patientChart.destroy();

}

if(window.admissionChart){

window.admissionChart.destroy();

}

let patientCanvas=document.getElementById("patientChart");

if(patientCanvas){

window.patientChart=new Chart(patientCanvas,{

type:"doughnut",

data:{

labels:["Admitted","Discharged","Observation"],

datasets:[{

data:[

patients.filter(p=>p.status=="Admitted").length,

patients.filter(p=>p.status=="Discharged").length,

patients.filter(p=>p.status=="Under Observation").length

],

backgroundColor:[

"#16a34a",

"#ef4444",

"#f59e0b"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

position:"bottom"

}

}

}

});

}

let admissionCanvas=document.getElementById("admissionChart");

if(admissionCanvas){

window.admissionChart=new Chart(admissionCanvas,{

type:"bar",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun","Jul"],

datasets:[{

data:[12,18,20,25,30,34,patients.length],

backgroundColor:"#2563eb",

borderRadius:8

}]

},

options:{

plugins:{

legend:{

display:false

}

},

responsive:true

}

});

}

}

refreshCharts();

setInterval(refreshCharts,5000);
