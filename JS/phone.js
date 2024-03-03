
const LoadPhone = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  const phone = data.data;
  // console.log(phone);
  displayPhone(phone)
}

const displayPhone = phone => {

  const phoneContainer = document.getElementById('phone-container')
  //clear phone Continer before printiong another brands phone
  phoneContainer.textContent = ``

  // display show all button if there are more than 20 phones

  const showALl = document.getElementById('showAll-container');
  if (phone.length > 20) {
    showALl.classList.remove('hidden')
  }

  else {
    showALl.classList.add('hidden');
  }

  // display only 1st 20 phone
  phone = phone.slice(0, 20)
  // console.log(phone);
  phone.forEach(element => {
    console.log(element)
    // step 1:creat a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-auto bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure><img src="${element.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${element.slug}')/*;my_modal_5.showModal()*/" class="btn btn-primary">Show Details</button>
          </div>
        </div>
      </div>
        `
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleLoadingSpiner(false)

}

// LoadPhone();

function handleSearch() {
  toggleLoadingSpiner(true)
  const searchField = document.getElementById('searchField');
  const searchText = searchField.value;
  LoadPhone(searchText)
  // console.log(searchText)
}

// loading page
const toggleLoadingSpiner = (isLoading) => {
  const loadingSpiner = document.getElementById('loading-spiner')
  if (isLoading) {
    loadingSpiner.classList.remove('hidden')
  }
  else {
    loadingSpiner.classList.add('hidden')
  }
}
// handle show details
const handleShowDetails = async (id) => {
  // console.log(id)
  // load single phone information
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone=data.data;
  // console.log(phone)
  showModal(phone)

}

// show modal
const showModal = (phone) => {
  console.log(phone)
  // const showPhoneName=document.getElementById('show-phone-name');
  // showPhoneName.innerHTML=phone.name;
  const showDetailContainer=document.getElementById('showDetailContainer');
  showDetailContainer.innerHTML=`
  <img class="" src="${phone.image}" alt="">
  <h3 class="text-xxl font-bold">${phone.name}</h3>
  <p><span class="font-extrabold">Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span class="font-extrabold">Display size:</span>${phone?.mainFeatures?.displaySize}</p>
  <p><span class="font-extrabold">Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
  <p><span class="font-extrabold">Memory:</span>${phone?.mainFeatures?.memory}</p>
  <p><span class="font-extrabold">Brand:</span>${phone?.brand}</p>
  <p><span class="font-extrabold">GPS:</span>${phone?.others?.GPS}</p>
  
  `
  my_modal_5.showModal()
}

// handle show all button

const showAll = () => {

}