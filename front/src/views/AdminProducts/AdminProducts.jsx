import Cards from '../../components/Cards/Cards';

const AdminProducts = ({ products }) => {
  return (
    <div>
      <div>Filtros</div>
      <div>
        <Cards products={products} />
      </div>
    </div>
  );
};

export default AdminProducts;