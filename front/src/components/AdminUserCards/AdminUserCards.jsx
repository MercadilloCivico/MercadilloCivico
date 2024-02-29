import usuarios from '../../views/AdminUsers/users';
import AdminUserCard from '../AdminUserCard/AdminUserCard';

const AdminUserCards = () => {
  return (
    <div className='w-full p-4 mt-5 flex flex-wrap justify-center sm:justify-between items-center'>
      {usuarios.map((user) => (
        <AdminUserCard
          key={user.id}
          id={user.id}
          name={user.first_name}
          lastName={user.last_name}
          img={user.photo}
          rol={user.rol}
          disabled={user.disabled}
        />
      ))}
    </div>
  );
};

export default AdminUserCards;
