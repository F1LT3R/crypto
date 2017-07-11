const text = 'this is a test'

const key = {
	a: 'd',
	b: 'e',
	c: 'f',
	d: 'g',
	e: 'h',
	f: 'i',
	g: 'j',
	h: 'k',
	i: 'l',
	j: 'm',
	k: 'n',
	l: 'o',
	m: 'p',
	n: 'q',
	o: 'r',
	p: 's',
	q: 't',
	r: 'u',
	s: 'v',
	t: 'w',
	u: 'x',
	v: 'y',
	w: 'z',
	x: 'a',
	y: 'b',
	z: 'c',
	' ': ' '
}

const cypher = text => {
	return text.split('')
		.map(letter => key[letter])
		.join('')
}

const encrypted = cypher(text)

console.log(encrypted)