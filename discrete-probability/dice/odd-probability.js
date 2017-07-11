// Discrete Probability
// This is to show that you can add probabilities, eg: add the probability of  events of rolling an odd number.

console.log('What are the chances of rolling an odd number?')
console.log('P(odd) = 1 / eventsN * eventsOddN')

const possibleOddEvents = 3  // (odd sides)
const possibleEvents = 6  // (sides)

const oddProbability = 1 / possibleEvents * possibleOddEvents
const eventProbability = 1 / possibleEvents

const Table = require('cli-table')

const oddTable = new Table({
	head: ['Side', 'P(e)']
})

oddTable.push(
	[1, eventProbability],
	[3, eventProbability],
	[5, eventProbability],
	['Total', oddProbability]
)

console.log(oddTable.toString())

const sides = 6

const rollDice = () => {
	return Math.floor(Math.random() * sides) + 1
}

class Six {
	constructor() {
		this['1'] = 0
		this['2'] = 0
		this['3'] = 0
		this['4'] = 0
		this['5'] = 0
		this['6'] = 0
	}
}

class Set {
	constructor(timesToRoll) {
		this.timesToRoll = timesToRoll
		this.rolls = new Six()
		this.odds = 0
		this.evens = 0
	}

	roll() {
		for (let i = 0; i < this.timesToRoll; i += 1) {
			const side = rollDice()
			this.rolls[side] += 1

			if (side % 2 === 0) {
				this.evens += 1
			} else {
				this.odds += 1
			}
		}
	}

	calculate() {
		console.log(`Roll Count: ${this.timesToRoll}`)

		this.rollTable = new Table({
			head: ['Odd', 'Even']
		})

		this.rollTable.push(
			[this.odds, this.evens],
			[
				1 / this.timesToRoll * this.odds,
				1 / this.timesToRoll * this.evens
			]
		)


		console.log(this.rollTable.toString())

		return this
	}
}

const sets = [
	new Set(Math.pow(6, 9)),
]


sets.forEach(set => {
	set.roll()
	set.calculate()

})

console.log('Close enough!')
