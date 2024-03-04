import AdminCardList from '../Card/AdminCardList';
import AdminGridCard from '../Card/AdminGridCard';
import CardsBar from '../CardsBar/CardsBar';
import { useSelector } from 'react-redux';

function AdminCards() {
  const { showListCard } = useSelector((state) => state.admin);

  const products = [
    {
      id: 1,
      name: 'Plátano con nombre extremadamente largo que supera el límite de caracteres establecido',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 100,
      stock: 45,
      price: 100,
    },
    {
      id: 2,
      name: 'Pera',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 59,
      stock: 45,
      price: 140,
    },
    {
      id: 3,
      name: 'Limon',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: true,
      sales: 30,
      stock: 21,
      price: 70,
    },
    {
      id: 4,
      name: 'Plátano con nombre extremadamente largo que supera el límite de caracteres establecido',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 100,
      stock: 45,
      price: 100,
    },
    {
      id: 5,
      name: 'Pera',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 59,
      stock: 45,
      price: 140,
    },
    {
      id: 6,
      name: 'Limon',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: true,
      sales: 30,
      stock: 21,
      price: 70,
    },
    {
      id: 7,
      name: 'Plátano con nombre extremadamente largo que supera el límite de caracteres establecido',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 100,
      stock: 45,
      price: 100,
    },
    {
      id: 8,
      name: 'Pera',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 59,
      stock: 45,
      price: 140,
    },
    {
      id: 9,
      name: 'Limon',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: true,
      sales: 30,
      stock: 21,
      price: 70,
    },
    {
      id: 10,
      name: 'Plátano con nombre extremadamente largo que supera el límite de caracteres establecido',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 100,
      stock: 45,
      price: 100,
    },
    {
      id: 11,
      name: 'Pera',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 59,
      stock: 45,
      price: 140,
    },
    {
      id: 12,
      name: 'Limon',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: true,
      sales: 30,
      stock: 21,
      price: 70,
    },
    {
      id: 13,
      name: 'Plátano con nombre extremadamente largo que supera el límite de caracteres establecido',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 100,
      stock: 45,
      price: 100,
    },
    {
      id: 14,
      name: 'Pera',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: false,
      sales: 59,
      stock: 45,
      price: 140,
    },
    {
      id: 15,
      name: 'Limon',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      category: 'Frutas',
      disabled: true,
      sales: 30,
      stock: 21,
      price: 70,
    },
  ];

  return (
    <div className='py-3 flex justify-center flex-wrap space-between xsm:px-0 sm:px-10 max-w-[1366px] mx-auto'>
      {!showListCard ? (
        <div className='max-h-[55vh] overflow-y-auto'>
          <CardsBar />
          <div className='flex flex-col'>
            {products.map((product) => (
              <AdminCardList key={product.id} {...product} />
            ))}
          </div>
        </div>
      ) : (
        <div className='max-h-[55vh] overflow-y-auto'>
          <div className='flex flex-wrap justify-center items-center'>
            {products.map((product) => (
              <AdminGridCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCards;
