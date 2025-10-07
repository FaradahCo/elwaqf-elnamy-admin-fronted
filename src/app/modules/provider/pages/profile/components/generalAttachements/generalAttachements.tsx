const GeneralAttachements = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-3 md:col-span-1">
          <label className="block mb-2 font-medium">
            الشهادة الضريبية للمنشأة
          </label>
          <div className="bg-gray-100 p-2 border border-gray-300 rounded-md mb-2 flex items-center justify-start gap-2">
            <img src="/images/pdf.svg" alt="Upload" />
            <span>الشهادة الضريبية للمنشأة.pdf</span>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1">
          <label className="block mb-2 font-medium">
            ملف العنوان الوطني للمنشأة
          </label>
          <div className="bg-gray-100 p-2 border border-gray-300 rounded-md mb-2 flex items-center justify-start gap-2">
            <img src="/images/pdf.svg" alt="Upload" />
            <span> العنوان الوطني.pdf</span>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1">
          <label className="block mb-2 font-medium">
            السجل التجاري للمنشأة
          </label>
          <div className="bg-gray-100 p-2 border border-gray-300 rounded-md mb-2 flex items-center justify-start gap-2">
            <img src="/images/pdf.svg" alt="Upload" />
            <span> السجل التجاري.pdf</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="col-span-3 md:col-span-1">
          <label className="block mb-2 font-medium">
            الشهادة البنكية للتوثيق
          </label>
          <div className="bg-gray-100 p-2 border border-gray-300 rounded-md mb-2 flex items-center justify-start gap-2">
            <img src="/images/pdf.svg" alt="Upload" />
            <span> الشهادة البنكية.pdf</span>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1">
          <label className="block mb-2 font-medium">
            الشهادة التسجيل في ضريبية القيمة المضافة للمنشأة
          </label>
          <div className="bg-gray-100 p-2 border border-gray-300 rounded-md mb-2 flex items-center justify-start gap-2">
            <img src="/images/pdf.svg" alt="Upload" />
            <span>ضريبة القيمة المضافة.pdf</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralAttachements;
