import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { FaUser } from 'react-icons/fa6';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from 'react-icons/bi';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';

const Review = () => {
  const [likes, setLikes] = useState(3);
  const [dislikes, setDislikes] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const handleLike = () => {
    if (!likeActive) {
      setLikes(likes + 1);
      setLikeActive(true);

      if (dislikeActive) {
        setDislikes(dislikes - 1);
        setDislikeActive(false);
      }
    } else {
      setLikes(likes - 1);
      setLikeActive(false);
    }
  };

  const handleDislike = () => {
    if (!dislikeActive) {
      setDislikes(dislikes + 1);
      setDislikeActive(true);

      if (likeActive) {
        setLikes(likes - 1);
        setLikeActive(false);
      }
    } else {
      setDislikes(dislikes - 1);
      setDislikeActive(false);
    }
  };

  return (
    <div className='min-w-[100px] mx-auto my-2 bg-pearl-bush-100 shadow-md rounded-md'>
      <div className='flex justify-start items-center text-[.7em] md:text-[.9em] lg:text-[1.2em] pl-2 pt-2 text-tuscany-950'>
        <FaUser />
        <span className='mx-1 text-center'>Usuario</span>
      </div>
      <div className='flex justify-start pl-2 items-center text-[.8em] md:text-[1em] lg:text-[1.15em] text-tuscany-950 my-1'>
        <span className='text-semibold mb-[.3em]'>4 Estrellas</span>
        <Box component='fieldset' p={0} borderColor='transparent'>
          <Rating name='read-only' value={4} readOnly size='small' />
        </Box>
      </div>
      <div className='flex justify-start pl-2 items-center text-tuscany-950 my-1 text-opacity-60'>
        <span className='text-[.6em] md:text-[.8em] lg:text-[1em]'>
          Fecha de reseña: 4 de enero de 2024
        </span>
      </div>
      <div className='w-full bg-tuscany-300 rounded-md'>
        <div className='flex flex-col text-start p-2'>
          <span className='text-tuscany-950 text-[.7em] md:text-[.9em] lg:text-[1.2em] font-semibold pb-1'>
            Comentario/Titulo
          </span>
          <p className='text-tuscany-900 text-[.6em] md:text-[.7em] lg:text-[.9em]'>
            Esta manzana es simplemente deliciosa! Su sabor jugoso y dulce me sorprendio desde el
            primer bocado. La frescura y la textura crujiente son inigualables. Definitivamente, una
            de las mejores manzanas que he probado. Recomiendo totalmente esta variedad para
            aquellos que buscan una experiencia frutal unica y deliciosa
          </p>
        </div>
        <hr className='mx-2 border-tuscany-950' />
        <div className='flex p-2 justify-between items-center'>
          <div className='flex'>
            <button
              onClick={handleLike}
              className={`${
                likeActive ? 'text-tuscany-700' : 'text-tuscany-950'
              } p-1 border-none rounded-md cursor-pointer bg-pearl-bush-100 hover:bg-pearl-bush-300 flex items-center mx-1`}>
              {likeActive ? <BiSolidLike /> : <BiLike />}
              <span className='ml-1'>{likes > 0 && likes}</span>
            </button>
            <button
              onClick={handleDislike}
              className={`${
                dislikeActive ? 'text-tuscany-700' : 'text-tuscany-950'
              } p-1 cursor-pointer mx-[.3em] bg-pearl-bush-100 hover:bg-pearl-bush-300 border-none rounded-md flex items-center`}>
              {dislikeActive ? <BiSolidDislike /> : <BiDislike />}
              <span className='ml-1'>{dislikes > 0 && dislikes}</span>
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
