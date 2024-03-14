import FaqComment from '../FaqComment/FaqComment';

const FaqComments = ({ comments }) => {
  return (
    <div>
      {comments.length > 0 ? (
        <div>
          {comments?.map((c) => (
            <FaqComment
              key={c.id}
              correo={c.correo_electronico}
              comentario={c.comentario}
              fecha={c.fecha_creacion}
            />
          ))}
        </div>
      ) : (
        <span className='text-center text-tuscany-950 font-semibold text-[1em]'>
          Esta FAQ aún no tiene comentarios...
        </span>
      )}
    </div>
  );
};

export default FaqComments;
