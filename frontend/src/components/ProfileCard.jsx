const ProfileCard = ({ fullname, sport, state, role }) => {
  return (
    <div className="my-4 bg-stone-200 shadow-lg rounded-2xl p-4 w-72 text-center border border-gray-200">
      <h2 className="text-xl font-bold mt-4">{fullname}</h2>
      <p className="text-gray-600">
        {sport} {role}
      </p>
      <p className="text-gray-500 text-sm">{state}</p>
    </div>
  );
};

export default ProfileCard;
