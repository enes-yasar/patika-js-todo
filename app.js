let ulDOM = document.querySelector("#list"); // ul'yi seçtik
let inputDOM = document.querySelector("#task"); // input'u seçtik
let addBtnDOM = document.querySelector("#liveToastBtn");
let toastMessageSuccessDOM = document.querySelector(".success"); // listeye eklendi toast mesaj göstereceğiz
let toastMessageErrorDOM = document.querySelector(".error");

ulDOM.addEventListener("click", yapildi);
addBtnDOM.addEventListener("click", newElement);

// Listeye yeni eleman ekleme işlemi
function newElement() {
    if (inputDOM.value.trim() !== "") {
        let liDOM = document.createElement("li");
        liDOM.classList.add("list-group-item", "items");
        liDOM.textContent = inputDOM.value;

        addCloseButton(liDOM);  // X ikonunu ekle
        ulDOM.appendChild(liDOM);
        saveToLocalStorage();
        $(toastMessageSuccessDOM).toast('show');
        inputDOM.value = ""; // Giriş alanını temizle
    } else {
        // Hata mesajını göster
        $(toastMessageErrorDOM).toast('show');
    }
}

// Veriyi localStorage'a kaydetme işlemi
function saveToLocalStorage() {
    const listItems = ulDOM.querySelectorAll("li");
    let items = [];
    for (let li of listItems) {
        const item = {
            name: li.textContent,
            completed: li.classList.contains("checked") // 'checked' sınıfını kontrol et
        };
        items.push(item);
    }
    localStorage.setItem("items", JSON.stringify(items));
}

// localStorage'dan veri alma ve listeyi oluşturma işlemi
function loadFromLocalStorage() {
    // Listeyi temizle
    ulDOM.innerHTML = "";
    
    const itemsJSON = localStorage.getItem("items");
    if (itemsJSON) {
        const items = JSON.parse(itemsJSON);
        for (const item of items) {
            let liDOM = document.createElement("li");
            liDOM.classList.add("list-group-item", "items");
            liDOM.textContent = item.name;
            if (item.completed) {
                liDOM.classList.add("checked");
            }
            addCloseButton(liDOM);
            ulDOM.appendChild(liDOM);
        }
    }
}

// Liste öğesine tıklanıldığında 'checked' sınıfını ekleme
function yapildi(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveToLocalStorage(); // Değişiklikleri kaydet
    }
}

// Liste öğesine X ikonunu ekleme işlemi
function addCloseButton(liDOM) {
    let closeButton = document.createElement("i");
    closeButton.classList.add("bi", "bi-x", "close");
    closeButton.addEventListener("click", function() {
        liDOM.remove();
        saveToLocalStorage(); // Listeyi güncelle
    });
    liDOM.appendChild(closeButton);
}

// Sayfa yüklendiğinde işlemleri yap
document.addEventListener("DOMContentLoaded", function() {
    loadFromLocalStorage(); // Listeyi yükle
});
