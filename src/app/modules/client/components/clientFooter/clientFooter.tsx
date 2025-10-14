const ClientFooter = () => {
  return (
    <div className="bg-second-primary text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* First Column - Logo and Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/images/Group.svg" alt="Group Logo" className="mb-4 h-16" />
          <div className="flex gap-4">
            <img
              src="/images/twitter.svg"
              alt="Twitter"
              className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <img
              src="/images/whatsapp.svg"
              alt="WhatsApp"
              className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <img
              src="/images/mail.svg"
              alt="Mail"
              className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <img
              src="/images/youtube.svg"
              alt="YouTube"
              className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>

        {/* Second Column - عن المنصة */}
        <div>
          <h3 className="text-lg font-semibold mb-4">عن المنصة</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <img
                src="/images/link-arrow.svg"
                alt="Arrow"
                className="h-4 w-4"
              />
              <span>من نحن</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <img
                src="/images/link-arrow.svg"
                alt="Arrow"
                className="h-4 w-4"
              />
              <span>مكتبة الوقف</span>
            </li>
          </ul>
        </div>

        {/* Third Column - روابط مهمة */}
        <div>
          <h3 className="text-lg font-semibold mb-4">روابط مهمة</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <img
                src="/images/link-arrow.svg"
                alt="Arrow"
                className="h-4 w-4"
              />
              <span>الاستشارة</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <img
                src="/images/link-arrow.svg"
                alt="Arrow"
                className="h-4 w-4"
              />
              <span>الخدمات</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <img
                src="/images/link-arrow.svg"
                alt="Arrow"
                className="h-4 w-4"
              />
              <span>الباقات</span>
            </li>
          </ul>
        </div>

        {/* Fourth Column - المساعدة والدعم */}
        <div>
          <h3 className="text-lg font-semibold mb-4">المساعدة والدعم</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <img
                src="/images/link-arrow.svg"
                alt="Arrow"
                className="h-4 w-4"
              />
              <span>اتصل بنا</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
              <img
                src="/images/link-arrow.svg"
                alt="Arrow"
                className="h-4 w-4"
              />
              <span>الأسئلة الشائعة</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientFooter;