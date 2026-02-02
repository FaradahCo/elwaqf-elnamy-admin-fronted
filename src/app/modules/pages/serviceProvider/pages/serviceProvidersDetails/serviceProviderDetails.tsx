import { useParams } from "react-router";
import ActionHeader from "./components/actionsHeader/actionHeader";
import { GetProviderData } from "./serviceProviderService";
import { useApiQuery } from "@shared/services/api";
import MainInformation from "./components/mainInformations/mainInformation";
import PrimaryEntityData from "./components/primaryEntityData/PrimaryEntityData";
import NationalAddress from "./components/nationalAddress/nationalAddress";
import Attachements from "./components/attachements/attachements";
import { Spin } from "antd";
import { ServiceStatusEnum } from "@shared/services/sharedService";
import StatisticsData from "./components/statisticsData/statisticsData";

const ServiceProviderDetails = () => {
  const { id } = useParams();
  const { data: providerData, isLoading } = useApiQuery(
    ["provider-data", Number(id)],
    () => GetProviderData(Number(id)),
    {
      enabled: !!id,
      retry: false,
    },
  );

  return (
    <div>
      {isLoading ? (
        <div className="flex item-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {providerData?.status !== ServiceStatusEnum.review && (
            <StatisticsData />
          )}
          <ActionHeader providerData={providerData!} />
          <MainInformation providerData={providerData!} />
          <PrimaryEntityData providerData={providerData!} />
          <NationalAddress providerData={providerData!} />
          <Attachements
            attachements={providerData?.profile?.[0]?.media || {}}
          />
        </>
      )}
    </div>
  );
};

export default ServiceProviderDetails;
