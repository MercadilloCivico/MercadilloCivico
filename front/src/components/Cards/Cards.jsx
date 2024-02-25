import Card from '../Card/Card';

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

  return (
    <div className='py-3 flex justify-center flex-wrap space-between xsm:px-0 sm:px-10 max-w-[1280px] mx-auto'>
      {products?.map((product) => (
        <Card
          key={product.id}
          name={product.name}
          supplier={product.supplier}
          img={product.img}
          price={product.price}
          rating={product.rating}
          stock={product.stock}
          cantidad={product.cantidad}
          agregarProducto={() => agregarProducto(product.id)}
          quitarProducto={() => quitarProducto(product.id)}
          className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
        />
      ))}
    </div>
  );
}

export default Cards;
