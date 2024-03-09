import { useDispatch } from 'react-redux';
import ProfileHistoryCard from '../ProfileHistoryCard/ProfileHistoryCard';
import { useEffect, useState } from 'react';
import { fetchUserProfileAsync } from '../../store/thunks/profileThunks';

export default function ProfileHistoryContainer() {
  // Debe recibir un array de objetos por props
  const [compras, setCompras] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const { payload } = await dispatch(fetchUserProfileAsync());
        setCompras(payload.compras);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompras();
  }, []);
  const info = compras.map((c) => {
    const info = c.info_compra.split('-');
    const objeto = {};
    info.forEach((part) => {
      const [clave, valor] = part.split(':');
      objeto[clave.trim() === 'Punto de Venta' ? 'PuntoDeVenta' : clave.trim()] = valor.trim();
    });
    return {
      date: new Date(c.fecha).toLocaleString(),
      id: c.id,
      ...objeto,
    };
  });

  return (
    <div className='max-w-[1280px] mx-auto flex flex-wrap justify-center mt-2 px-2'>
      {info.map((item) => {
        return (
          <ProfileHistoryCard
            key={item.id}
            name={item.PuntoDeVenta}
            compra={item.Compra}
            price={item.Total}
            date={item.date}
            className='mb-2'
          />
        );
      })}
    </div>
  );
}
