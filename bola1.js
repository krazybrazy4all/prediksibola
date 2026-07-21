// ======================================
// HUJAN PREDICTION
// CONNECT GOOGLE APPS SCRIPT API
// ======================================


// MASUKKAN URL APPS SCRIPT ANDA DISINI

const API_URL =
"https://script.google.com/macros/s/AKfycbzBAsiVK-XbLl72R9HDu6W-XRaewo6D6yMh5Sdg9AP_EbvTttTere-mBtoPSIonOlk-/exec";



let matches = [];




// ======================================
// AMBIL DATA API
// ======================================

async function loadPrediction(){


try{


const response =
await fetch(API_URL);



const data =
await response.json();



matches = data;



generateLeagueFilter();



displayMatches(matches);



}

catch(error){


console.error(error);



document
.getElementById("matchContainer")
.innerHTML = `

<div class="loading">

❌ Gagal mengambil data

</div>

`;


}



}






// ======================================
// TAMPILKAN MATCH
// ======================================

function displayMatches(data){


const container =
document.getElementById(
"matchContainer"
);



container.innerHTML="";



if(data.length===0){


container.innerHTML=`

<div class="loading">

Tidak ada pertandingan

</div>

`;

return;

}





data.forEach(match=>{



let rating =
parseInt(
match.rating
.replace("%","")
);





container.innerHTML += `


<div class="match-card">


<div class="league">

🏆 ${match.liga}

</div>



<div class="team-box">


<div class="team">

${match.home}

</div>


<div class="vs">

⚽ VS

</div>


<div class="team">

${match.away}

</div>



<div class="score">

${match.prediksi}

</div>



</div>




<div class="rating">


<p>

Confidence

<b>
${match.rating}
</b>

</p>



<div class="rating-bar">


<div 
class="rating-fill"
style="width:${rating}%">

</div>


</div>


</div>



</div>


`;



});


}






// ======================================
// FILTER LIGA
// ======================================


function generateLeagueFilter(){


const select =
document.getElementById(
"leagueFilter"
);



select.innerHTML =
`
<option value="all">
Semua Liga
</option>
`;




let leagues = [

...new Set(

matches.map(
item=>item.liga
)

)

];



leagues.forEach(liga=>{


select.innerHTML +=`

<option value="${liga}">

${liga}

</option>

`;



});



}







// ======================================
// SEARCH + FILTER
// ======================================


function filterData(){


let keyword =
document
.getElementById("search")
.value
.toLowerCase();



let liga =
document
.getElementById("leagueFilter")
.value;





let result =
matches.filter(item=>{


let text =

(
item.home+
item.away+
item.liga
)

.toLowerCase();



return (

text.includes(keyword)

&&

(
liga==="all"
||
item.liga===liga
)

);



});



displayMatches(result);


}






document
.getElementById("search")
.addEventListener(
"input",
filterData
);



document
.getElementById("leagueFilter")
.addEventListener(
"change",
filterData
);







// ======================================
// AUTO REFRESH
// ======================================


setInterval(()=>{


loadPrediction();


},300000);





// START

loadPrediction();