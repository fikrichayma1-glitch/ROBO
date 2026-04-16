def move_forward(distance: number):
    basic.show_icon(IconNames.ASLEEP)
    pins.digital_write_pin(DigitalPin.P0, 1)
    pins.digital_write_pin(DigitalPin.P1, 1)
    basic.pause(distance * ms_per_cm)
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.digital_write_pin(DigitalPin.P1, 0)
    basic.clear_screen()

def on_data_received():
    global msg
    msg = serial.read_string()
    if msg == "F5":
        move_forward(5)
    elif msg == "F10":
        move_forward(10)
    elif msg == "S":
        pins.digital_write_pin(DigitalPin.P0, 0)
        pins.digital_write_pin(DigitalPin.P1, 0)
        basic.show_icon(IconNames.NO)
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

msg = ""
ms_per_cm = 0
ms_per_cm = 100
basic.show_string("GO")