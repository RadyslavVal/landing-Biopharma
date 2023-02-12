/*=============================================*/
const liveBlock = document.querySelector('.live-text-main-block')
const liveText = document.querySelectorAll('.live-text-main-block__item');
const liveTextContent = [];
const positionTop = liveBlock.clientHeight;
liveText.forEach(item => item.textContent !== '' ? liveTextContent.push(item) : null);
const liveTextCounter = liveTextContent.length;
let next = 0;
liveTextContent[next].style.opacity = '1';
liveTextContent[next].style.top = '0px';
setInterval(() => {
    let modif = 1;
    liveTextContent[next].style.top = `-${positionTop}px`;
    next < liveTextCounter - 1 ? next += 1 : next = 0;
    liveTextContent[next].clientWidth > liveBlock.clientWidth ? (next += 1, modif = 2) : modif = 1;

    liveTextContent[next].style.opacity = '1';
    liveTextContent[next].style.top = '0px';

    setTimeout(() => {
        next !== 0 ? (
            liveTextContent[next - modif].style.opacity = '0',
            liveTextContent[next - modif].style.top = `${positionTop}px`
        ) : (
            liveTextContent[liveTextCounter - 1].style.opacity = '0',
            liveTextContent[liveTextCounter - 1].style.top = `${positionTop}px`
        );
    }, 500)
}, 2000);

/*=============================================*/
let webWidth = document.querySelector('.wrapper').offsetWidth;
let slider = document.querySelectorAll('.slider-galery-block__items')
let slides = document.querySelectorAll('.slider-galery-block__item');
let slideStep = slides[0].offsetHeight;
const numAdditionalSlides = Math.ceil((webWidth / 2 - slideStep / 2) / slideStep);
let frontSlides = [...slides].slice(-numAdditionalSlides);
let endSlides = [...slides].slice(0, numAdditionalSlides);
frontSlides.reverse().forEach(item => slider[0].prepend(item.cloneNode(true)));
endSlides.forEach(item => slider[0].append(item.cloneNode(true)));
let activeSlide;
let swipeLeft = true;
let swipeRight = false;
let slidesLeft;
if (slides.length % 2 !== 0 && slides.length > 0) {
    activeSlide = slides.length - Math.ceil(slides.length / 2);
    slides[activeSlide].classList.add('active');
    slidesLeft = slides.length - 1 - activeSlide;
}
if (slides.length % 2 === 0 && slides.length > 0) {
    activeSlide = [slides.length - Math.ceil(slides.length / 2) - 1, slides.length - Math.ceil(slides.length / 2)];
    slides[activeSlide[0]].classList.add('active');
    slides[activeSlide[1]].classList.add('active');
    slidesLeft = slides.length - 1 - activeSlide[1];
}


const onclickSlider = function () {
    document.querySelector('.slider-galery-block').removeEventListener('click', onclickSlider);
    if (slides.length % 2 !== 0) {
        slides[activeSlide].classList.remove('active');
        swipeLeft ? activeSlide += 1 : activeSlide -= 1;
        slides[activeSlide].classList.add('active');
        swipeLeft ?
            slider[0].style.left = `${Number(slider[0].style.left.replace("px", "")) - slideStep}px` :
            slider[0].style.left = `${Number(slider[0].style.left.replace("px", "")) + slideStep}px`;
        slidesLeft -= 1;
        if (slidesLeft === 0) {
            setTimeout(() => {
                slidesLeft = slides.length - 1;
                swipeLeft = !swipeLeft;
                swipeRight = !swipeRight;
            })
        }
    }
    if (slides.length % 2 === 0) {
        slides[activeSlide[0]].classList.remove('active');
        slides[activeSlide[1]].classList.remove('active');
        swipeLeft ? activeSlide = activeSlide.map(item => item += 1) : activeSlide = activeSlide.map(item => item -= 1);
        slides[activeSlide[0]].classList.add('active');
        slides[activeSlide[1]].classList.add('active');
        swipeLeft ?
            slider[0].style.left = `${Number(slider[0].style.left.replace("px", "")) - slideStep}px` :
            slider[0].style.left = `${Number(slider[0].style.left.replace("px", "")) + slideStep}px`;
        slidesLeft -= 1;
        if (slidesLeft === 0) {
            setTimeout(() => {
                slidesLeft = slides.length - 2;
                swipeLeft = !swipeLeft;
                swipeRight = !swipeRight;
            })
        }
    }
    setTimeout(() => {
        document.querySelector('.slider-galery-block').addEventListener('click', onclickSlider);
    }, 500)
}
document.querySelector('.slider-galery-block').addEventListener('click', onclickSlider);

