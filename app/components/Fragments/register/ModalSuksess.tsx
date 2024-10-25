type ModalSuksessProp = {
  msg: string;
  bgColor: string;
  status: string;
};

const ModalSuksess = ({ msg, bgColor, status }: ModalSuksessProp) => {
  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`${bgColor} text-white p-4 rounded-md shadow-lg flex items-center`}
      >
        {msg}
        {/* <button
          onClick={() => {
            setVisible(false); // Menyembunyikan modal
            onClose(); // Memanggil fungsi onClose untuk memberi tahu komponen induk
          }}
        >
          <Image
            src="/assets/login/close.png"
            alt="none"
            className="pl-3"
            width={35}
            height={35}
          />
        </button> */}
      </div>
    </div>
  );
};

export default ModalSuksess;
