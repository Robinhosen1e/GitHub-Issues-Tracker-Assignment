
function showSection (id , btn){

    const section = document.querySelectorAll(".section");
    section.forEach(sec =>{
        sec.classList.remove("active")
    })

    document.getElementById(id).classList.add("active")

    document.querySelectorAll(".filter-btn")
      .forEach(b=>b.classList.remove("active-btn"));

       btn.classList.add("active-btn");
}
