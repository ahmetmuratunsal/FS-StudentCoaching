const error = (status, message) => {
  // bir err nesnesi oluşturalım
  const err = new Error();
  console.log("🔥🔥Hata Meydana Geldi🔥🔥");
  console.log(err);
  // hata nesnesini güncelleyelim
  err.message = message;
  err.status = status;

  return err;
};

export default error;
