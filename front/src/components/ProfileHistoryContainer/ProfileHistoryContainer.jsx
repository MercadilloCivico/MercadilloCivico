import { useDispatch } from 'react-redux';
import ProfileHistoryCard from '../ProfileHistoryCard/ProfileHistoryCard';
import { useEffect, useState } from 'react';
import { fetchUserProfileAsync } from '../../store/thunks/profileThunks';
import { createToast } from '../../store/slices/toastSlice';
import { LuArchive } from 'react-icons/lu';

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
        dispatch(createToast('Error cargando información de usuario'));
      }
    };
    fetchCompras();
  }, [dispatch]);
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
      {info.length < 0 ? (
        info.map((item) => {
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
        })
      ) : (
        <p className='text-tuscany-950 flex items-center justify-center mx-auto text-lg mt-12'>
          <LuArchive className='flex items-center h-5 w-5 mr-1' /> No has hecho ninguna compra aún.
        </p>
      )}
    </div>
  );
}