/*=============================================*/

const animItems = document.querySelectorAll('.live-text-counter-block__item');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        let index = 0;
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = animItems.length;
        const animItemPoint = window.innerHeight - animItemHeight;
        const animItemStep = window.innerHeight / animStart;
        if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if (scrollY > (animItemOffset - animItemPoint) && scrollY < (animItemOffset)) {
            index = Math.floor((scrollY - animItemOffset + animItemPoint) / animItemStep);
            if (index < animItems.length) {
                animItems[index].classList.remove('_inactive');
                animItems[index].classList.add('_active');
                if (index > 0) {
                    animItems[index - 1].classList.add('_inactive');
                    animItems[index - 1].classList.remove('_active');
                }
                if (index + 1 < animItems.length) {
                    animItems[index + 1].classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
}

/*=============================================*/
const animCounter = document.querySelector('.counter-block__counted');
const animCounterScale = document.querySelector('.counter-block__content');
const animCounterBlock = document.querySelector('.counter-block__counter');

let maxHeightScale = animCounterBlock.offsetHeight
    - parseInt(getComputedStyle(animCounterBlock, true).paddingTop)
    - parseInt(getComputedStyle(animCounterBlock, true).paddingBottom)
    - parseInt(getComputedStyle(animCounterBlock, true).borderTop)
    - parseInt(getComputedStyle(animCounterBlock, true).borderBottom);

const getRandomValues = (min, max) => {
    return Math.floor(Math.random() * (Math.floor(Math.max(min, max)) - Math.ceil(Math.min(min, max)) + 1)) + min;
};

setInterval(() => {
    let randomValue = getRandomValues(0, 5)
    animCounter.textContent = Number(animCounter.textContent) + randomValue;
    let startHeightScale = parseInt(getComputedStyle(animCounterScale, true).paddingTop);
    if (animCounterScale.offsetHeight < maxHeightScale) {
        animCounterScale.style.paddingTop = `${startHeightScale + randomValue}px`
    }
}, 1000);



/*=============================================*/
let copyUrlBtn = document.querySelector('#copy-button');
if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', () => {
        let tempInput = document.createElement('textarea');
        tempInput.style.fontSize = '12pt';
        tempInput.style.border = '0';
        tempInput.style.padding = '0';
        tempInput.style.margin = '0';
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        tempInput.setAttribute('readonly', '');
        tempInput.value = window.location.href;
        copyUrlBtn.parentNode.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999);
        document.execCommand('copy');
        tempInput.parentNode.removeChild(tempInput);

        let copiedLink = document.getElementById('copied-link');
        copiedLink.style.opacity = '1';
        setTimeout(() => {
            copiedLink.style.opacity = '0';
        }, 1000)
    });
}

/*=============================================*/

let formBlock = document.querySelector('.form-block');
let formBlockContainer = document.querySelector('.form-block__container');
let formBlockForm = document.querySelector('.form-block__form');
formBlockContainer.style.padding = `${(innerHeight - formBlockForm.offsetHeight) / 2}px 0px`;

let stickyButton = document.querySelector('.button-block__button');
let howToBecomeButton = document.querySelector('.how-to-become-block__button');

let clickOpenFormButton = function () {
    formBlock.style.visibility = 'visible';
    formBlockContainer.style.backgroundColor = 'rgba(122, 121, 121, 0.6)';
}

stickyButton.addEventListener('click', clickOpenFormButton);
howToBecomeButton.addEventListener('click', clickOpenFormButton);

let handleClosedForm = function () {
    formBlockContainer.style.backgroundColor = 'rgba(122, 121, 121, 0)';
    formBlock.style.visibility = 'hidden';
}

