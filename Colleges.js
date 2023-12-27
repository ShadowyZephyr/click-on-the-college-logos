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
function setColleges() {
	mit = new College('mit', s/16, s/8, loadImage('mit.png'));
	columbia = new College('columbia', s/10, s/10, loadImage('assets/columbia.png'));
	uchicago = new College('uchicago', s/10, s/10, loadImage('assets/uchicago.png'));
	harvard = new College('harvard', s/10.575, s/9, loadImage('assets/harvard.png'));
	princeton = new College('princeton', s/10, s/11.5, loadImage('assets/princeton.png'));
	dartmouth = new College('dartmouth', s/10.25, s/10, loadImage('assets/dartmouth.webp'));
	yale = new College('yale', s/13.25, s/7.5, loadImage('assets/yale.png'));
	stanford = new College('stanford', s/8, s/8, loadImage('assets/stanford.webp'));
	unc = new College('unc', s/12, s/8.2, loadImage('assets/unc chapel hill.png'));
	wellesley = new College('wellesley', s/15.7, s/10, loadImage('assets/wellesley.png'));
	tufts = new College('tufts', s/10, s/10, loadImage('assets/tufts.png'));
	barnard = new College('barnard', s/12, s/9, loadImage('assets/barnard.png'));
	colby = new College('colby', s/10, s/10, loadImage('assets/colby (1) (1).png'));
	caltech = new College('caltech', s/10, s/10, loadImage('assets/caltech.png'));
	brown = new College('brown', s*0.0965, s*0.07, loadImage('assets/brown.gif'));
	upenn = new College('upenn', s*0.042, s*0.15, loadImage('assets/upenn.png'));
	cornell = new College('cornell', s*0.1, s*0.1, loadImage('assets/cornell.png'));
	johnshopkins = new College('johnshopkins', s*0.093, s*0.1, loadImage('assets/jhu.png'));
	collegeList = [johnshopkins, cornell, brown, upenn, tufts, caltech, barnard, colby, mit, columbia, uchicago, harvard, princeton, dartmouth, yale, stanford, unc, wellesley].sort(compare);
}