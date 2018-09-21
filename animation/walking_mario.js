let images_right = [
	"images/mario_1.png",
	"images/mario_2.png",
	"images/mario_3.png",
	]
let images_left = [
	"images/mario_4.png",
	"images/mario_5.png",
	"images/mario_6.png",
]

const container = document.querySelector('#container');
let area = container.clientWidth;;
const box = document.querySelector('#mario');
box.style.backgroundImage = "url(" + images_right[0] +")";
let y = 0;
let keydown = '';
let index = 0;
let length = 2;

window.addEventListener('resize', e=> {
	area = container.clientWidth;
	box.style.left = "0px";
});
window.addEventListener('keydown', e=> {
	keydown = e.key;
});
window.addEventListener('keyup', e => {
	switch (keydown) {
		case 'ArrowLeft':
			box.style.backgroundImage = "url(" + images_left[0] +")";
			break;
		case 'ArrowRight':
			box.style.backgroundImage = "url(" + images_right[0] +")";
			break;
	}
	keydown = '';
});

const update = () => {
	switch (keydown) {
		case 'ArrowLeft':
			if(y >= 5) {
				y -= 5;
			}
			if(index > length){
				index = 0;
			}
			box.style.backgroundImage = "url(" + images_left[index] + ")";
			index++;
			box.style.left = `${y}px`;
			break;
		case 'ArrowRight':
			if(40 < (area - y)){
				y += 5;
			}
			if(index > length){
				index = 0;
			}
			box.style.backgroundImage = "url(" + images_right[index] + ")";
			index++;
			box.style.left = `${y}px`;
			break;
	}
	
	window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update)