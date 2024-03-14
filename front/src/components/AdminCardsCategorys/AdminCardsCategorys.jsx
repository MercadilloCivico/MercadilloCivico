import AdminCardCategory from '../AdminCardCategory/AdminCardCategory';
const AdminCardsCategorys = ({ categorias }) => {
  return (
    <div>
      {categorias.map((categoria) => (
        <AdminCardCategory
          key={categoria.id}
          categoria={categoria.categoria}
          icon={categoria.icon}
        />
      ))}
    </div>
  );
};

export default AdminCardsCategorys;
