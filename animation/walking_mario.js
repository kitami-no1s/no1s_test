// 画像の配列を準備
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

// マリオが走るエリア
const container = document.querySelector('#container');
let area = container.clientWidth;

// マリオ
const box = document.querySelector('#mario');
box.style.backgroundImage = "url(" + images_right[0] +")";

// 移動距離
let y = 0;

// キーコード判別用
let keydown = '';

// 画像配列操作用
let index = 0;
let length = 2;

// ウィンドウのリサイズに対応、マリオを初期位置へ移動
window.addEventListener('resize', e=> {
	area = container.clientWidth;
	box.style.left = "0px";
});

// キーボードが押されている状態
window.addEventListener('keydown', e=> {
	keydown = e.key;
});

// キーボードが離されたとき
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

// マリオの位置を更新、画像の切り替え
const update = () => {
	switch (keydown) {
		case 'ArrowLeft':
//			エリアをはみ出さないように
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