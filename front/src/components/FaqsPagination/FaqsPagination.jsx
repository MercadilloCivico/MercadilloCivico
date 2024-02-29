import { Link } from 'react-router-dom';

const FaqsPagination = ({ currentPage, totalPages, category }) => {
  const getPageLink = (page) =>
    page <= 0 || page > totalPages ? null : `/faqs/${encodeURIComponent(category)}/page/${page}`;

  return (
    <div className='flex  mt-4 mx-4'>
      <Link
        to={getPageLink(currentPage - 1)}
        className={`mx-2 p-1 rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 text-tuscany-800 hover:text-tuscany-950 ${currentPage <= 1 ? 'pointer-events-none font-bold bg-pearl-bush-300 text-tuscany-950' : ''}`}>
        Anterior
      </Link>

      {[...Array(Math.min(totalPages, 4))].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <Link
            key={pageNumber}
            to={getPageLink(pageNumber)}
            className={`mx-2 p-1 rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 text-tuscany-800 hover:text-tuscany-950 ${pageNumber === currentPage ? 'pointer-events-none font-bold bg-pearl-bush-300 text-tuscany-950' : ''}`}>
            {pageNumber}
          </Link>
        );
      })}

      <Link
        to={getPageLink(currentPage + 1)}
        className={`mx-2 p-1 rounded-md bg-pearl-bush-200 hover:bg-pearl-bush-300 text-tuscany-800 hover:text-tuscany-950 ${currentPage >= totalPages ? 'pointer-events-none font-bold bg-pearl-bush-300 text-tuscany-950' : ''}`}>
        Siguiente
      </Link>
    </div>
  );
};

export default FaqsPagination;
