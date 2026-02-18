import { useState } from "react";

const useOpenedHook = () => {
  const [isOpen, setIsOpen] = useState(true);
  return { isOpen, setIsOpen };
};

export default useOpenedHook;
