import { IResult } from "../useSeo";

const CheckTitles: () => IResult = () => {
    const titles = window.document.getElementsByTagName("h1");
    if (!titles) {
        return {
            message: "Cant find a h1 tag on the page",
            checked: false
        };
    }
    if (titles?.length > 1) {
        return {
            message: `Too many <h1> tags, you have ${titles.length}. It should be 1`,
            checked: false
        };
    }

    if (titles?.length < 1) {
        return {
            message: `Page should have a <h1> tag`,
            checked: false
        };
    }
    return {
        message: `Page has a good h1 tag!`,
        checked: true
    };
};

const CheckPageTitle: () => IResult = () => {
    const pageTitle = window.document.querySelector("title")?.innerText;
    if (!pageTitle) {
        return {
            message: `Page should have a <title> tag. Use title value in DefaultHelmet`,
            checked: false
        };
    }
    if (pageTitle.length <= 7 || pageTitle.length >= 70) {
        return {
            message: `You have a title tag of optimal length (between 10 and 70 characters). Current description length: ${pageTitle.length}`,
            checked: false
        };
    }
    return {
        message: `Page has a good title! Fantastic!`,
        checked: true
    };
};

const CheckDescription: () => IResult = () => {
    const description = window.document.querySelector('meta[name="description"]');
    if (!description) {
        return {
            message: `Page should have a <meta> tag with description. Use description value in DefaultHelmet`,
            checked: false
        };
    }
    const newLocal: any = "content";
    const descriptionText = description.attributes[newLocal].nodeValue;
    if (!descriptionText) {
        return {
            message: `Description text is null`,
            checked: false
        };
    }
    if (descriptionText.length < 71 || descriptionText.length > 320) {
        return {
            message: `Your page has a meta description of optimal length (between 70 and 320 characters). Current description length: ${descriptionText.length}`,
            checked: false
        };
    }
    return {
        message: `Page has a good description! Good job mate!`,
        checked: true
    };
};

const CheckKeywords: () => IResult = () => {
    const keywords = window.document.querySelector('meta[name="keywords"]');
    if (!keywords) {
        return {
            message: `Page should have a <meta> tag with keywords. Use keywords value in DefaultHelmet`,
            checked: false
        };
    }
    const newLocal: any = "content";
    const keywordsText = keywords.attributes[newLocal].nodeValue;
    if (!keywordsText) {
        return {
            message: `Keywords is null`,
            checked: false
        };
    }
    const keywordsArray = keywordsText.split(",");
    if (keywordsArray.length < 10) {
        return {
            message: `You should have at least 10 keywords on your page`,
            checked: false
        };
    }
    return {
        message: `Page has a good amount of keywords!`,
        checked: true
    };
};

const CheckImages: () => IResult = () => {
    const images = window.document.querySelectorAll("img");
    let imagesWithNoAlt: any = [];
    images.forEach((img) => {
        const newLocal: any = "alt";
        const alt = img.attributes[newLocal];
        if (!alt) imagesWithNoAlt.push(img);
    });

    if (imagesWithNoAlt.length > 0) {
        console.log(imagesWithNoAlt);
        return {
            message: `You have images with no alt attribute. Images listed in console log above.`,
            checked: false
        };
    }
    return {
        message: `All images has alt attribute.`,
        checked: true
    };
};

const CheckForNoIndexTag: () => IResult = () => {
    const noIndexTag = window.document.querySelector('meta[content="noindex"]');
    if (noIndexTag) {
        return {
            message: `Page has a meta tag with content "noindex". Remove this`,
            checked: false
        };
    }
    return {
        message: `The page has no "noindex" tag.`,
        checked: true
    };
};

export {
    CheckTitles,
    CheckPageTitle,
    CheckDescription,
    CheckKeywords,
    CheckImages,
    CheckForNoIndexTag
}