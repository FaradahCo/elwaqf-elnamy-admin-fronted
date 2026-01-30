import { useParams } from "react-router";
import type { Wallet } from "../../../../alwaqfModel";
import { getAlWaqfWallet } from "../../../../alwaqfService";
import { useApiQuery } from "@shared/services/api";

const Wallet = () => {
  const { id } = useParams();
  const { data: wallet } = useApiQuery(
    ["alwaqfWallet"],
    () => getAlWaqfWallet(+id!),
    { retry: false },
  );
  return (
    <div className="px-4 bg-white rounded-md">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5 text-2xl">
          <h2>إجمالي المدفوعات</h2>
          <p className="text-second-primary text-4xl">
            {wallet?.total_transactions}
            <span className="inline-block">
              <img className="h-6 w-6" src="/images/SAR.svg" alt="ريال سعودي" />
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-5 text-2xl p-4">
          <h2>رصيد المحفظة</h2>
          <p className="text-second-primary text-4xl">
            {wallet?.available_balance}
            <span className="inline-block">
              <img className="h-6 w-6" src="/images/SAR.svg" alt="ريال سعودي" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Wallet;
