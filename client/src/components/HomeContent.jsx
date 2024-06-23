const HomeContent = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 my-10">
      <div>
        <img className="rounded-lg " src="/homeBanner.png" alt="homeBanner" />
      </div>
      <div className="w-[700px]">
        <h1 className="font-bold text-2xl mb-5">Sistemimize hoşgeldiniz.</h1>
        <p className="text-sm indent-5">
          Eğitim Koçluğu Nedir? Öğrenci koçluğu öğrenciler için ihtiyaç duyduğu
          alanlarda gerekli yönlendirmeleri yapan ve onları sınavlara etkili bir
          şekilde hazırlayan kişilere verilen addır. Öğrenci koçluğunda en
          önemli unsur öğrenci ve koçu arasındaki uyum ve işbirliğidir. Öğrenci
          koçunun genel olarak amacı öğrenciyi belirlemiş olduğu hedefleri
          konusunda başarıya ulaştırmak için doğru yönde yönlendirmektir. Ayrıca
          sıkıntı ya da stres altında olan öğrencilere gerekli motivasyonu
          sağlamaktadır. Bu sıkıntılı süreçte öğrencinin yaşadığı stres, sıkıntı
          ve bunalım durumları ile baş edebilmesi için yardımcı olmaktadır.
          Öğrenci koçu, öğrencisini geleceğe dair hedeflerine ulaşabilmesi için
          destekleyerek bunun için gerekli olan psikolojik desteği
          sağlamaktadır. Öğrencisinin eğitim alanında gösterdiği tüm emek ve
          gayreti olumlu sonuçlara bağlamak için çalışmaktadır. Öğrenci koçluğu
          öğrencisinin ihtiyaç duyduğu her konuda ona destek sağlamaktadır.
        </p>
      </div>
    </div>
  );
};

export default HomeContent;
