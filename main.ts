function move_forward(distance: number) {
    basic.showIcon(IconNames.Asleep)
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 1)
    basic.pause(distance * ms_per_cm)
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    basic.clearScreen()
}

serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function on_data_received() {
    
    msg = serial.readString()
    if (msg == "F5") {
        move_forward(5)
    } else if (msg == "F10") {
        move_forward(10)
    } else if (msg == "S") {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.showIcon(IconNames.No)
    }
    
})
let msg = ""
let ms_per_cm = 0
ms_per_cm = 100
basic.showString("GO")
