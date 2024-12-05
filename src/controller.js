export class PIDController {
    constructor(Kp, Ki, Kd, dt = 1) {
        this.Kp = Kp;
        this.Ki = Ki;
        this.Kd = Kd;
        this.dt = dt;

        this.previousError = 0;
        this.integral = 0;
    }

    calculate(inputValue, actualValue) {
        const error = inputValue - actualValue;
        this.integral += error * this.dt;
        const derivative = (error - this.previousError) / this.dt;

        const output = (this.Kp * error) + (this.Ki * this.integral) + (this.Kd * derivative);
        this.previousError = error;

        return output;
    }
}
