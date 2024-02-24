import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { FaUser } from 'react-icons/fa6';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';

const Review = ({ review, onLike, onDislike }) => {
  const { user, calificacion, tituloComentario, comentario, likes, dislikes, fecha } = review;
  const { total: likesTotal, isActive: likeActive } = likes;
  const { total: dislikesTotal, isActive: dislikeActive } = dislikes;

  return (
    <div className='min-w-[100px] mx-auto my-2 bg-pearl-bush-100 shadow-md rounded-md'>
      <div className='flex justify-start items-center text-[.7em] md:text-[.9em] lg:text-[1.2em] pl-2 pt-2 text-tuscany-950'>
        <FaUser />
        <span className='mx-1 text-center'>{user}</span>
      </div>
      <div className='flex justify-start pl-2 items-center text-[.8em] md:text-[1em] lg:text-[1.15em] text-tuscany-950 my-1'>
        <span className='text-semibold mb-[.3em]'>{calificacion} Estrellas</span>
        <Box component='fieldset' p={0} borderColor='transparent'>
          <Rating name='read-only' value={calificacion} readOnly size='small' />
        </Box>
      </div>
      <div className='flex justify-start pl-2 items-center text-tuscany-950 my-1 text-opacity-60'>
        <span className='text-[.6em] md:text-[.8em] lg:text-[1em]'>Fecha de reseña: {fecha}</span>
      </div>
      <div className='w-full bg-tuscany-300 rounded-md'>
        <div className='flex flex-col text-start p-2'>
          <span className='text-tuscany-950 text-[.7em] md:text-[.9em] lg:text-[1.2em] font-semibold pb-1'>
            {tituloComentario}
          </span>
          <p className='text-tuscany-900 text-[.6em] md:text-[.7em] lg:text-[.9em]'>{comentario}</p>
        </div>
        <hr className='mx-2 border-tuscany-950' />
        <div className='flex p-2 justify-between items-center'>
          <div className='flex'>
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
          </div>
          <div>
            <button className='p-1 mx-[.3em] flex items-center text-tuscany-950 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-300 cursor-pointer'>
              Reportar
            </button>
          </div>
          <div className='flex p-1 right-0'>
            <button className='p-1 mx-[.3em] flex items-center text-tuscany-950 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-300 cursor-pointer'>
              <MdEdit />
            </button>
            <button className='p-1 mx-[.3em] flex items-center text-tuscany-950 border-none rounded-md bg-pearl-bush-100 hover:bg-pearl-bush-300 cursor-pointer'>
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
