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

    // i want a foreach loop for the objects in the data variable

    // call other functions here

    generateCards(data);

    


}

useData();


function generateCards(data) {
    Object.entries(data).forEach(([year, eventData]) => {

        const randomint = Math.floor(Math.random() * 100) + 5670;

        const cardSection = document.querySelector(".cards-ul");


        const cardDiv = document.createElement("li");
        cardDiv.classList.add("card");

        const image = document.createElement("img");
        image.classList.add("cardimg");
        image.src="https://cssday.nl/_img/2023/photos/400/cssday-2023-" + randomint + ".webp"
        cardDiv.appendChild(image);

        const yearPara = document.createElement("p");
        yearPara.classList.add("year");
        yearPara.textContent = year;
        cardDiv.appendChild(yearPara);

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

        cardDiv.appendChild(eventsList);

        cardSection.appendChild(cardDiv);
        document.body.appendChild(cardSection);
    });
}
