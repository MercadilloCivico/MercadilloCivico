import ProviderCard from '../ProviderCard/ProviderCard';

const ProviderCards = ({ providers }) => {
  return (
    <div className='w-full p-4 mt-5 flex flex-wrap justify-center sm:justify-between items-center'>
      {providers?.map((user) => (
        <ProviderCard
          key={user.userInfo.id}
          id={user.userInfo.id}
          name={user.name_prov}
          userInfo={user.userInfo}
          email={user.userInfo.email}
          img={user.userInfo.photo}
          rol={user.userInfo.rol}
          disabled={user.userInfo.disabled}
        />
      ))}
    </div>
  );
};

export default ProviderCards;
