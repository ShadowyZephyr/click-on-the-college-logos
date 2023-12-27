var c = 0;
var held = 0;
document.oncontextmenu = () => false;
function compare(c1, c2) {
	const name1 = c1.name;
	const name2 = c2.name;
	let comparison = 0;
	if (name1 > name2) {
		comparison = 1;
	} else if (name2 > name1) {
		comparison = -1;
	}
	return comparison;
}
class College {
	constructor(name, width, height, sprite) {
		this.name = name;
		this.width = height;
		this.height = width;
		this.posx = random(w * 2);
		this.posy = random(h * 2);
		this.velx = random(s/-300, s/300);
		this.vely = random(s/-300, s/300);
		this.sprite = sprite;
		this.shown = true;
	}
	move() {
		college.posx = college.posx + college.velx;
		college.posy = college.posy + college.vely;
		if (college.posx <= 0 || college.posx >= w * 2) {
			college.velx = college.velx * -1;
			college.posx = constrain(college.posx, 0, w*2);
		}
		if (college.posy <= 0 || college.posy >= h * 2) {
			college.vely = college.vely * -1;
			college.posy = constrain(college.posy, 0, h*2);
		}
		if (college.velx <= -s/300 || college.velx >= s/300) {
			college.velx = college.velx * 0.99;
		}
		if (college.vely <= -s/300 || college.vely >= s/300) {
			college.vely = college.vely * 0.99;
		}
	}
	attract(x, y) {
		let dx = college.posx - x;
		let dy = college.posy - y;
		let distance = dist(college.posx, college.posy, x, y);
		distance = distance/(w+h) * 20;
		let f = force(distance);
		let cx = dx/(abs(dx)+abs(dy));
		let cy = dy/(abs(dx)+abs(dy));
		college.velx = college.velx - f * cx;
		college.vely = college.vely - f * cy;
	}
	repel(x, y) {
		let dx = college.posx - x;
		let dy = college.posy - y;
		let distance = dist(college.posx, college.posy, x, y);
		distance = distance/(w+h) * 20;
		let force = constrain(1/(2 * distance), (w+h)/-1500, (w+h)/1500);
		let cx = dx/(abs(dx)+abs(dy));
		let cy = dy/(abs(dx)+abs(dy));
		college.velx = college.velx + force * cx;
		college.vely = college.vely + force * cy;
	}
}
function setColleges() {
	mit = new College('mit', s/16, s/8, loadImage('mit.png'));
	columbia = new College('columbia', s/10, s/10, loadImage('assets/columbia.png'));
	uchicago = new College('uchicago', s/10, s/10, loadImage('assets/uchicago.png'));
	harvard = new College('harvard', s/10.575, s/9, loadImage('assets/harvard.png'));
	princeton = new College('princeton', s/10, s/11.5, loadImage('assets/princeton.png'));
	yale = new College('yale', s/13.25, s/7.5, loadImage('assets/yale.png'));
	unc = new College('unc', s/12, s/8.2, loadImage('assets/unc chapel hill.png'));
	wellesley = new College('wellesley', s/15.7, s/10, loadImage('assets/wellesley.png'));
	stanford = new College('stanford', s/8, s/8, loadImage('assets/stanford.webp'));
	dartmouth = new College('dartmouth', s/10.25, s/10, loadImage('assets/dartmouth.webp'));
	tufts = new College('tufts', s/10, s/10, loadImage('assets/tufts.png'));
	barnard = new College('barnard', s/12, s/9, loadImage('assets/barnard.png'));
	colby = new College('colby', s/10, s/10, loadImage('assets/colby (1) (1).png'));
	caltech = new College('caltech', s/10, s/10, loadImage('assets/caltech.png'));
	brown = new College('brown', s*0.0965, s*0.07, loadImage('assets/brown.gif'));
	upenn = new College('upenn', s*0.042, s*0.15, loadImage('assets/upenn.png'));
	cornell = new College('cornell', s*0.1, s*0.1, loadImage('assets/cornell.png'));
	johnshopkins = new College('johnshopkins', s*0.093, s*0.1, loadImage('assets/jhu.png'));
	collegeList = [johnshopkins, cornell, brown, upenn, tufts, caltech, barnard, colby, mit, columbia, uchicago, harvard, princeton, yale, unc, wellesley, stanford, dartmouth].sort(compare);
}
function setup() {
	createCanvas(windowWidth, windowHeight);
  	w = windowWidth/2;
	h = windowHeight/2;
	s = (w+h) * 1.2;
	setColleges();
	checkboxList = [];
	for (let i = 0; i < collegeList.length; i++) {
		checkbox = createCheckbox(collegeList[i].name, true);
		checkbox.position(w * 0.05, h * 0.15 + i * 20);
		checkboxList.push(checkbox);
	}
	let search = createInput('');
	search.position(w * 0.05, h * 0.05);
	search.input(() => {
		let v = search.value();
		let py = h * 0.15;
		for (let i = 0; i < checkboxList.length; i++) {
			checkbox = checkboxList[i];
			if (collegeList[i].name.startsWith(v)) {
				checkbox.position(w * 0.05, py)
				checkbox.show();
				py = py + 20;
			}	else {
				checkbox.hide();
			}
		}
	});
}

function draw() {	
	w = windowWidth/2;
	h = windowHeight/2;
	background(255);
	fill(color(0,0,0));
	noStroke();
	imageMode(CENTER);
	for (let i = 0; i < collegeList.length; i++) {
		if (mouseIsPressed === true) {
			if (mouseButton === LEFT) {
				held += 1;
				if (held > 50) {
					college.attract(mouseX, mouseY);
				}
			}
			if (mouseButton === RIGHT) {
				college.repel(mouseX, mouseY);
			}
		} else {
			held = 0;
		}
		college = collegeList[i]
		if(checkboxList[i].checked()) {
			college.shown = true;
			college.move();
			image(college.sprite, college.posx, college.posy, college.width, college.height);	
		} else {
			college.shown = false;
		}
	}
	textSize(40);
	textAlign(CENTER);
	text('Clicks - ' + str(c), w, h * 0.1);
}

function mouseinRect(x, y, w, h) {
	if (x - w <= mouseX && mouseX <= x + w && y - h <= mouseY && mouseY <= y + h) {
		return true;
	} else {
		return false;
	}
}

function mouseClicked() {
	for (let i = 0; i < collegeList.length; i++) {
		college = collegeList[i];
		if(mouseinRect(college.posx, college.posy, college.width, college.height) && college.shown == true) {
			c += 1;
			return;
		}
	}
}

function force(d) {
	if(d < 0) {
		return (sin(4/(d-1.272))/2) * 0.9 ** -d;
	} else if (d > 0) {
		return (sin(4/(d+1.272))/2) * 0.9 ** d;
	} else return 0;
}
