import { useEffect, useState } from "react";

type ModalAuthProp = {
  isVisible: boolean;
  duration: number;
  msg: string;
};

const ModalAuth = ({ msg, isVisible, duration }: ModalAuthProp) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-red-500 text-white p-4 rounded-md shadow-lg">
        {msg}
      </div>
    </div>
  );
};

export default ModalAuth;
