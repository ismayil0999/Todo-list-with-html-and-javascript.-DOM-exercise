
let input=document.getElementById("input");
let output=document.getElementById("output");
let btn=document.getElementById("add-btn");
let modal=document.getElementById("modal-container");
let searchInput=document.getElementById("search-input");
//Todo əlavə edilməsi üçün funksiya

function openTodoInput(){
modal.style.display="flex";
input.focus()
}
function addTodo(){
    let todo = input.value;
    //Yeni li elementi yaradır
    let li = document.createElement("li");
    li.innerHTML = `
    <input value="${todo}" readonly="readonly"></input>
    <i class="fa-solid fa-pen" onClick="editTodo(this)"></i>
    <i  class="fa-solid fa-trash" onClick="deleteTodo(this)"></i>
    `;

    if (todo !== "") {
        let firstTodo = output.firstChild;
       
        if (firstTodo) {
            //Əgər output elementi içərisində əvvəlcədən əlavə edilmiş todo varsa yeni todo digərlərinin əvvəlinə əlavə edilir
            output.insertBefore(li, firstTodo);
            //Localstorage outputun deyeri yazilir
            localStorage.setItem("data",output.innerHTML)
        } else {
            output.appendChild(li);
        }

        //Todo əlavə edildikdən sonra input dəyəri sıfırlanması üçün
        input.value = "";
        modal.style.display="none"
    }
}

//Todo axtarış funksiyası
function searchTodo(){
    let lists=output.querySelectorAll("li");
    for(let i=0;i<lists.length;i++){
        let inputs=lists[i].querySelector("input")
        if(inputs.value.includes(searchInput.value)){
           lists[i].style.display="flex"
        }else{
            lists[i].style.display="none"
        }
    }
}
function editTodo(element){
      // Klik olunan edit ikonunun ana elementi içərisindən  span içindəki input elementini seçir
    let todo = element.parentElement.querySelector("input");
    let oldValue = todo.value; //Inputun ilk deyerini saxlayır
    todo.removeAttribute("readonly", "readonly"); // Readonly atributunu silir və input redaktə edilə bilir
    todo.selectionStart = todo.value.length; //İnput carret-i input dəyərinin sonuna qoymaq üçün
    todo.focus(); // İnputa fokuslanır

    todo.addEventListener("blur",function(){
      if(todo.value===""){
        //Əgər inputa dəyər girilmədən blur olarsa inputun dəyərinə avtomatik köhnə dəyəri yazılır
        todo.value=oldValue;
        todo.setAttribute("readonly", "readonly");
      }else{
        todo.setAttribute("readonly", "readonly");
      }
    })
}


//Todo silinməsi üçün funksiya
function deleteTodo(e){
    let output=document.getElementById("output")
    output.removeChild(e.parentElement)

    //Todo silindikde Localstoragede data deyeri yenilenir
    localStorage.setItem("data",output.innerHTML)
}

//X ikonu klik olanda modalın bağlanması üçün
function closeModal(){
    modal.style.display="none";
    input.value=""
}


window.addEventListener("load",function(){
    //Brauzer refresh olduqda  todo-larin lokaldan getirilmesi ucun
    let data=localStorage.getItem("data");
output.innerHTML=data;
let lists=output.querySelectorAll("li");
})

/*LI elementlərinin sıralana bilməsi üçün funksiya SORTABLE kitabxanasi vasitəsi ilə. Kitabxana CDN link ilə HTML faylına qoşulub
let sortableArea=document.getElementById("output")
new Sortable(sortableArea,{
    animation:350
})*/