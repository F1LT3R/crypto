// Discrete Probability
// This is to show that probability normalizes as sample size increases.
// Eg: If you roll a dice 46,656 times, the probability you will roll a six is
// closer to 1/6 than if you roll a dice only 6 times.

const Table = require('cli-table')

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
		this.p = new Six()
		this.maxProbability = 0
		this.minProbability = 1
	}

	roll() {
		for (let i = 0; i < this.timesToRoll; i += 1) {
			const side = rollDice()
			this.rolls[side] += 1
		}
	}

	calculate() {
		console.log(`Roll Count: ${this.timesToRoll}`)

		this.rollTable = new Table({
			head: ['Side', 'P (Probable)', 'Roll Count', 'P (Actual)']
		})

		Reflect.ownKeys(this.rolls).forEach(side => {
			const sideCount = this.rolls[side]
			const p = (1 / this.timesToRoll * sideCount).toFixed(2)
			const r = this.timesToRoll / sides

			this.p[side] = p

			if (p > this.maxProbability) {
				this.maxProbability = Number(p)
			}

			if (p < this.minProbability) {
				this.minProbability = Number(p)
			}

			this.rollTable.push([
				side,
				`${r}/${this.timesToRoll}`,
				sideCount,
				p
			])
		})

		console.log(this.rollTable.toString())

		return this
	}
}

const maxPTable = new Table({
	head: ['Roll Count', 'Min P', 'Max P', 'P Range (error)']
})

const sets = [
	new Set(Math.pow(6, 1)),
	new Set(Math.pow(6, 2)),
	new Set(Math.pow(6, 4)),
	new Set(Math.pow(6, 8))
]


sets.forEach(set => {
	set.roll()
	set.calculate()

	maxPTable.push([
		set.timesToRoll,
		set.minProbability.toFixed(2),
		set.maxProbability.toFixed(2),
		(set.maxProbability - set.minProbability).toFixed(2)
	])
})

console.log('Rolling a dice 6 times gives you a 1/6 probability that 1 will be rolled. But the margin of error between probability and actual result is greater with a smaller sample size.')
console.log(maxPTable.toString())
