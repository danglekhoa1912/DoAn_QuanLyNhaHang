import Cash from "../../../assets/icons/Cash.svg";
import Momo from "../../../assets/icons/Momo.svg";

export const type_pay = {
   Cash: {
      id: 1,
      icon: <Cash width={50} height={50} />,
      type: "cash",
      name: "Tiền mặt",
   },
   Momo: {
      id: 2,
      icon: <Momo width={50} height={50} />,
      type: "momo",
      name: "Momo",
   },
};
