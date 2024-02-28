import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FaqBar = ({ faqs }) => {
  const questions = faqs[0].faqs.slice(0, 3);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [questions.length]);

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  return (
    <div className='mx-2 flex items-center justify-between p-1 bg-pearl-bush-300 rounded-md'>
      <button
        className='p-1 mx-1 text-tuscany-950 flex items-center justify-center bg-pearl-bush-200 hover:bg-pearl-bush-400 shadow-md border-none rounded-full cursor-pointer'
        onClick={handlePrevQuestion}>
        <FiChevronLeft />
      </button>
      <div className='flex-1 mx-1 text-start'>
        <Link to={`/faqs/detail/${questions[currentQuestionIndex].id}`}>
          <p className='text-[.6em] sm:text-[.7em] md:text-[.9em] text-tuscany-800 hover:text-tuscany-950 font-semibold cursor-pointer mb-2'>
            {questions[currentQuestionIndex].pregunta}
          </p>
        </Link>
      </div>
      <button
        className='p-1 mx-1 text-tuscany-950 flex items-center justify-center bg-pearl-bush-200 hover:bg-pearl-bush-400 shadow-md border-none rounded-full cursor-pointer'
        onClick={handleNextQuestion}>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default FaqBar;
