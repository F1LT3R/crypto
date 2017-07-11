const fs = require('fs')
const chalk = require('chalk')

const text = fs.readFileSync('genesis.txt').toString()

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

const probabilityOfLetterE = text => {
	let eCount = 0

	text.split('').forEach(letter => {
		if (letter === 'e') {
			eCount += 1
		}
	})

	return 1 / text.length * eCount
}

const pe = probabilityOfLetterE(text)

// Based on text we are encrypting
console.log(`Probability of letter "e": ${pe}`)

const encrypted = cypher(text)

console.log(text.substr(0, 80))
console.log(encrypted.substr(0, 80))

// Shortcut for the sake of convenience, in real life
// I would not have the unencrypted text to know the
// probability of E, but P("E") is 0.12 (12%) in
// standard English language. In ye olde biblical
// text of Genesis, it seems to be more like 10%.

const countLetters = encrypted => {
	const count = {}

	encrypted.split('').forEach(letter => {
		if (!count[letter]) {
			count[letter] = 1
		} else {
			count[letter] += 1
		}
	})

	return count
}

const count = countLetters(encrypted)
console.log(count)

const normalizeCount = count => {
	const countNorm = {}

	for (letter in count) {
		const val = count[letter]
		countNorm[letter] =  1 / text.length * val
	}

	return countNorm
}

console.log(`(Probability of letter "e": ${pe})`)

const countNorm = normalizeCount(count)

console.log(countNorm)

const mostProbableE = (countNorm, pe) => {
	let lowMargin = 1
	let likelyToBeE = ''

	for (letter in countNorm) {
		const prob = countNorm[letter]

		const margin = Math.abs(prob - pe)

		if (margin <= lowMargin) {
			lowMargin = margin
			likelyToBeE = letter
		}
	}


	return likelyToBeE
}

const likelyToBeE = mostProbableE(countNorm, pe)
console.log(`Most probable letter to be "e" is "${likelyToBeE}"`)


const charHighlight = (text, letterToColor) => {
	return text.substr(0, 80).split('').map(letter => {
		if (letter === letterToColor) {
			return chalk.bgGreen.black.bold(letter)
		}

		return letter
	}).join('')
}

console.log(charHighlight(text.substr(0, 80), 'e'))
console.log(charHighlight(encrypted.substr(0, 80), likelyToBeE))

console.log(chalk.red('Now that we have cracked E, the rest is cake!'))

