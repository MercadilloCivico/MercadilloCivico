import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { FaUser } from 'react-icons/fa6';
// import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAsync } from '../../store/thunks/userThunks';
import { useEffect, useState } from 'react';
import Loading from '../../views/Loading/Loading';
import { deleteReviewAsyncThunk } from '../../store/thunks/productThunks';
import CreateReview from '../CreateReview/CreateReview';

const Review = ({
  review,
  isModalOpen,
  setModalOpen,
  productId,
  isOpenOnDetail,
  setIsOpenOnDetail,
}) => {
  const { id, usuario_id, calification, coment, fecha_creacion, fecha_actualizacion } = review;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const { items } = useSelector((state) => state.user);
  useEffect(() => {
    const userdata = async () => {
      try {
        if (usuario_id) {
          await dispatch(fetchUsersAsync());
          const user = items.filter((u) => u.id === usuario_id)[0];
          setUser(user);
          setIsLoading(false);
        } else {
          throw new Error('No se encuntra el usuario id');
        }
      } catch (error) {
        setIsLoading(false);
        alert(error);
      }
    };
    userdata();
  }, []);
  // const { total: likesTotal, isActive: likeActive } = likes;
  // const { total: dislikesTotal, isActive: dislikeActive } = dislikes;

  return (
    <div className='min-w-[100px] mx-auto my-2 bg-pearl-bush-100 shadow-md rounded-md'>
      {isLoading && !user ? (
        <Loading />
      ) : (
        <>
          <div className='flex justify-start items-center text-[.7em] md:text-[.9em] lg:text-[1.2em] pl-2 pt-2 text-tuscany-950'>
            {user && user.photo ? (
              <img src={user.photo} alt='' width={25} className='rounded-full' />
            ) : (
              <FaUser />
            )}
            <span className='mx-1 text-center'>{`${user && user.first_name ? user.first_name : ''} ${user && user.second_name ? user.second_name : ''} ${user && user.last_name ? user.last_name : ''}`}</span>
          </div>
          <div className='flex justify-start pl-2 items-center text-[.8em] md:text-[1em] lg:text-[1.15em] text-tuscany-950 my-1'>
            <Box component='fieldset' p={0} borderColor='transparent'>
              <Rating name='read-only' value={calification} readOnly size='small' />
            </Box>
          </div>
          <div className='flex justify-start pl-2 items-center text-tuscany-950 my-1 text-opacity-60'>
            <span className='text-[.6em] md:text-[.8em] lg:text-[1em]'>
              {!fecha_actualizacion
                ? `Publicada el: ${new Date(fecha_creacion).toLocaleString()}`
                : `Editada el: ${new Date(fecha_actualizacion).toLocaleString()}`}
            </span>
          </div>
          <div className='w-full bg-tuscany-300 rounded-md'>
            {coment !== 'Sin Comentario' ? (
              <div className='flex flex-col text-start p-2'>
                <span className='text-tuscany-950 text-[.7em] md:text-[.9em] lg:text-[1.2em] font-semibold pb-1'>
                  {coment}
                </span>
                {/* <p className='text-tuscany-900 text-[.6em] md:text-[.7em] lg:text-[.9em]'>{coment}</p> */}
              </div>
            ) : (
              ''
            )}
            <hr className='mx-2 border-tuscany-950' />
            <div className='flex p-2 justify-between items-center'>
              {/* <div className='flex'>
              <button
                onClick={onLike}
                className={`${
                  likeActive ? 'text-tuscany-700' : 'text-tuscany-950'
                } p-1 border-none rounded-md cursor-pointer bg-pearl-bush-100 hover:bg-pearl-bush-300 flex items-center mx-1`}>
                {likeActive ? <BiSolidLike /> : <BiLike />}
                <span className='ml-1'>{likesTotal > 0 && likesTotal}</span>
              </button>
              <button
                onClick={onDislike}
                className={`${
                  dislikeActive ? 'text-tuscany-700' : 'text-tuscany-950'
                } p-1 cursor-pointer mx-[.3em] bg-pearl-bush-100 hover:bg-pearl-bush-300 border-none rounded-md flex items-center`}>
                {dislikeActive ? <BiSolidDislike /> : <BiDislike />}
                <span className='ml-1'>{dislikesTotal > 0 && dislikesTotal}</span>
              </button>
            </div> */}
              <div>
                <button className='p-1 mx-[.3em] flex items-center text-tuscany-950 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-300 cursor-pointer'>
                  Reportar
                </button>
              </div>
              <div className='flex p-1 right-0'>
                <button className='p-1 mx-[.3em] flex items-center text-tuscany-950 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-300 cursor-pointer'>
                  <MdEdit
                    onClick={() => {
                      setModalOpen(true);
                      setIsOpenOnDetail(false);
                    }}
                  />
                </button>
                <CreateReview
                  productId={productId}
                  id={id}
                  isModalOpen={isModalOpen}
                  setModalOpen={setModalOpen}
                  isOpenOnDetail={isOpenOnDetail}
                />
                <button className='p-1 mx-[.3em] flex items-center text-tuscany-950 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-300 cursor-pointer'>
                  <MdDeleteOutline onClick={() => dispatch(deleteReviewAsyncThunk(id))} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
