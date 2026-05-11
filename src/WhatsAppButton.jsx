import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // تأكد بلي مكتبة react-icons مسطاليا

const WhatsAppButton = () => {
  // حط النمرة ديالك هنا (بالكود ديال المغرب +212 بلا زيروات)
  const phoneNumber = '212645924411'; // بدل هادي بنمرتك
  const message = 'مرحباً، بغيت نستفسر على كراء سيارة.'; // الميساج اللي كيتكتب أوتوماتيك

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default WhatsAppButton;