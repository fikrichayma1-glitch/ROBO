function move_forward(distance: number) {
    //  التصحيح النهائي: الاسم الصحيح هو ArrowNorth
    basic.showIcon(IconNames.Happy)
    //  تشغيل المحركات (تأكد من توصيل الأسلاك في P0 و P1)
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 1)
    //  الانتظار حسب المسافة المطلوبة
    basic.pause(distance * ms_per_cm)
    //  إيقاف المحركات
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    basic.clearScreen()
}

//  استقبال البيانات من الهاتف
//  تفعيل الاستماع للبيانات
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function on_data_received() {
    
    msg = serial.readString()
    if (msg == "F5") {
        move_forward(5)
    } else if (msg == "F10") {
        move_forward(10)
    } else if (msg == "S") {
        //  أيقونة الخطأ عند التوقف
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.showIcon(IconNames.No)
    }
    
})
let msg = ""
let ms_per_cm = 0
//  إعدادات المعايرة: كم ميلي ثانية لكل 1 سم؟
ms_per_cm = 100
//  عرض كلمة GO عند بدء التشغيل
basic.showString("GO")
