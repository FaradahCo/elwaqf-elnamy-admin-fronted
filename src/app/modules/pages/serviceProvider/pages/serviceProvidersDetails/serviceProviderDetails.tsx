import { useParams } from "react-router";
import ActionHeader from "./components/actionsHeader/actionHeader";
import { GetProviderData } from "./serviceProviderService";
import { useApiQuery } from "@shared/services/api";
import MainInformation from "./components/mainInformations/mainInformation";
import PrimaryEntityData from "./components/primaryEntityData/PrimaryEntityData";
import NationalAddress from "./components/nationalAddress/nationalAddress";
import Attachements from "./components/attachements/attachements";

const ServiceProviderDetails = () => {
  const { id } = useParams();
  const { data: providerData } = useApiQuery(
    ["provider-data", Number(id)],
    () => GetProviderData(Number(id)),
    {
      enabled: !!id,
      retry: false,
    },
  );

  return (
    <div>
      <ActionHeader providerData={providerData!} />
      <MainInformation />
      <PrimaryEntityData />
      <NationalAddress />
      <Attachements />
    </div>
  );
};

export default ServiceProviderDetails;
