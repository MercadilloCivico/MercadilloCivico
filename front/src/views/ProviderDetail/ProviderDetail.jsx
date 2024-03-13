import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
import { deleteProvider, fetchProvidersAsync } from '../../store/thunks/providerThunks'; // Importa el thunk para obtener la información del proveedor
import { useParams, useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton';
import Modal from '../../components/Modal/Modal';
import { createToast } from '../../store/slices/toastSlice';
import Bg from '../../assets/img/bg.jpg';
import style from '../Login/login.module.css';
import Loading from '../Loading/Loading';
import { IoIosArrowBack } from 'react-icons/io';
const ProviderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { providerArray } = useSelector((state) => state.providers);
  const [ubicacionArray, setUbicacionArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { payload } = await dispatch(fetchProvidersAsync(id));
        const userResponse = await dispatch(fetchUsersAsync(payload.user_id));
        setUserInfo(userResponse.payload);
        setUbicacionArray(payload.ubicacion.split('-'));
      } catch (error) {
        console.log('soy un error no me deverias estar viendo', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const openModal = () => {
    setModalOpen(true);
  };
  const handleDelete = async () => {
    try {
      await dispatch(deleteProvider({ pid: providerArray.id, userId: userInfo.id }));

      dispatch(createToast(`El usuario ${providerArray.name_prov} ha sido eliminado con éxito!`));
      setModalOpen(false);
      setIsLoading(false);
      navigate('/admin/provider');
    } catch (error) {
      dispatch(
        createToast(
          `Error al eliminar el usuario ${providerArray.name_prov}, por favor intente nuevamente.`
        )
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='flex flex-col justify-center mx-auto max-w-[600px] min-w-[300px]'>
          <div
            style={{
              backgroundImage: `url(${Bg})`,
              filter: 'blur(15px)',
              transform: 'scaleX(1.1)',
            }}
            className={
              'w-full h-[100svh] fixed left-0 top-10 bg-cover z-[-2] ' + style.bgAnim
            }></div>

          <div className='bg-pearl-bush-200 flex flex-col items-center my-5 rounded-lg p-4 shadow-hippie-green-950 shadow-2xl'>
            <ul className='flex items-center space-x-4'>
              <li>
                <IoIosArrowBack
                  className='cursor-pointer w-[25px] h-[25px] text-tuscany-950 text-start mb-1 '
                  onClick={() => {
                    navigate(-1);
                  }}
                />
              </li>
              <li>
                <h3 className='text-tuscany-950 font-bold mb-3'>Informacion del Proveedor</h3>
              </li>
            </ul>
            <img src={userInfo.photo} alt='User Avatar' className='w-[200px] rounded-full' />
            <div className='flex flex-col items-center justify-start w-[300px] '>
              <ul className='text-start'>
                <li className='my-3'>
                  <label className='text-tuscany-950 my-3'>
                    <strong>Nombre:</strong> {userInfo.first_name}{' '}
                    {userInfo.second_name &&
                      (userInfo.second_name.toLowerCase() === 'null' || !userInfo.second_name
                        ? ''
                        : userInfo.second_name)}{' '}
                    {userInfo.last_name}
                  </label>
                </li>
                <li>
                  <label className='text-tuscany-950'>
                    <strong>Correo: </strong> {userInfo.email}
                  </label>
                </li>
                <li className='my-3'>
                  <label className='text-tuscany-950 my-3'>
                    <strong>Rol:</strong> {userInfo.rol}
                  </label>
                </li>
                <li>
                  <label className='text-tuscany-950'>
                    <strong>Empresa: </strong> {providerArray.name_prov}
                  </label>
                </li>
                <li className='my-3'>
                  <label className='text-tuscany-950 my-3'>
                    <strong>Departamento: </strong> {ubicacionArray[0]}
                  </label>
                </li>
                <li>
                  <label className='text-tuscany-950 '>
                    <strong>Municipio: </strong> {ubicacionArray[1]}
                  </label>
                </li>
                <li className='my-3'>
                  <label className='text-tuscany-950 my-3'>
                    <strong>Ubicacion: </strong> {ubicacionArray[2]}
                  </label>
                </li>
                <li>
                  <label className='text-tuscany-950 '>
                    <strong> Telefono: </strong> {providerArray.tel}
                  </label>
                </li>
              </ul>
              <a
                href={providerArray.certificadoBancario}
                target='_blank'
                className='transition bg-tuscany-600 text-pearl-bush-100 hover:bg-tuscany-700 focus:ring-2 focus:ring-tuscany-300 p-3 rounded-lg my-3'>
                Certificado Bancario
              </a>
              <a
                href={providerArray.camaraDeComercio}
                target='_blank'
                className='transition bg-tuscany-600 text-pearl-bush-100 hover:bg-tuscany-700 focus:ring-2 focus:ring-tuscany-300 p-3 rounded-lg '>
                Certificado de comercio
              </a>
            </div>
          </div>

          <div>
            <CustomButton
              text='Eliminar Proveedor'
              className='mb-6 w-[16em] hover:bg-crown-of-thorns-600'
              onClick={openModal}
            />
            <div>
              <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
                <div className='flex flex-col justify-center items-center'>
                  <span className='my-[4em] text-[.9em] md:text-[1.2em] lg:text-[1.5em] text-tuscany-950 font-semibold'>
                    ¿Estás seguro de que quieres eliminar a este usuario?
                  </span>
                  <div className='flex justify-between'>
                    <button
                      className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em]'
                      onClick={() => {
                        handleDelete();
                      }}>
                      Eliminar
                    </button>
                    <button
                      className='p-1 mx-[.2em] flex items-center text-tuscany-900 border-none rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 hover:text-tuscany-950 cursor-pointer text-[.9em] md:text-[1.2em] lg:text-[1.5em] '
                      onClick={() => {
                        setModalOpen(false);
                      }}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProviderDetail;
