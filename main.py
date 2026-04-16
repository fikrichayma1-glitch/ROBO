def move_forward(distance: number):
    # التصحيح النهائي: الاسم الصحيح هو ArrowNorth
    basic.show_icon(IconNames.HAPPY)
    # تشغيل المحركات (تأكد من توصيل الأسلاك في P0 و P1)
    pins.digital_write_pin(DigitalPin.P0, 1)
    pins.digital_write_pin(DigitalPin.P1, 1)
    # الانتظار حسب المسافة المطلوبة
    basic.pause(distance * ms_per_cm)
    # إيقاف المحركات
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.digital_write_pin(DigitalPin.P1, 0)
    basic.clear_screen()
# استقبال البيانات من الهاتف
# تفعيل الاستماع للبيانات

def on_data_received():
    global msg
    msg = serial.read_string()
    if msg == "F5":
        move_forward(5)
    elif msg == "F10":
        move_forward(10)
    elif msg == "S":
        # أيقونة الخطأ عند التوقف
        pins.digital_write_pin(DigitalPin.P0, 0)
        pins.digital_write_pin(DigitalPin.P1, 0)
        basic.show_icon(IconNames.NO)
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

msg = ""
ms_per_cm = 0
# إعدادات المعايرة: كم ميلي ثانية لكل 1 سم؟
ms_per_cm = 100
# عرض كلمة GO عند بدء التشغيل
basic.show_string("GO")