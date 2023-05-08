const trelloProgress = document.querySelector(".trello__progress");
let personal = document.querySelectorAll(".personal>div"); // массив исполнителей
let trelloTask = document.querySelectorAll(".trello__task");
let personalElement;
const personalAll = document.querySelector(".personal");
const poligons = document.querySelectorAll(".trello__body > div");
const personalBtn = document.querySelector(".personal__btn");
let uploadedImage = "";
const newNamePersonalCreate = document.querySelector("#newNamePersonalCreate");
const personalNewWorker = document.querySelector(".personal__newWorker");
const inputFile = document.querySelector(".input__file");
const personalNewBtn = document.querySelector(".personal__newBtn");
const personalModal = document.querySelector(".personal__modal");
const personalInfo = document.querySelector(".personal__info");
const personalInfoInformationCancelBtn = document.querySelector(
  ".personal__infoInformationCancelBtn"
);
const personalApproveBtn = document.querySelector(".personal__approveBtn");
const personalAdd = document.querySelector(".personal");
const displayImage = document.querySelector("#display_image");
const trelloBtn = document.querySelector(".trello__btn");
const trelloInp = document.querySelector(".trello__inp");
let trelloRemoveTaskBtn = document.querySelectorAll(".trello__removeTaskBtn");
const personsNewData = document.querySelector(".personsNewData ");

// додає іконку та ім'я новому користувачу через дію кліка
let reader;
personalBtn.addEventListener("click", function () {
  reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    document.querySelector(
      "#display_image"
    ).style.backgroundImage = `url(${uploadedImage})`;
  });
  reader.readAsDataURL(inputFile.files[0]);
  newNamePersonalCreate.innerHTML = personalNewWorker.value;
  newNamePersonalCreate.style.color = "black";
});
// відкриває модальне вікно
personalNewBtn.addEventListener("click", function () {
  personalModal.classList.toggle("hide");
  personalNewWorker.value = " ";

  displayImage.style.background = "transparent";
  newNamePersonalCreate.style.color = "transparent";
});
// закриває модальне вікно
personalInfoInformationCancelBtn.addEventListener("click", openCloseModal);
personalModal.addEventListener("click", function (e) {
  personalModal.classList.toggle("hide");
});
document.body.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && !personalModal.classList.contains("hide")) {
    openCloseModal();
  }
});

function openCloseModal(e) {
  personalModal.classList.toggle("hide");
  personalNewWorker.value = " ";
  newPeronName.style.color = "blue";
}

personalApproveBtn.addEventListener("click", openCloseModal);

personalApproveBtn.addEventListener("click", function () {
  let newCloseBtn = document.createElement("div");
  newCloseBtn = displayImage.cloneNode(true);
  newCloseBtn.setAttribute("draggable", "true");
  personalAdd.appendChild(newCloseBtn);
  newCloseBtn.removeAttribute("id");
  newCloseBtn.classList.add("new__ImagesPerson");
  newCloseBtn.classList.add("pesonal__items");
  let newPeronName = document.createElement("div");
  newPeronName = newNamePersonalCreate.cloneNode(true);
  personalAll.lastElementChild.appendChild(newPeronName);
  newPeronName.removeAttribute("id");
  newPeronName.classList.add("personName");
  personal = document.querySelectorAll(".personal>div");
  newPeronName.style.color = "transparent";
});

function openCloseModal(e) {
  personalModal.classList.toggle("hide");
  personalNewWorker.value = " ";
}

personalInfo.addEventListener("click", function (e) {
  personalModal.classList.add(".hide");
  e.stopPropagation();
});

// дозволяє перемістити на це місце
trelloProgress.addEventListener("dragover", function (e) {
  e.preventDefault();
});

// дозволяє перемістити на це місце
personalAll.addEventListener("dragover", function (e) {
  e.preventDefault();
});

