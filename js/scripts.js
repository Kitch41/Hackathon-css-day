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
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5674.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5729.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5802.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5671.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5711.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5752.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-6211.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-6218.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5789.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5770.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-6555.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-6567.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-6531.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5973.webp",
    "https://cssday.nl/_img/2023/photos/1600/cssday-2023-5962.webp"
];

function getRandomImageUrl(imageUrls) {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];
    // Remove the selected URL from the array
    imageUrls.splice(randomIndex, 1);
    return randomImageUrl;
}

const speakerSection = document.querySelector('.speakers');
const hostsSection = document.querySelector('.hosts');

function generateCards(data) {

    const reversedDataEntries = Object.entries(data).reverse();

    reversedDataEntries.forEach(([year, eventData]) => {

        
        const randomImageUrl = getRandomImageUrl(imageUrls);

        const cardSection = document.querySelector(".cards-section");

        const cardUl = document.querySelector(".cards-ul");


        const cardLi = document.createElement("li");
        cardLi.classList.add("card");
        cardLi.setAttribute("data-year", year);

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


    const cards = document.getElementsByClassName("card");
    const cardsArray = Array.from(cards);
    
    cardsArray.forEach(card => {
      card.addEventListener('click', function() {
      
          const year = card.getAttribute("data-year");
  
    
          const image = card.querySelector('.cardimg');
  
 
          const thissrc = image.src;
  
   
          fillback(year, data, thissrc);
          generatemc(year, data);
          generateSpeakers(year, data)
  
          toggleH1Animation();
          const clickedContainer = document.querySelector('.cards-section');
          const flippedContainer = document.querySelector('.cards-section.flipped');
  
          if (flippedContainer && clickedContainer !== flippedContainer) {
              flippedContainer.classList.remove('flipped');
              isKaartFlipped = false;
          }
  
          if (clickedContainer && !clickedContainer.classList.contains('flipped')) {
              clickedContainer.classList.add('flipped');
              isKaartFlipped = true;
          }
      });
  });
    
    // Define another function to use the year value
    function fillback(year, data, src) {
        console.log("Year received in another function:", year);
        
      // replace shit with good year

      const secondh1year = document.querySelector(".secondh1 h1 span");

      const yearelement = document.getElementById("year");

      secondh1year.innerHTML = year;

      const venue = document.getElementById("venue");
      const date = document.getElementById("date");
      const price = document.getElementById("price");
      const backimg = document.getElementById("backimg");

      console.log(data[year]);
      yearelement.innerHTML = year;
      venue.innerHTML = data[year].venue;
      date.innerHTML = data[year].date[0] + " / " +  data[year].date[1];
      price.innerHTML ="€ " + data[year].price;
      backimg.src = src;

      

    }
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

const carouselContainer = document.querySelector('.cards-section');
const progressbar = document.querySelector('.progress-bar');

function updateProgressBar() {
   
    
    const carouselWidth = carouselContainer.scrollWidth - carouselContainer.clientWidth;
    const scrollPosition = carouselContainer.scrollLeft;
    const progress = (scrollPosition / carouselWidth) * 100;
    
    progressbar.style.width = progress + '%';
  }
  
  if (progressbar) {
    document.querySelector('.cards-section').addEventListener('scroll', updateProgressBar);
  }


  updateProgressBar();

//////////////////////////////////////////////////////////////////////////////////////////

let isScrolling = false;

function scrollSideways() {
  if (!carouselContainer.classList.contains("flipped")) {
    // Remove existing event listeners if any
    carouselContainer.removeEventListener('wheel', handleWheelEvent);
    prevButton.removeEventListener('click', handlePrevButtonClick);
    nextButton.removeEventListener('click', handleNextButtonClick);

    // Attach new event listeners
    carouselContainer.addEventListener('wheel', handleWheelEvent);
    prevButton.addEventListener('click', handlePrevButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);
  }
}

// Event handler for wheel event
function handleWheelEvent(event) {
  if (!carouselContainer.classList.contains("flipped")) {
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
  } else {
    // Prevent the scroll event from affecting the container when flipped
    event.stopPropagation();
  }
}

// Event handler for previous button click
function handlePrevButtonClick(event) {
  event.preventDefault(); // Prevent default anchor behavior
  carouselContainer.scrollBy({
    left: -carouselContainer.offsetWidth, // Scroll width of carousel container
    behavior: 'smooth'
  });
}

// Event handler for next button click
function handleNextButtonClick(event) {
  event.preventDefault(); // Prevent default anchor behavior
  carouselContainer.scrollBy({
    left: carouselContainer.offsetWidth, // Scroll width of carousel container
    behavior: 'smooth'
  });
}

// Call the function initially
scrollSideways();

const flipcross = document.querySelector(".xmark")





// Event listener for the flipcross button
flipcross.addEventListener('click', function(event) {

  reverseToggleH1Animation();
    event.preventDefault(); // Prevents the default action of the button (e.g., form submission)

    // Stop event propagation to prevent triggering the click event on carouselContainer
    event.stopPropagation();

    // Remove the 'flipped' class from the flippedContainer
    const flippedContainer = document.querySelector('.cards-section');
    if (flippedContainer) {

      flippedContainer.style.animation = "none"
      flippedContainer.offsetHeight;
      flippedContainer.style.animation = "rotate 8s"

      setTimeout(function() {
        flippedContainer.classList.remove('flipped');
        isKaartFlipped = false;
        speakerSection.innerHTML = '';
        hostsSection.innerHTML = '';
    }, 3400);

    setTimeout(() => {
      flippedContainer.style.animation = ""
    }, 8000);


    }
});


const menu = document.querySelector(".rechts ul");
const menuItems = document.querySelectorAll(".rechts ul li");
const hamburger= document.querySelector(".hamburger");
const menuIcon = document.querySelector(".menuIcon");
const modalmenu = document.querySelector(".modalmenu")

function toggleMenu(event) {
  event.preventDefault();
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    modalmenu.classList.add("invisible")
    modalmenu.classList.remove("visible")
  } else {
    menu.classList.add("showMenu");
    modalmenu.classList.remove("invisible")
    modalmenu.classList.add("visible")
  }
}

hamburger.addEventListener("click", toggleMenu);


const firstH1 = document.querySelector('.firsth1');
const secondH1 = document.querySelector('.secondh1');

function toggleH1Animation() {
    // Play the animation in reverse for the .firsth1 element
    firstH1.style.animation = 'typing-reverse 1s steps(15) forwards';

    // Wait for the animation to finish (1 second)
    setTimeout(() => {
        // Hide the .firsth1 element
        firstH1.style.display = 'none';

        // Display the .secondh1 element
        secondH1.style.display = 'flex';

        // Play the typing animation for the .secondh1 element
        secondH1.style.animation = 'typing2 2s steps(30)';
    }, 1000); // Adjust the timeout value as needed
}



function reverseToggleH1Animation() {
  // Play the reverse typing animation for the .secondh1 element
  secondH1.style.animation = 'typing-reverse2 2s steps(30) forwards';

  // Wait for the animation to finish (1 second)
  setTimeout(() => {
      // Hide the .secondh1 element
      secondH1.style.display = 'none';

      // Display the .firsth1 element
      firstH1.style.display = 'flex';

      // Play the typing animation for the .firsth1 element
      firstH1.style.animation = 'typing 1s steps(15)';
  }, 1000); // Adjust the timeout value as needed
}


// function generatemc(year, data) {

  //generate this structure for each mc in data[year].mc this is an array.
  //then fill the img src with data[year].mc[index].avatar
  //then fill the p with id name with data[year].mc[index].name
  //then fill the a href with id=link with data[year].mc[index].link

//   <section class="hosts">
//   <section class="mc" id="mc">
//       <img src="img/placeholderimg.webp" id="avatar" alt="Spreker">
//       <p id="name">/Naam/</p>
//       <a href="" id="link">/Naam url/</a>
//   </section>
// </section>
// }

function generatemc(year, data) {

  // Get the container where the MC sections will be added


  if(hostsSection) {

  // Check if the data for the specified year exists and has MCs
  if (data[year] && data[year].mc && data[year].mc.length > 0) {
    // Iterate over the MCs in the data array
    data[year].mc.forEach(mc => {
      // Create a new MC section element
      const mcSection = document.createElement('section');
      mcSection.classList.add('mc');

      // Create and configure the image element
      const img = document.createElement('img');
      img.src = mc.avatar || 'img/placeholderimg.webp'; // Set the source, use a placeholder if no avatar provided
      img.alt = 'Spreker';
      mcSection.appendChild(img);

      // Create and configure the paragraph element for the MC's name
      const namePara = document.createElement('p');
      namePara.id = 'name';
      namePara.textContent = mc.name || ''; // Set the name, leave it empty if no name provided
      mcSection.appendChild(namePara);

      // Create and configure the anchor element for the MC's link
      const linkAnchor = document.createElement('a');
      linkAnchor.href = mc.link || '#'; // Set the link, use '#' if no link provided
      linkAnchor.id = 'link';
      linkAnchor.textContent = mc.name || ''; // Set the text content of the link to the MC's name
      mcSection.appendChild(linkAnchor);

      // Append the MC section to the hosts section
      hostsSection.appendChild(mcSection);
    });
  } else {
    // If no MC data is available for the specified year, display a message
    hostsSection.textContent = 'No MCs available for this year.';
  }

}
}

function generateSpeakers(year, data) {

 
  if (speakerSection) {

  if (data[year] && data[year].speakers && data[year].speakers.length > 0) {
    data[year].speakers.forEach(speaker => {
      // Create a new speaker section element
      const speakerDiv = document.createElement('div');
      speakerDiv.classList.add('speaker');

      // Create and configure the image element
      const img = document.createElement('img');
      img.src = speaker.avatar || 'img/placeholderimg.webp'; 
      img.alt = 'Speaker';
      speakerDiv.appendChild(img);

      // Create and configure the paragraph element for the speaker's name
      const namePara = document.createElement('p');
      namePara.textContent = speaker.name || ''; 
      speakerDiv.appendChild(namePara);

      const title = document.createElement('p');
      title.textContent = speaker.talk.title || ''; 
      speakerDiv.appendChild(title);

      // Create and configure the anchor element for the speaker's link
      const linkAnchor = document.createElement('a');
      linkAnchor.href = speaker.link || '#'; 
      linkAnchor.textContent = 'More info'; // Example text for the link
      speakerDiv.appendChild(linkAnchor);

      // Append the speaker section to the speakers section
      speakerSection.appendChild(speakerDiv);
    });
  } else {
    // If no speaker data is available for the specified year, display a message
    speakerSection.textContent = 'No speakers available for this year.';
  }

}
}