document.addEventListener('keydown', function (e) {
    if (e.key == 'Escape' && formBlock.style.visibility === 'visible') {
        handleClosedForm()
    }
});

let closeButton = document.querySelector('.form-block__close');
closeButton.addEventListener('click', handleClosedForm);

formBlock.addEventListener('click', (e) => {
    const withinBoundaries = e.composedPath().includes(formBlockForm);
    if (!withinBoundaries) {
        handleClosedForm()
    }
})

let sendFormButton = document.querySelector('#send-form');
let formInputName = document.querySelector('.form-block__name');
let formInputSurname = document.querySelector('.form-block__surname');
let formInputPhone = document.querySelector('.form-block__phone');
let formInputCity = document.querySelector('.form-block__city');

let thanksBlock = document.querySelector('.page__thanks');
thanksBlock.style.padding = `${(innerHeight - thanksBlock.offsetHeight) / 2}px 0px`;

let emptyNameField = document.querySelector('.required-field-name');
let errorNameLength = document.querySelector('.required-field-name-length');

let emptySurnameField = document.querySelector('.required-field-surname');
let errorSurnameLength = document.querySelector('.required-field-surname-length');

formInputPhone.onfocus = function () {
    formInputPhone.value = '+380'
}
let emptyPhoneField = document.querySelector('.required-field-phone');
let errorPhoneLength = document.querySelector('.required-field-phone-check');
let regExpPhone = /^\+38\(?0\d{2}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/gm;

let emptyCityField = document.querySelector('.required-field-city');
let errorCityLength = document.querySelector('.required-field-city-length');

let verifyAndSendForm = function () {
    let verifyName = false;
    formInputName.value.length === 0 ?
        (errorNameLength.style.display = 'none', emptyNameField.style.display = 'block', formInputName.style.marginBottom = '5px')
        : formInputName.value.length > 0 && formInputName.value.length < 2 ?
            (emptyNameField.style.display = 'none', errorNameLength.style.display = 'block', formInputName.style.marginBottom = '5px') :
            (emptyNameField.style.display = 'none', errorNameLength.style.display = 'none', formInputName.style.marginBottom = '10px', verifyName = true);

    let verifySurname = false;
    formInputSurname.value.length === 0 ?
        (errorSurnameLength.style.display = 'none', emptySurnameField.style.display = 'block', formInputSurname.style.marginBottom = '5px') :
        formInputSurname.value.length > 0 && formInputSurname.value.length < 2 ?
            (emptySurnameField.style.display = 'none', errorSurnameLength.style.display = 'block', formInputSurname.style.marginBottom = '5px') :
            (emptySurnameField.style.display = 'none', errorSurnameLength.style.display = 'none', formInputSurname.style.marginBottom = '10px', verifySurname = true);

    let verifyPhone = false;
    formInputPhone.value.length === 0 ?
        (errorPhoneLength.style.display = 'none', emptyPhoneField.style.display = 'block', formInputPhone.style.marginBottom = '5px') :
        regExpPhone.exec(formInputPhone.value) ?
            (emptyPhoneField.style.display = 'none', errorPhoneLength.style.display = 'none', formInputPhone.style.marginBottom = '10px', verifyPhone = true) :
            (emptyPhoneField.style.display = 'none', errorPhoneLength.style.display = 'block', formInputPhone.style.marginBottom = '5px')

    let verifyCity = false;
    formInputCity.value.length === 0 ?
        (errorCityLength.style.display = 'none', emptyCityField.style.display = 'block', formInputCity.style.marginBottom = '5px') :
        formInputCity.value.length > 0 && formInputCity.value.length < 2 ?
            (emptyCityField.style.display = 'none', errorCityLength.style.display = 'block', formInputCity.style.marginBottom = '5px') :
            (emptyCityField.style.display = 'none', errorCityLength.style.display = 'none', formInputCity.style.marginBottom = '10px', verifyCity = true);

    if (verifyName && verifySurname && verifyPhone && verifyCity) {
        handleClosedForm();
        thanksBlock.style.visibility = 'visible';
    }
}

sendFormButton.addEventListener('click', verifyAndSendForm)