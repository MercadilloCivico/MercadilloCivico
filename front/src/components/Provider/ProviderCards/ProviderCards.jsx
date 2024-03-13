import ProviderCard from '../ProviderCard/ProviderCard';

const ProviderCards = ({ providers }) => {
  return (
    <div className='w-full max-w-[1280px] mx-auto p-4 mt-5 flex flex-wrap justify-around items-center'>
      {providers?.map((user) => (
        <ProviderCard
          key={user.userInfo.id}
          id={user.id}
          img={user.userInfo.photo}
          name={user.name_prov}
          email={user.userInfo.email}
          rol={user.userInfo.rol}
          disabled={user.userInfo.disabled}
          userInfo={user.userInfo}
        />
      ))}
    </div>
  );
};

export default ProviderCards;
