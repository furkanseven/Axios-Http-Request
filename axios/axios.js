const getBtn=document.getElementById('get');
getBtn.addEventListener('click',getData);

const postBtn=document.getElementById('post');
postBtn.addEventListener('click',postData);

const putPatchBtn=document.getElementById('put-patch');
putPatchBtn.addEventListener('click',puthPatchData);
//PATCH ile  ad,email,adres güncelle güncelle dediğimizde veri kaynağı komple DURUYOR ad,email,adres kısmı yeni güncel değeri ile değişyor

//PUT ile ad,email,adres güncelle dediğimizde tüm veri kaynağı GİDİYOR ad,email,adres güncellediğimiz şekilde sadece 3 bölüm kalıyor

const deleteBtn=document.getElementById('delete');
deleteBtn.addEventListener('click',deleteItem);

const ayniAndaIstekeBtn=document.getElementById('ayni-anda-istek');
ayniAndaIstekeBtn.addEventListener('click',ayniAndaIstekData);

const headerBtn=document.getElementById('headers');
headerBtn.addEventListener('click',customHeader);



function getData(){
    axios//Bir nesne yolluyoruz isteğin çeşitleri yer alıyor
        .get('https://jsonplaceholder.typicode.com/users?_limit=3',)//BİR KAYNAKTAN VERİ ÇEKME İÇİN KULLANIYORUZ
        .then(response=>ekranaYazdir(response))//bize bir promise yapısı veriyor, response isimli javascript objesi veriyor
        .catch(hata=>console.log(hata))//hata oluşursa consola yerleştiriyoruz
        .then(()=>console.log("Get isteği tamamlandı"))//catch'ten sonrakı bu yapı her zaman çalışır
}

function postData(){
    //************************POST EKLEME
    // axios.post('https://jsonplaceholder.typicode.com/posts',
    // {
    //     title:'YENİ BAŞLIK',
    //     body:'Body Bölümü',
    //     userId:11
    // }).then(response=>ekranaYazdir(response))
    // .catch(hata=>hata)

    //******************USER EKLEME
    axios.post('https://jsonplaceholder.typicode.com/users', //YENİ BİR VERİ EKLEMEK İÇİN KULLANIYORUZ
    {
        name:'Furkan Seven',
        username:'f.sevenn',
        email:'f.sevenn@gmail.com'
    }).then(response=>ekranaYazdir(response))
    .catch(hata=>hata)
}

function puthPatchData(){

    //**********************PUT İLE GÜNCELLEME
    // axios.put('https://jsonplaceholder.typicode.com/users/1',//ID 1 olan kullanıcıyı güncelle
    // {
    //     name:'Ali veli',
    //     username:'49-50',
    //     email:'av@gmail.com',
    //     city:'İzmit'
    // }).then(response=>ekranaYazdir(response))
    // .catch(hata=>hata)

    //PATCH İLE GÜNCELLEME
    axios.patch('https://jsonplaceholder.typicode.com/users/1',//ID 1 olan kullanıcıyı güncelle
    {
        name:'Ali veli',
        username:'49-50',
        email:'av@gmail.com',
        city:'İzmit'
    }).then(response=>ekranaYazdir(response))
    .catch(hata=>hata)
}

function deleteItem(){
    axios.delete('https://jsonplaceholder.typicode.com/posts/1',)//ID 1 olan Post'u siler
    .then(response=>ekranaYazdir(response))
    .catch(hata=>hata)
    .then(()=>console.log("Delete işlemi bitti"))
}

function ayniAndaIstekData(){
    axios.all(
        [
            axios.get('https://jsonplaceholder.typicode.com/users?_limit=2'),
            axios.get('https://jsonplaceholder.typicode.com/posts'),
        ]
    ).then(axios.spread((kullanicilar,postlar)=>{
        console.log(kullanicilar.data);
        console.log(postlar.data);
        ekranaYazdir(kullanicilar);
    }))
}

//isteklerimize header alanı ekleriz
//bu header alanına bakarak yetkili olup olmdığına bakarız
function customHeader(){

    const config={
        headers:{   
            'Content-Type': 'application/json', //Json olarak veri istediğimizi söyledik
             Authorization:'sizinTokenDegeriniz'   //Post isteğinde bulunduğumuzda bu servera gider bakar yetki var ise 
        }                                           //post işlemi yapabilir der.
    }
    axios.post('https://jsonplaceholder.typicode.com/users', //YENİ BİR VERİ EKLEMEK İÇİN KULLANIYORUZ
    {
        name:'Furkan Seven',
        username:'f.sevenn',
        email:'f.sevenn@gmail.com'
    },config).then(response=>ekranaYazdir(response))
    .catch(hata=>hata)
}




//////interceptors******************ARAYA GİRER,
//BİZ BİR REQUEST YAPTIĞIMIZDA,GET İSTEĞİ YAPTIĞIMIZDA ARAYA GİRER CONFİGDE İLK ÖNCE BU URL'E GİTMEYE ÇALIŞIR,DAHA SONRA GET İSTEĞİNİ YAPAR
// axios.interceptors.request.use(config=>{

//     config.url="adasdasdasd";
//     return config;
// })








console.log('**');
//JSON stringfy ile onjemizi JSON formatına çevirdik.
//null diyerek replacaer kullanmıyacaımızı söyledik
//4 d,yerek satır başlarındaki boşluğu söyledik
//pre etiketi boşluk, alt satıra geçilme vs düzenli hale geldi
//Json lace holder ->json server kullanıyor github document'de _limit ile verilerin filtrelenebileceği açıklanmış getData fonk kullanabilirz
function ekranaYazdir(response){
    document.querySelector('.sonuc').innerHTML=`<div class="sonuc">
    <div class="notification-info">
        ${response.status}
    </div>
</div>

<div class="message">
    <h3 class="messaga-title">Header</h3>
    <div class="message-content">
    <pre>${JSON.stringify(response.headers,null,4)}</pre>
    </div>
</div>
<div class="message">
    <h3 class="messaga-title">Data</h3>
    <div class="message-content">
    <pre>${JSON.stringify(response.data,null,4)}</pre>
    </div>
</div>
<div class="message">
    <h3 class="messaga-title">Config</h3>
    <div class="message-content">
    <pre>${JSON.stringify(response.config,null,4)}</pre>
    </div>
</div>`;
}