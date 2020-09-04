 // Tesla Model Y vs Ford Mustang Mustang Mach E


const RaceTrack = function(cars, circumference, laps) {
 		this.cars = cars;
 		this.laps = laps;
 		this.raceDistance = circumference;
		this.winner = null;


	RaceTrack.prototype.race = function() {

		const calculateFinishTime = (distance, acc, maxSpeed, carRange, reCharge) => {
				let totalFinishTime = 0;
				const cycles = distance/carRange;
				const distanceToMax = ((maxSpeed * maxSpeed) / (2 * acc)) / 1000;
				const timeToMax = (maxSpeed / acc) / 3600;
				// add total recharge time
				let rechargeTime = Math.floor(cycles) * reCharge;
				totalFinishTime = totalFinishTime + rechargeTime;

				const calcRaceDuration = (dpc, cycles, accDist, accTime, maxSp) => {
					let cyclesRemaining = cycles;
					let totalTime = 0;

					while (cyclesRemaining >= 1) {
						const totalAccTime = 2 * accTime;
						const totalAccDist = 2 * accDist;
						const maxVDist = dpc - totalAccDist;
						const maxVTime = maxVDist / maxSp;
						const timePerLap = maxVTime + totalAccTime;
						totalTime = totalTime + timePerLap;
						cyclesRemaining--;
					}

					if (cyclesRemaining > 0) {
						const maxVDist = (dpc * cyclesRemaining);
						const maxVTime = maxVDist / maxSp;
						const remainingTime = accTime + maxVTime;
						totalTime = totalTime + remainingTime;
					}
					return totalTime;
			};
			//add time to travel the length of the race
			totalFinishTime = totalFinishTime + calcRaceDuration(carRange, cycles, distanceToMax, timeToMax, maxSpeed);
			return totalFinishTime;
	};

		return this.cars.map((car) => {
			const time = calculateFinishTime(this.raceDistance, car.acceleration, car.topSpeed, car.range, car.recharge);

			return [car, `${time} hrs`];
			});
	};
};

 const Car = function(make, model, acceleration, topSpeed, range, recharge) {
 	this.make = make;
 	this.model = model;
 	this.acceleration = acceleration;
 	this.topSpeed = topSpeed;
 	this.range = range;
 	this.recharge = recharge;
 };


//values are in metric (km, W, hours)
const MachE = new Car('Ford', "MachE", 24.3, 179, 482, 0.55);
const ModelY = new Car('Tesla', "ModelY", 27.7, 217, 468, 0.33);

const FastTrack = new RaceTrack([MachE, ModelY], 500, 2);

console.log(FastTrack.race());