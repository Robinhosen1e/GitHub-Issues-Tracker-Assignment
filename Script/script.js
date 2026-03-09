let allData = []

const  allContainer = document.getElementById("all-container");
const openContainer = document.getElementById("open-container");
const closeContainer = document.getElementById("close-container");

const manageSpinner = (status) => {
  if(status == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("main-container").classList.add("hidden");
  }else{
    document.getElementById("main-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}

function showSection (id , btn){
  manageSpinner(true)

    const section = document.querySelectorAll(".section");
    section.forEach(sec =>{
        sec.classList.remove("active")
    })

    document.getElementById(id).classList.add("active")

    document.querySelectorAll(".filter-btn")
      .forEach(b=>b.classList.remove("active-btn"));

       btn.classList.add("active-btn");

           manageSpinner(false)

}




const issuesData = async () =>{
  manageSpinner(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => {
           allData = json.data

            allShow(allData);
            openShow(allData);
            closeShow(allData);

            
            manageSpinner(false)
        });

            

}

function createCard(card) {
    
    
        const c = document.createElement("div");

        let borderColor = card.status === "open" ? "#00A96E" : "#A855F7";
        let priorityColor = card.priority === "high" ? "bg-red-100 text-red-500" :
                            card.priority === "medium" ? "bg-yellow-100 text-yellow-600" :
                            "bg-gray-200 text-gray-500";

        c.innerHTML = `
        <div class="border-t-4 rounded-lg" style="border-top-color:${borderColor}">
            <div class="p-6 border-2 rounded-lg border-gray-50 shadow-md h-96">
                <div class="flex justify-between items-center mb-6">
                    <img class="w-7 h-7" src="./assets/${card.status === "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="">
                    <h3 class="font-medium px-5 py-[-10px] rounded-3xl ${priorityColor}">${card.priority.toUpperCase()}</h3>
                </div>
                <h1 class="font-semibold text-xl text-gray-800 mb-2">${card.title}</h1>
                <p class="text-gray-500 mb-4">${card.description}</p>
                <div class="flex space-x-4 mb-7">
                    <button class="flex bg-red-100 items-center py-1 px-3 rounded-3xl space-x-1">
                        <img class="w-4 h-4" src="./assets/BugDroid.png" alt="">
                        <span class="text-red-500 font-medium">BUG</span>
                    </button>
                    <button class="flex bg-yellow-100 items-center py-1 px-3 rounded-3xl space-x-1">
                        <img class="w-5 h-5" src="./assets/Lifebuoy.png" alt="">
                        <span class="text-yellow-700 font-medium">HELP WANTED</span>
                    </button>
                </div>
                <div class="text-gray-500 text-sm space-y-1">
                    <p>#1 by ${card.author}</p>
                    <p>${new Date(card.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
        `; 
        c.onclick = function(){
         openModal(card)
        };
        
        return c ;

        
    
}

function allShow (cards){

    manageSpinner(true)


  const openData = cards;

  openData.forEach(card=>{

    const cardElement = createCard(card)

   allContainer.append(cardElement)

  })

    manageSpinner(false)

}
function openShow(cards) {

    manageSpinner(true)

  const openData = cards.filter(c => c.status === "open");

  openData.forEach(card => {
    const cardElement = createCard(card);
    openContainer.append(cardElement);
  });
    manageSpinner(false)

}


function closeShow (cards){
    manageSpinner(true)
    
    
  const openData = cards.filter(c => c.status === "closed");

  openData.forEach(card=>{

    const cardElement = createCard(card)

   closeContainer.append(cardElement)

  })

    manageSpinner(false)
    
}

function openModal(card){
    manageSpinner(true)


const detailContainer = document.getElementById("detail-container");

let priorityColor = card.priority === "high" ? "bg-red-100 text-red-500" :
                            card.priority === "medium" ? "bg-yellow-100 text-yellow-600" :
                            "bg-gray-200 text-gray-500";


detailContainer.innerHTML = `

               <h2 class="text-2xl font-bold text-gray-800 mb-3">
                   ${card.title}
               </h2>

                <div class="flex items-center gap-3 text-sm mb-4">

                      <span class="bg-green-500 text-white px-3 py-1 rounded-full">
                      ${card.status}
                      </span>

                      <span class="text-gray-500"> •
                      Opened by ${card.author}
                      </span>

                      <span class="text-gray-400"> •
                      ${new Date(card.createdAt).toLocaleDateString()}
                      </span>

                </div>


                <div class="flex space-x-4 mb-7">
                    <button class="flex bg-red-100 items-center py-1 px-3 rounded-3xl space-x-1">
                        <img class="w-4 h-4" src="./assets/BugDroid.png" alt="">
                        <span class="text-red-500 font-medium">BUG</span>
                    </button>
                    <button class="flex bg-yellow-100 items-center py-1 px-3 rounded-3xl space-x-1">
                        <img class="w-5 h-5" src="./assets/Lifebuoy.png" alt="">
                        <span class="text-yellow-700 font-medium">HELP WANTED</span>
                    </button>
                </div>


                <p class="text-gray-600 mb-6">

                    ${card.description}
                </p>


               <div class="bg-gray-100 p-5 rounded-xl flex justify-between">

               <div>
                     <p class="text-gray-500 text-sm">Assignee:</p>
                     <p class="font-semibold">${card.author}</p>
               </div>

               <div>
                     <p class="text-gray-500 text-sm mb-2">Priority:</p>
                     <span class="${priorityColor} px-3 py-1 rounded-full text-sm">
                     ${card.priority.toUpperCase()}
                     </span>
               </div>

               </div>

`;

document.getElementById("word_modal").showModal();

    manageSpinner(false)


}

issuesData();

document.getElementById("btn-search").addEventListener('click', () => {

    manageSpinner(true);
    const search = document.getElementById("input-search");
    const searchValue = search.value.trim().toLowerCase();

    const filtered = allData.filter(issue =>
        issue.title.toLowerCase().includes(searchValue) ||
        issue.description.toLowerCase().includes(searchValue)
    );

    allContainer.innerHTML = "";

    filtered.forEach(card => allContainer.append(createCard(card)));
    
    manageSpinner(false)
});