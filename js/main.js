(function () {
	var d = document,
		accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
		setAria,
		setAccordionAria,
		switchAccordion,
		touchSupported = ('ontouchstart' in window),
		pointerSupported = ('pointerdown' in window);

	skipClickDelay = function (e) {
		e.preventDefault();
		e.target.click();
	}

	setAriaAttr = function (el, ariaType, newProperty) {
		el.setAttribute(ariaType, newProperty);
	};
	setAccordionAria = function (el1, el2, expanded) {
		switch (expanded) {
			case "true":
				setAriaAttr(el1, 'aria-expanded', 'true');
				setAriaAttr(el2, 'aria-hidden', 'false');
				break;
			case "false":
				setAriaAttr(el1, 'aria-expanded', 'false');
				setAriaAttr(el2, 'aria-hidden', 'true');
				break;
			default:
				break;
		}
	};
	//function
	switchAccordion = function (e) {
		console.log("triggered");
		e.preventDefault();
		var thisAnswer = e.target.parentNode.nextElementSibling;
		var thisQuestion = e.target;
		if (thisAnswer.classList.contains('is-collapsed')) {
			setAccordionAria(thisQuestion, thisAnswer, 'true');
		} else {
			setAccordionAria(thisQuestion, thisAnswer, 'false');
		}
		thisQuestion.classList.toggle('is-collapsed');
		thisQuestion.classList.toggle('is-expanded');
		thisAnswer.classList.toggle('is-collapsed');
		thisAnswer.classList.toggle('is-expanded');

		thisAnswer.classList.toggle('animateIn');
	};
	for (var i = 0, len = accordionToggles.length; i < len; i++) {
		if (touchSupported) {
			accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
		}
		if (pointerSupported) {
			accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
		}
		accordionToggles[i].addEventListener('click', switchAccordion, false);
	}
})();

let burger = document.querySelector('.burger');
let menu = document.querySelector('.menu');
let body = document.querySelector('body');

burger.onclick = function () {
	menu.classList.toggle('active');
	burger.classList.toggle('active');
	body.classList.toggle('lock');
};

//  tel

let telInp = document.getElementById('tel-inp');
//???????????????? ???????????????????? ?????????????????? ????????
let howDigits = str => str.split('').filter(el => /\d/.test(el)).length;
//?????? ???????????? ?????????????????????? +7(
let whenFocusPhone = e => e.target.value = '+7(';
//???????? ?????????????????? ???????????? ??????????
let checkPhoneKey = key => key >= '0' && key <= '9';
let checkNumPhone = (e) => {
	if (!checkPhoneKey(e.target.value[e.target.value.length - 1]) || howDigits(e.target.value) > 11)
		e.target.value = e.target.value.slice(0, -1);
	if (e.target.value.length == 6)
		e.target.value += ')-';
	if (e.target.value.length == 11 || e.target.value.length == 14)
		e.target.value += '-';
}
telInp.addEventListener('focus', whenFocusPhone);
telInp.addEventListener('input', checkNumPhone);
telInp.addEventListener('keydown', checkPhoneKey);

const slider = document.querySelector('.slider-container');

let mySwiper;

function mobileSlider() {
	if (window.innerWidth <= 767 && slider.dataset.mobile == 'false') {
		mySwiper = new Swiper(slider, {
			slidesPerView: 1,
			loop: true,
			slideClass: 'advantages__item',
			sliderPreGroup: 1,
			centeredSlides: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
		slider.dataset.mobile = 'true';
	}

	if (window.innerWidth > 767) {
		slider.dataset.mobile = 'false';
		// if (slider.classList.contains('swiper-container-initialized') {
		// 		mySwiper.destroy();
		// 	});
	}
}

mobileSlider();

window.addEventListener('resize', () => {
	mobileSlider();
})