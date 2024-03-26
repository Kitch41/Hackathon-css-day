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
    "https://cssday.nl/_img/2023/photos/400/cssday-2023-5770.webp"
];

// console.log(imageUrls);


function getRandomImageUrl(imageUrls) {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
}

const randomImageUrl = getRandomImageUrl(imageUrls);
console.log(randomImageUrl);
