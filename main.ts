function stop_robot () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
    basic.clearScreen()
}
function turn (direction: string, angle: number) {
    if (direction == "R") {
        // يمين
        basic.showIcon(IconNames.Ghost)
        // تم التصحيح إلى EAST
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else if (direction == "L") {
        // يسار
        basic.showIcon(IconNames.Pitchfork)
        // تم التصحيح إلى WEST
        pins.digitalWritePin(DigitalPin.P0, 1)
    }
    basic.pause(angle * ms_per_degree)
    stop_robot()
}
// ربط استقبال البيانات عبر السيريال/البلوتوث
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let command: string;
let value: number;
msg = _py.py_string_strip(serial.readString())
if (msg.length > 0) {
        command = _py.py_string_upper(msg[0])
if (command == "S") {
            stop_robot()
            basic.showIcon(IconNames.No)
        } else if (msg.length > 1) {
            value = parseFloat(msg.slice(1))
            if (command == "F" || command == "B") {
                move(command, value)
            } else if (command == "R" || command == "L") {
                turn(command, value)
            }
        }
    }
})
function move (direction: string, distance: number) {
    if (direction == "F") {
        // للأمام
        basic.showIcon(IconNames.Happy)
        // تم التصحيح إلى NORTH
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else if (direction == "B") {
        // للخلف
        basic.showIcon(IconNames.Target)
        // تم التصحيح إلى SOUTH
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
    basic.pause(distance * ms_per_cm)
    stop_robot()
}
let ms_per_degree = 0
let ms_per_cm = 0
// 1. تعريف المتغيرات في البداية لتجنب أخطاء التعرّف (Binding)
let msg = ""
ms_per_cm = 100
ms_per_degree = 15
// عرض رسالة البدء
stop_robot()
basic.showString("GO")
