const PackageDetails = ({ setEditStatus }) => {
  return (
    <div>
      packageDetails
      <button className="p-3 bg-blue-300" onClick={() => setEditStatus(true)}>
        Edit Package
      </button>
    </div>
  );
};

export default PackageDetails;
