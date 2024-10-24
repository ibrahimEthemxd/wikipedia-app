const URL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=25&format=json&origin=*&srsearch="

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

// form gönderildiğinde çalışacak olay
formDOM.addEventListener("submit", event => {
    // formun varsayılan davranışını engeller (sayfanın yeniden yüklenmesini engeller...)
    event.preventDefault();

    const value = inputDOM.value;
    if (!value) {
        resultsDOM.innerHTML = `<div class="error">Aramak istediğiniz şeyi yazın..</div>`;
        return;
    }
    // değer varsa, wikipedia apisine sorgu yap
    fetchPages(value);
});

const fetchPages = async (searchValue) => {

    try {
        const response = await fetch(`${URL}${searchValue}`);
        const data = await response.json();
        const result = data.query.search; // sonuçları al

        if (result.length < 1) {
            // eğer sonuç yoksa mesaj göster
            resultsDOM.innerHTML = `<div class="error">Lütfen geçerli bir değer girin..</div>`;
            return;
        }
        renderREsults(result);
    }
    catch (error) {
        // hata durumunda mesajı göster
        resultsDOM.innerHTML = `<div>There is a problem</div>`
    }
}

// wikipedia sonuçlarını html olarak oluşturacak fonk.
const renderREsults = (list) => {
    const cardList = list.map((item) => {
        const { title, snippet, pageid } = item;
        return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
        <h4>${title}</h4>
        <p>${snippet}</p>
        </a>`
    }).join("");
    resultsDOM.innerHTML = `<div class="articles">${cardList}</div>`
}