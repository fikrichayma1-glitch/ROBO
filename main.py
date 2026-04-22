# 1. تعريف المتغيرات في البداية لتجنب أخطاء التعرّف (Binding)
msg = ""
ms_per_cm = 100
ms_per_degree = 15

def stop_robot():
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.digital_write_pin(DigitalPin.P1, 0)
    pins.digital_write_pin(DigitalPin.P2, 0)
    basic.clear_screen()

def move(direction: string, distance: number):
    if direction == "F": # للأمام
        basic.show_icon(IconNames.HAPPY) # تم التصحيح إلى NORTH
        pins.digital_write_pin(DigitalPin.P0, 1)
        pins.digital_write_pin(DigitalPin.P1, 1)
    elif direction == "B": # للخلف
        basic.show_icon(IconNames.TARGET) # تم التصحيح إلى SOUTH
        pins.digital_write_pin(DigitalPin.P2, 1)
    
    basic.pause(distance * ms_per_cm)
    stop_robot()

def turn(direction: string, angle: number):
    if direction == "R": # يمين
        basic.show_icon(IconNames.GHOST) # تم التصحيح إلى EAST
        pins.digital_write_pin(DigitalPin.P1, 1)
    elif direction == "L": # يسار
        basic.show_icon(IconNames.PITCHFORK) # تم التصحيح إلى WEST
        pins.digital_write_pin(DigitalPin.P0, 1)
    
    basic.pause(angle * ms_per_degree)
    stop_robot()

def on_data_received():
    global msg
    msg = serial.read_string().strip()
    if len(msg) > 0:
        command = msg[0].upper()
        if command == "S":
            stop_robot()
            basic.show_icon(IconNames.NO)
        elif len(msg) > 1:
            value = parse_float(msg[1:])
            if command == "F" or command == "B":
                move(command, value)
            elif command == "R" or command == "L":
                turn(command, value)

# ربط استقبال البيانات عبر السيريال/البلوتوث
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

# عرض رسالة البدء
stop_robot()
basic.show_string("GO")