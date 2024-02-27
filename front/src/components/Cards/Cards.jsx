import UserCard from '../Card/UserCard';
import AdminCard from '../Card/AdminCard.jsx';
import DropdownCard from '../DropdownCard/DropdownCard.jsx';
import { useSelector } from 'react-redux';

function Cards({ products, setProducts, cardType }) {
  const agregarProducto = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, cantidad: product.cantidad + 1 } : product
    );
    setProducts(updatedProducts);
  };

  const quitarProducto = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, cantidad: product.cantidad - 1 } : product
    );
    setProducts(updatedProducts);
  };

  const { showDropdownCard } = useSelector((state) => state.store);

  return (
    <div className='py-3 flex justify-center flex-wrap space-between xsm:px-0 sm:px-10 max-w-[1366px] mx-auto'>
      {showDropdownCard && cardType !== 'Admin'
        ? products?.map((product) => (
            <DropdownCard
              key={product.id}
              name={product.name}
              supplier={product.brand}
              img={product.image}
              price={product.precio}
              rating={product.calification}
              stock={15}
              cantidad={1}
              agregarProducto={() => agregarProducto(product.id)}
              quitarProducto={() => quitarProducto(product.id)}
              className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
            />
          ))
        : cardType === 'Admin'
          ? products?.map((product) => (
              <AdminCard
                key={product.id}
                name={product.name}
                supplier={product.brand}
                img={product.image}
                price={product.precio}
                rating={product.calification}
                stock={15}
                cantidad={1}
                agregarProducto={() => agregarProducto(product.id)}
                quitarProducto={() => quitarProducto(product.id)}
                className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
              />
            ))
          : products?.map((product) => (
              <UserCard
                key={product.id}
                name={product.name}
                supplier={product.brand}
                img={product.image}
                price={product.precio}
                rating={product.calification}
                stock={15}
                cantidad={1}
                agregarProducto={() => agregarProducto(product.id)}
                quitarProducto={() => quitarProducto(product.id)}
                className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
              />
            ))}
    </div>
  );
}

export default Cards;
