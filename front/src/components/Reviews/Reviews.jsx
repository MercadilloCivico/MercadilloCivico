import Review from '../Review/Review';

const Reviews = ({
  reviews,
  isModalOpen,
  productId,
  setModalOpen,
  isOpenOnDetail,
  setIsOpenOnDetail,
}) => {
  // const handleLike = (id) => {
  //   setReviews((prevReviews) => {
  //     const updatedReviews = [...prevReviews];
  //     const index = updatedReviews.findIndex((review) => review.id === id);

  //     if (index !== -1) {
  //       const newLikes =
  //         updatedReviews[index].likes.total + (updatedReviews[index].likes.isActive ? -1 : 1);

  //       updatedReviews[index] = {
  //         ...updatedReviews[index],
  //         likes: {
  //           total: newLikes,
  //           isActive: !updatedReviews[index].likes.isActive,
  //         },
  //         dislikes: {
  //           total:
  //             updatedReviews[index].dislikes.total - (updatedReviews[index].likes.isActive ? 1 : 0),
  //           isActive: false,
  //         },
  //       };
  //     }

  //     return updatedReviews;
  //   });
  // };

  // const handleDislike = (id) => {
  //   setReviews((prevReviews) => {
  //     const updatedReviews = [...prevReviews];
  //     const index = updatedReviews.findIndex((review) => review.id === id);

  //     if (index !== -1) {
  //       const newDislikes =
  //         updatedReviews[index].dislikes.total + (updatedReviews[index].dislikes.isActive ? -1 : 1);

  //       updatedReviews[index] = {
  //         ...updatedReviews[index],
  //         dislikes: {
  //           total: newDislikes,
  //           isActive: !updatedReviews[index].dislikes.isActive,
  //         },
  //         likes: {
  //           total:
  //             updatedReviews[index].likes.total - (updatedReviews[index].dislikes.isActive ? 1 : 0),
  //           isActive: false,
  //         },
  //       };
  //     }

  //     return updatedReviews;
  //   });
  // };

  return (
    <div>
      <hr className='border-tuscany-950' />
      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          productId={productId}
          isOpenOnDetail={isOpenOnDetail}
          setIsOpenOnDetail={setIsOpenOnDetail}
          // onLike={() => handleLike(review.id)}
          // onDislike={() => handleDislike(review.id)}
        />
      ))}
    </div>
  );
};

export default Reviews;
