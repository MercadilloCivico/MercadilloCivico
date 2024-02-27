import Card from '../Card/Card';
import DropdownCard from '../DropdownCard/DropdownCard';
import Switch from '../Switch/Switch';
import { useState, useEffect } from 'react';

function Cards({ products, setProducts }) {
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

  const [isDropdownView, setIsDropdownView] = useState(() => {
    const storedState = localStorage.getItem('isDropdownView');
    return storedState ? JSON.parse(storedState) : false;
  });

  useEffect(() => {
    localStorage.setItem('isDropdownView', JSON.stringify(isDropdownView));
  }, [isDropdownView]);

  const toggleView = () => {
    setIsDropdownView(!isDropdownView);
  };

  return (
    <div>
      <Switch ischecked={isDropdownView} toggleView={toggleView} />
      <div className='py-3 flex justify-center flex-wrap space-between xsm:px-0 sm:px-10 max-w-[1280px] mx-auto'>
        {products?.map((product) =>
          isDropdownView ? (
            <DropdownCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.precio}
              img={product.image}
              description={product.description}
              rating={product.calification}
              agregarProducto={() => agregarProducto(product.id)}
              quitarProducto={() => quitarProducto(product.id)}
              className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
            />
          ) : (
            <Card
              key={product.id}
              id={product.id}
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
          )
        )}
      </div>
    </div>
  );
}

export default Cards;
