

# CSSDAY Hackaton Website

Voor deze opdracht moesten wij onze eigen versie van de website van CSSDay nabouwen en fancier maken. 
## De opdracht
Maak een website die aansluit op de bestaande CSSDay website, en geef die een unieke draai naar eigen wens. Deze opdracht word uigevoerd in HTML, CSS & JS. Deze kunsten hebben wij al onder de knie, dus gebruik die kennis en maak er wat moois van. Alle data die verwerkt moet worden op de website van jou groepje word aangeleverd in de Data.json file. 
<!-- TOC -->
* [CSSDAY Hackaton Website](#cssday-hackaton-website)
  * [De opdracht](#de-opdracht)
  * [Stappenplan voor de website](#stappenplan-voor-de-website)
    * [Inspiratie opdoen](#inspiratie-opdoen)
    * [Datastructuur](#datastructuur)
    * [HTML structuur aanleggen](#html-structuur-aanleggen)
    * [Data fetchen uit de .json](#data-fetchen-uit-de-json)
    * [Cards aanmaken op basis van de jaren die worden gevonden in de json](#cards-aanmaken-op-basis-van-de-jaren-die-worden-gevonden-in-de-json)
    * [Data invullen op de webpagina](#data-invullen-op-de-webpagina)
  * [Stappenplan voor de functionaliteiten](#stappenplan-voor-de-functionaliteiten)
    * [Progessbar](#progessbar)
    * [Dynamische site heading](#dynamische-site-heading)
    * [Carousel](#carousel)
    * [Alles resposive](#alles-resposive)
    * [Randomness](#randomness)
    * [hamburger menu](#hamburger-menu)
    * [navigation buttons met animatie](#navigation-buttons-met-animatie)
      * [open &close animation](#open-close-animation)
  * [Reflectie](#reflectie)
<!-- TOC -->


## Stappenplan voor de website

### Inspiratie opdoen
Wij keken naar de website van CSSDay, en kwamen er achter dat er wat elementen random word bepaalt. bijvoorbeeld de positie van fotos en kleuren van de verschillende jaren. Ook hebben we gezien dat zij veel CSS termen gebruiken om verschillene headings aan te geven om een unieke look te geven. 

### Datastructuur
Alle data voor de website word aangeleverd in een .json file. Voor het voorbeeld heb ik alles uit het jaar 2024 gepakt om te laten zien hoe deze data is opgebouwd.
```json
"2024": {
"days": 2,
"date": [
"2024-06-06",
"2024-06-07"
],
"title": "CSS Day 2024",
"link": "https://cssday.nl/2024",
"venue": "Zuiderkerk",
"price": 675,
"color": {
"name": "peru",
"hex": "#cd853f"
},
"attendees": {
"count": 231,
"countries": {
"NL": 114,
"DE": 32,
"FR": 22,
"UK": 14,
"US": 13,
"BE": 12,
"NO": 9,
"CA": 3,
"SK": 3,
"ES": 2,
"SE": 2,
"PL": 1,
"IL": 1,
"DK": 1,
"EE": 1,
"LB": 1
}
},
"mc": [
{
"name": "Jeremy Keith",
"link": "https://cssday.nl/2024/speakers#jeremy",
"avatar": "https://cssday.nl/_img/2024/speakers/jeremy.jpg",
"day": []
},
{
"name": "Miriam Suzanne",
"link": "https://cssday.nl/2024/speakers#miriam",
"avatar": "https://cssday.nl/_img/2024/speakers/miriam.jpg",
"day": []
}
],
"talks": [
{
"title": "Scroll-Enhanced Experiences",
"speaker": [
{
"name": "Carmen Ansio",
"link": "https://cssday.nl/2024/speakers#carmen",
"avatar": "https://cssday.nl/_img/2024/speakers/carmen.jpg",
"country": "ES"
}
],
```
### HTML structuur aanleggen
Om te beginnen hebben wij een de htmlstructuur aangemaakt op basis van de data die wij moeten gebruiken uit de json. 
```html
   <section>
    <div>
        <p class="day">Dag</p>
        <p class="year">Jaartal</p>
        <p class="daynmr">dagnummer</p>
        <p class="location">Locatie</p>
        <p class="speakers">Aantal Speakers</p>
        <p class="signedup">Al geschreven hoeveel? </p>
    </div>
    </section>

```

### Data fetchen uit de .json
Om de data automatisch in de elementen te zetten moeten wij een script opbouwen. Deze haalt eerst alle data op d.m.v fetch. 
```js
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
```
### Cards aanmaken op basis van de jaren die worden gevonden in de json
Door te zoeken naar alle jaren die wij in je json hebben kunnen wij per jaar een list item maken die het evenement bevat.
```js
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
```

### Data invullen op de webpagina
De data die binnenkomt komt in arrrays binnen per jaartal. wij maken de html elementen aan binnen de section en divs en vullen deze met de data uit de json die wij hebben opgehaald.
```js
function generateCards(data) {
    Object.entries(data).forEach(([year, eventData]) => {
        const cardSection = document.createElement("section");
        cardSection.classList.add("card-section");

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        const yearPara = document.createElement("p");
        yearPara.classList.add("year");
        yearPara.textContent = year;
        cardDiv.appendChild(yearPara);

        const eventsList = document.createElement("ul");
        eventsList.classList.add("events-list");
    )

        // Check if eventData is an array, otherwise, create a single item array

```

## Stappenplan voor de functionaliteiten
Bij dit onderdeel lichten wij de verschillende functies die wij hebben gemaakt uit, en vertellen wij hoe wij die hebben gemaakt.

### Progessbar
Om te laten zien hoe ver je binnen het carousel zit, hebben wij een progressbar gemaakt.


### Dynamische site heading
![dynamicheader.gif](img%2Freadme_img%2Fgif%2Fdynamicheader.gif)
Voor de view hebben wij de index.html als type animatie toegevoegd om te vertellen op welke pagina je bent. Omdat we alle data inladen via js vonden we het leuk om dat als titel te gebruiken

### Carousel
![carousel.gif](img%2Freadme_img%2Fgif%2Fcarousel.gif)
Alles word in een carousel nergezet om alles overzichtelijk te houden 

### Alles resposive
![responsive.gif](img%2Freadme_img%2Fgif%2Fresponsive.gif)
De hele website is responsive op elk scherm waar je het op zou gebruiken word er een goede viewport weergeven.

### Randomness
![randomclrimg.gif](img%2Freadme_img%2Fgif%2Frandomclrimg.gif)
elke kleur en elke foto op we website word random ingeladen. Deze worden uit een lijstje van arrays gekozen en random toegewezen waar mogeljk is. 

### hamburger menu
![hamburger.gif](img%2Freadme_img%2Fgif%2Fhamburger.gif)
dit menu hebben wij toegevoeg voor de mobile navigation. Deze is netjes geanimeerd en is overzichtelijk voor de gebruiker

### navigation buttons met animatie
![navmetbttn.gif](img%2Freadme_img%2Fgif%2Fnavmetbttn.gif)
de items op de menu worden genaimeerd zodat ze een mooie overgang hebben die mee gaat op de content die langaam in beeld komt.
#### open &close animation
![closebttn.gif](img%2Freadme_img%2Fgif%2Fclosebttn.gif)
deze animatie gaat over het openen en closen van de kaarten. Door de animatie te reversen bij het closen word de illusie gegeven dat de kaaarten terug opgedraaid worden. 





## Reflectie
Helaas bestonden wij uit een groepje van 2 personen, en hadden wij niet alle tijd om overal onze uiterste aandacht aan te geven. Echter hebben wij wel een hele leuke website gebouwd die wij met trots kunnen presenteren. Als wij iets meer tijd hadden meet fucties dieper uit te kunnen  werken, dan hadden wij veel leukere en betere animaties te maken. 

