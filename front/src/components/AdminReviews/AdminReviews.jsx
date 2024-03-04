import AdminReview from '../AdminReview.jsx/AdminReview';

const AdminReviews = ({ reviews }) => {
  return (
    <div className='flex justify-center items-center max-h-[15] overflow-y-auto'>
      {reviews?.length > 0 ? (
        <div>
          <hr className='border-tuscany-950' />
          {reviews.map((review) => (
            <AdminReview key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center'>
          <span className='text-tuscany-950 font-semibold'>
            Este producto aun no tinene reseñas!
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
