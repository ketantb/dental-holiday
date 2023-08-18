import { useState } from "react";
import PackageDetails from "../components/page-components/PackageDetails";
import EditPackageDetails from "../components/page-components/EditPackageDetails";

const ConfirmPackageDetails = () => {
  const [editStatus, setEditStatus] = useState(false);

  return (
    <div>
      {editStatus ? (
        <EditPackageDetails />
      ) : (
        <PackageDetails setEditStatus={setEditStatus} />
      )}
    </div>
  );
};
export default ConfirmPackageDetails;
