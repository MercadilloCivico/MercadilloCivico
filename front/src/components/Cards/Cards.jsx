import Card from '../Card/Card';

const products = [
  {
    id: 1,
    name: 'Manzana',
    supplier: 'Frutal',
    img: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
    price: 200,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Pera',
    supplier: 'Frutal',
    img: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
    price: 150,
    rating: 3.5,
  },
  {
    id: 3,
    name: 'Cereal',
    supplier: 'Maiz',
    img: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
    price: 500,
    rating: 2.5,
  },
  {
    id: 4,
    name: 'Chocolate',
    supplier: 'Chatarra',
    img: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
    price: 1000,
    rating: 1.3,
  },
  {
    id: 5,
    name: 'Manzana',
    supplier: 'Frutal',
    img: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
    price: 200,
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Pera',
    supplier: 'Frutal',
    img: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
    price: 150,
    rating: 3.5,
  },
  {
    id: 7,
    name: 'Cereal',
    supplier: 'Maiz',
    img: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
    price: 500,
    rating: 2.5,
  },
  {
    id: 8,
    name: 'Chocolate',
    supplier: 'Chatarra',
    img: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
    price: 1000,
    rating: 1.3,
  },
];

function Cards() {
  return (
    <div className='flex justify-center flex-wrap mt-20 space-between mx-auto'>
      {products?.map((product) => {
        return (
          <Card
            key={product.id}
            name={product.name}
            supplier={product.supplier}
            img={product.img}
            price={product.price}
            rating={product.rating}
          />
        );
      })}
    </div>
  );
}

export default Cards;
