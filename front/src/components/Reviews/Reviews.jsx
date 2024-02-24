import { useState, useEffect } from 'react';
import Review from '../Review/Review';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const review1 = {
      id: 1,
      user: 'Usuario1',
      calificacion: 4,
      tituloComentario: 'Excelente producto',
      comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: { total: 10, isActive: false },
      dislikes: { total: 2, isActive: false },
      fecha: '2024-01-04',
    };

    const review2 = {
      id: 2,
      user: 'Usuario2',
      calificacion: 3,
      tituloComentario: 'Bueno pero puede mejorar',
      comentario:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      likes: { total: 5, isActive: false },
      dislikes: { total: 3, isActive: false },
      fecha: '2024-01-05',
    };

    const review3 = {
      id: 3,
      user: 'Usuario3',
      calificacion: 5,
      tituloComentario: 'Increíble servicio al cliente',
      comentario: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      likes: { total: 15, isActive: false },
      dislikes: { total: 1, isActive: false },
      fecha: '2024-01-06',
    };

    setReviews([review1, review2, review3]);
  }, []);

  const handleLike = (id) => {
    setReviews((prevReviews) => {
      const updatedReviews = [...prevReviews];
      const index = updatedReviews.findIndex((review) => review.id === id);

      if (index !== -1) {
        const newLikes =
          updatedReviews[index].likes.total + (updatedReviews[index].likes.isActive ? -1 : 1);

        updatedReviews[index] = {
          ...updatedReviews[index],
          likes: {
            total: newLikes,
            isActive: !updatedReviews[index].likes.isActive,
          },
          dislikes: {
            total:
              updatedReviews[index].dislikes.total - (updatedReviews[index].likes.isActive ? 1 : 0),
            isActive: false,
          },
        };
      }

      return updatedReviews;
    });
  };

  const handleDislike = (id) => {
    setReviews((prevReviews) => {
      const updatedReviews = [...prevReviews];
      const index = updatedReviews.findIndex((review) => review.id === id);

      if (index !== -1) {
        const newDislikes =
          updatedReviews[index].dislikes.total + (updatedReviews[index].dislikes.isActive ? -1 : 1);

        updatedReviews[index] = {
          ...updatedReviews[index],
          dislikes: {
            total: newDislikes,
            isActive: !updatedReviews[index].dislikes.isActive,
          },
          likes: {
            total:
              updatedReviews[index].likes.total - (updatedReviews[index].dislikes.isActive ? 1 : 0),
            isActive: false,
          },
        };
      }

      return updatedReviews;
    });
  };

  return (
    <div>
      <hr className='border-tuscany-950' />
      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          onLike={() => handleLike(review.id)}
          onDislike={() => handleDislike(review.id)}
        />
      ))}
    </div>
  );
};

export default Reviews;
