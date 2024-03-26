async function fetchData() {
    try {
        const response = await fetch("https://cssday.nl/data.json");

        if (!response.ok) {
            throw new Error("Failed to get data");
        }

        const data = await response.json();

        // console.log(data)
        return data;
        

    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
}

async function useData() {

    const data = await fetchData();

    console.log(data)

    generateCards(data);

    setRandomColor(data);

}

useData();



const imageUrls = [
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5674.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5729.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5802.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5671.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5711.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5752.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-6211.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-6218.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5789.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5770.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-6555.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-6567.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-6531.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5973.webp",
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5962.webp"
];

function getRandomImageUrl(imageUrls) {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];
    // Remove the selected URL from the array
    imageUrls.splice(randomIndex, 1);
    return randomImageUrl;
}

function generateCards(data) {

    const reversedDataEntries = Object.entries(data).reverse();

    reversedDataEntries.forEach(([year, eventData]) => {

        
        const randomImageUrl = getRandomImageUrl(imageUrls);

        const cardSection = document.querySelector(".cards-section");

        const cardUl = document.querySelector(".cards-ul");


        const cardLi = document.createElement("li");
        cardLi.classList.add("card");

        const image = document.createElement("img");
        image.classList.add("cardimg");
        image.src=randomImageUrl;
        cardLi.appendChild(image);

        const yearPara = document.createElement("h2");
        yearPara.classList.add("year");
        yearPara.textContent = year;
        cardLi.appendChild(yearPara);

        const eventsList = document.createElement("ul");
        eventsList.classList.add("events-list");

        // Check if eventData is an array, otherwise, create a single item array
        const events = Array.isArray(eventData) ? eventData : [eventData];

        events.forEach(event => {
            const eventItem = document.createElement("li");

            const dayPara = document.createElement("p");
            dayPara.classList.add("day");
            dayPara.textContent = event.date[0];
            eventItem.appendChild(dayPara);

            const locationPara = document.createElement("p");
            locationPara.classList.add("location");
            locationPara.textContent = event.venue;
            eventItem.appendChild(locationPara);

            const speakersPara = document.createElement("p");
            speakersPara.classList.add("speakers");
            speakersPara.textContent = "Speakers " + event.speakers.length;
            eventItem.appendChild(speakersPara);

            const signedUpPara = document.createElement("p");
            signedUpPara.classList.add("signedup");
            signedUpPara.textContent = "Visitors " + event.attendees.count;
            eventItem.appendChild(signedUpPara);

            eventsList.appendChild(eventItem);
        });

        cardLi.appendChild(eventsList);

        cardUl.appendChild(cardLi);
        cardSection.appendChild(cardUl);
    });
}


function setRandomColor(data) {
    // Get an array of keys (item names) from the data object
    const keys = Object.keys(data);
    
    // Get a random key from the keys array
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    
    // Set the year constant to the random key
    const year = randomKey;

    // Set the CSS variable using the random key
    document.body.style.setProperty('--accent-color', `var(--${year}-color)`);
}

function updateProgressBar() {
    const carouselContainer = document.querySelector('.cards-section');
    const progressbar = document.querySelector('.progress-bar');
    
    const carouselWidth = carouselContainer.scrollWidth - carouselContainer.clientWidth;
    const scrollPosition = carouselContainer.scrollLeft;
    const progress = (scrollPosition / carouselWidth) * 100;
    
    progressbar.style.width = progress + '%';
  }
  
  // Attach event listener to track scroll position changes in the carousel
  document.querySelector('.cards-section').addEventListener('scroll', updateProgressBar);
  
  // Call updateProgressBar initially to set the initial progress
  updateProgressBar();

//////////////////////////////////////////////////////////////////////////////////////////


  const carouselContainer = document.querySelector('.cards-section');

  // Variable to track if the user is actively scrolling
  let isScrolling = false;
  
  carouselContainer.addEventListener('wheel', (event) => {
    // Disable scroll snap temporarily while the user is actively scrolling horizontally
    carouselContainer.style.scrollSnapType = 'none';
  
    // Check if the user is scrolling horizontally (left or right)
    if (event.deltaY === 0) {
      carouselContainer.scrollLeft += event.deltaX;
    } else {
      // Scroll the carousel horizontally based on the vertical scroll direction
      carouselContainer.scrollLeft += event.deltaY;
    }
  
    // Prevent the default vertical scrolling behavior
    event.preventDefault();
  
    // Set a timeout to re-enable scroll snap after a short delay
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      carouselContainer.style.scrollSnapType = 'x mandatory';
    }, 1000); // Adjust the delay as needed
  });