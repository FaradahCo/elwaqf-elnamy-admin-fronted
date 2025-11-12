import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import { useApiQuery } from "@shared/services/api";
import { getWalletDashboard } from "./walletService";
import { Outlet } from "react-router";

const WalletLayout = () => {
  const { data: walletDashboard } = useApiQuery(
    ["wallet/dashboard"],
    () => getWalletDashboard(),
    {
      retry: false,
    }
  );
  return (
    <div className="py-10">
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title="الأرباح"
          icon="/images/wallet.svg"
          value={walletDashboard?.total_profits ?? 0}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="الرصيد المتاح"
          icon="/images/wallet_2.svg"
          value={walletDashboard?.available_balance ?? 0}
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="رصيد قيد السحب"
          icon="/images/wallet_3.svg"
          value={walletDashboard?.pending_balance ?? 0}
          classesName={[
            "border border-blue-dark bg-blue-light text-blue-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="الرصيد المعلق"
          icon="/images/wallet_4.svg"
          value={walletDashboard?.pending_balance ?? 0}
          classesName={[
            "border border-gray-dark bg-gray-light text-gray-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default WalletLayout;
