
let input=document.getElementById("input");
let output=document.getElementById("output");
let btn=document.getElementById("add-btn");
let info=document.getElementById("todos-info");
let modal=document.getElementById("modal-container");
let searchInput=document.getElementById("search-input");
//Todo əlavə edilməsi üçün funksiya

function openTodoInput(){
modal.style.display="flex"
}
function addTodo(){
    let todo = input.value;
    //Yeni li elementi yaradır
    let li = document.createElement("li");
    li.innerHTML = `<span class="todo-content-box">
    <i class="fa-solid fa-sort"></i>
    <input value="${todo}" readonly="readonly"></input>
    </span>
    <span> 
    <i class="fa-solid fa-pen" onClick="editTodo(this)"></i>
    <i  class="fa-solid fa-trash" onClick="deleteTodo(this)"></i>
    </span>`;

    if (todo !== "") {
        let firstTodo = output.firstChild;
        //Todo-ların sayını almaq üçün.Dokument içərisində nə qədər li elementi varsa hamısını seçirik və bununla todo-ların sayını hesablayırıq
        let list=document.querySelectorAll("li")
       
        if (firstTodo) {
            //Əgər output elementi içərisində əvvəlcədən əlavə edilmiş todo varsa yeni todo digərlərinin əvvəlinə əlavə edilir
            output.insertBefore(li, firstTodo);
            //Localstorage outputun deyeri yazilir
            localStorage.setItem("data",output.innerHTML)
        } else {
            output.appendChild(li);
        }

          //Todo-larin sayını ekrana yazdırır
          info.querySelector("p").innerHTML=+1 //Əgər ekranda 5 li elementi varsa 0 indeksi nəzərə aldığı üçün ekrana 4 todo sayı yazılacaq. Bunun üçün  lists.length+1  yazaraq bunu həll edirik
          
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
    let todo = element.parentElement.parentElement.querySelector("span input");
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
    let list=document.querySelectorAll("li")
    let output=document.getElementById("output")
    output.removeChild(e.parentElement.parentElement)
    info.querySelector("p").innerHTML=list.length-1;

    //Todo silindikde Localstoragede data deyeri yenilenir
    localStorage.setItem("data",output.innerHTML)
}

//X ikonu klik olanda modalın bağlanması üçün
function closeModal(){
    modal.style.display="none"
}


window.addEventListener("load",function(){
    //Brauzer refresh olduqda  todo-larin lokaldan getirilmesi ucun
    let data=localStorage.getItem("data");
output.innerHTML=data;
let lists=output.querySelectorAll("li");
info.querySelector("p").innerHTML=lists.length
})

/*LI elementlərinin sıralana bilməsi üçün funksiya SORTABLE kitabxanasi vasitəsi ilə. Kitabxana CDN link ilə HTML faylına qoşulub
let sortableArea=document.getElementById("output")
new Sortable(sortableArea,{
    animation:350
})*/