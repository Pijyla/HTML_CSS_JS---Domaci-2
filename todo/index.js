var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");

form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
filter.addEventListener("keyup", filterItems);

function addItem(e) {
  e.preventDefault();
  var newItem = document.getElementById("item").value;
  document.getElementById("item").value = "";
  var li = document.createElement("li");

  li.className = "list-group-item";
  li.appendChild(document.createTextNode(newItem));
  var deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  deleteBtn.appendChild(document.createTextNode("X"));
  li.appendChild(deleteBtn);  itemList.appendChild(li);
  localStorage.setItem('listContents', itemList.innerHTML);
  let allItems = Array.from(itemLista.children);
  allItems.map((item) => {
  item.addEventListener("click", (item)=>{selectItem(item);});})
  filteringByParameter(document.getElementById("filter").value)
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
  localStorage.setItem('listContents', itemList.innerHTML);
}

function filterItems(e) {
  var text = e.target.value.toLowerCase();
  filteringByParameter(text);
}

var saved = localStorage.getItem('listContents');
if (saved) {
	itemList.innerHTML = saved;
}

var itemLista = document.getElementById("items");
let allItems = Array.from(itemLista.children);
allItems.map((item) => {
item.addEventListener("click", (item)=>{selectItem(item);});})

function selectItem(itemb){
  let clicked = itemb.target.childNodes;
  let liText= Array.from(clicked);
  liText = liText[0].data;
  liText === "X" ? liText = "":liText;
  document.getElementById("filter").value= liText;
  filteringByParameter(liText);
}

function filteringByParameter(param){
    var items = itemList.getElementsByTagName("li");
    let displayedItems = []
      Array.from(items).forEach(function(item) {
      var itemName = item.firstChild.textContent;
      if (itemName.toLowerCase().indexOf(param.toLowerCase()) != -1) {
        item.style.display = "block";
        displayedItems.push(item)
      } else {
        item.style.display = "none";
      }
    });
    return displayedItems

}
let caller = 0;
let index = 0;
document.addEventListener('keydown', (event) => 
{ var code = event.keyCode;
  let filter = document.getElementById("filter").value
  let displayedItems = filteringByParameter(filter)
  if(displayedItems.length<=1)return
    if (code == 38 || code == 40){
            displayedItems.forEach(item=>item.style.backgroundColor = "white")
      if(code === 40){
        index ++
      }
      else if(code === 38){index --}
      
      if (index === displayedItems.length) {
        index = 0;
      }
      else if (index < 0){index = displayedItems.length-1}
      
      if(caller == 0)index = 0
      displayedItems[index].style.backgroundColor = "gray"
    }
      if(code === 13){
        document.getElementById("filter").value=displayedItems[index].firstChild.textContent
        filteringByParameter(displayedItems[index].firstChild.textContent)
      }
      caller++
})

window.addEventListener('load', () =>{
    filteringByParameter("");
});