addEventListener("mousemove", (event) => {
  personal.forEach(function (el) {
    // вибирає елемент зі списку персоналу
    el.addEventListener("dragstart", function (e) {
      personalElement = e.target;
    });
    //видалення виконавця подвійним натисканням на мишу
    el.addEventListener("click", function (e) {
      personalElement = e.target;
      if (
        personalElement.classList.contains("pesonal__items") ||
        personalElement.classList.contains("personName")
      ) {
        personalElement.remove();
      }
    });
  });
});

personalAll.addEventListener("drop", function (e) {
  // додає персонал назад
  if (personalElement.classList.contains("pesonal__items")) {
    this.appendChild(personalElement);
  } else {
    alert("неможливо перемістити завдання у поле зі співробітниками");
  }
});

poligons.forEach(function (el) {
  el.addEventListener("dragover", allowDrop); // дозволяє перемістити на це місце
  el.addEventListener("drop", function (e) {
    //дроп вибраного елементу
    if (personalElement.classList.contains("trello__task")) {
      this.appendChild(personalElement);
    } else if (
      personalElement.classList.contains("pesonal__items") &&
      (e.target.classList.contains("trello__removeTaskBtn") ||
        e.target.classList.contains("trello__text") ||
        e.target.classList.contains("trello__persons") ||
        e.target.classList.contains("trello__personsExecutor"))
    ) {
      newCheckPerson[0].appendChild(personalElement);
    } else {
      divs = e.target;
      alert("перетягніть будь ласка на завдання");
    }
  });
});

function allowDrop(e) {
  e.preventDefault();
}

let newCheckPerson;
addEventListener("mousemove", (event) => {
  trelloTask = document.querySelectorAll(".trello__task");
  trelloTask.forEach(function (el) {
    // вибирає елемент зі списку персоналу
    el.addEventListener("drop", function () {
      newCheckPerson = el.getElementsByClassName("trello__personsExecutor");
    });
    el.addEventListener("dragstart", function (e) {
      personalElement = e.target;
    });
  });
});

let trelloConstValueInp;
const trelloSprint = document.querySelector(".trello__sprint");

trelloBtn.addEventListener("click", function () {
  if (trelloInp.value && trelloInp.value != " ") {
    const NewTrelloTask = document.createElement("div");
    NewTrelloTask.classList.add("trello__task");
    NewTrelloTask.setAttribute("draggable", "true");
    NewTrelloTask.setAttribute("contenteditable", "true");
    trelloSprint.appendChild(NewTrelloTask);

    const newTrelloTaskHeader = document.createElement("div");
    newTrelloTaskHeader.classList.add("trello__taskHeader");
    NewTrelloTask.appendChild(newTrelloTaskHeader);

    const newDivForTask = document.createElement("div");
    newDivForTask.innerText = trelloInp.value;
    newDivForTask.classList.add("trello__text");
    newTrelloTaskHeader.appendChild(newDivForTask);

    const spanCloseBtnNew = document.createElement("span");
    spanCloseBtnNew.innerText = "X";
    spanCloseBtnNew.setAttribute("contenteditable", "false");
    spanCloseBtnNew.classList.add("trello__removeTaskBtn");
    newTrelloTaskHeader.appendChild(spanCloseBtnNew);

    const divTrelloPersonalNew = document.createElement("div");
    divTrelloPersonalNew.innerText = "Executor";
    divTrelloPersonalNew.setAttribute("contenteditable", "false");
    divTrelloPersonalNew.classList.add("trello__persons");
    NewTrelloTask.appendChild(divTrelloPersonalNew);

    const lastDivNewCreate = document.createElement("div");
    lastDivNewCreate.classList.add("trello__personsExecutor");
    NewTrelloTask.appendChild(lastDivNewCreate);
    trelloRemoveTaskBtn = document.querySelectorAll(".trello__removeTaskBtn");
  } else {
    alert("введите пожалуйста задачу");
  }
});

addEventListener("mousemove", (event) => {
  trelloRemoveTaskBtn.forEach(function (el) {
    el.addEventListener("click", function (e) {
      let RemoveTask;
      RemoveTask = e.target;
      this.parentElement.parentElement.remove();
    });
  });
});
