import { useParams } from "react-router";
import { getProviderData } from "../../serviceProvidersServices";
import { useApiQuery } from "@shared/services/api";
import ActionHeader from "../serviceProvidersDetails/components/actionsHeader/actionHeader";
import { Spin } from "antd";
import MainInformation from "../serviceProvidersDetails/components/mainInformations/mainInformation";
import PrimaryEntityData from "../serviceProvidersDetails/components/primaryEntityData/PrimaryEntityData";
import NationalAddress from "../serviceProvidersDetails/components/nationalAddress/nationalAddress";
import Attachements from "../serviceProvidersDetails/components/attachements/attachements";

const ServiceProviderReview = () => {
  const { id } = useParams();
  const { data: providerData, isLoading } = useApiQuery(
    ["provider-data", Number(id)],
    () => getProviderData(Number(id)),
    {
      enabled: !!id,
      retry: false,
    },
  );

  return isLoading ? (
    <div className="flex item-center justify-center">
      <Spin size="large" />
    </div>
  ) : (
    <>
      <ActionHeader providerData={providerData!} />
      <MainInformation providerData={providerData!} />
      <PrimaryEntityData providerData={providerData!} />
      <NationalAddress providerData={providerData!} />
      <Attachements attachements={providerData?.profile?.[0]?.media || {}} />
    </>
  );
};

export default ServiceProviderReview;
