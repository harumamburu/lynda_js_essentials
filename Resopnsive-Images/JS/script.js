const IMAGES = document.querySelectorAll("img");
const SIZES = {
    showcase: "100vw",
    reason: "(max-width: 799px) 100vw, 372px",
    feature: "(max-width: 799px) 100vw, 558px",
    story: "(max-width: 799px) 100vw, 670px"
};
function makeSrcSet(imgSrc) {
    let markup = [];
    let width = 400; // the smallest available

    for (let i = 0; i < 5; i++) {
        markup[i] = imgSrc + "-" + width + ".jpg " + width + "w";
        width += 400;
    }

    return markup.join();
}

for (image of IMAGES) {
    let imgSrc = image.getAttribute("src").slice(0, -8); // cut off extensions
    image.setAttribute("srcset", makeSrcSet(imgSrc));

    let sizes = SIZES[image.getAttribute("data-type")];
    image.setAttribute("sizes", sizes);
}
