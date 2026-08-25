const QrcodePage = () => {
  return (
    <div>
      <div className="text-primary text-3xl">QR Code</div> <div></div>
      <div className="mt-10 text-md">
        Use the ZEKA QR code to log in to your account on another device:
      </div>
      <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-4 px-8 py-10 border border-primary rounded-3xl w-full h-fit">
        <div className="flex justify-center items-center w-full">
          <img src="/images/qrcode.png" alt="" className="w-90 h-90" />
        </div>
      </div>
    </div>
  );
};
export default QrcodePage;
