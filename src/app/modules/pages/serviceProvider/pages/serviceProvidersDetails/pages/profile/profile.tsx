import { useOutletContext } from "react-router";
import Attachements from "../../components/attachements/attachements";
import MainInformation from "../../components/mainInformations/mainInformation";
import NationalAddress from "../../components/nationalAddress/nationalAddress";
import PrimaryEntityData from "../../components/primaryEntityData/PrimaryEntityData";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";

const Profile = () => {
  const providerData = useOutletContext<Provider>();
  return (
    <div className="mt-4">
      <MainInformation providerData={providerData!} />
      <PrimaryEntityData providerData={providerData!} />
      <NationalAddress providerData={providerData!} />
      <Attachements attachements={providerData?.profile?.[0]?.media || {}} />
    </div>
  );
};

export default Profile;
