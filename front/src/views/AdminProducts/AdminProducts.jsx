import { Link } from 'react-router-dom';
import AdminSearchBar from '../../components/AdminSearchBar/AdminSearchBar';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
// import CardsBar from '../../components/CardsBar/CardsBar';
// import AdminCardList from '../../components/Card/AdminCardList';
import AdminGridCard from '../../components/AdminGridCard/AdminGridCard';
// import Cards from '../../components/Cards/Cards';

/**
 * 320px: 6 caracteres...
 * 640px: 13 caracteres...
 * 768px: 13 caracteres...
 * 1024px: 15 caracteres...
 * 1280px: 20 caracteres...
 * 1536: 24 caracteres...
 *2000px: 39 caracteres...
 2560px: 50 caracteres...
 */

const AdminProducts = () => {
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
    <div className='mx-2 mt-1'>
      <CustomBreadcrumbs />
      <AdminSearchBar />
      {/**
       * 
      <div className='mt-2 max-h-[60vh] overflow-y-auto'>
        <CardsBar />
        <div className='flex flex-col'>
          {products.map((product) => (
            <AdminCardList key={product.id} {...product} />
          ))}
        </div>
      </div>
       */}
      {/**
      <div>
        <Cards cardType='Admin' products={products} />
      </div>
       */}
      <div className='flex flex-wrap justify-center items-center'>
        {products.map((product) => (
          <AdminGridCard key={product.id} {...product} />
        ))}
      </div>
      <div className='flex justify-end mt-2'>
        <Link to='/admin/products/create'>
          <CustomButton text='Crear un producto' />
        </Link>
      </div>
    </div>
  );
};

export default AdminProducts;
