import { useNavigate } from 'react-router-dom';

export default function AdminPointsCard({
  company_name,
  address,
  postal_code,
  contact_email,
  contact_tel,
  image,
  className,
  id,
}) {
  const navigate = useNavigate();

  function goToDetail() {
    navigate(`/point/detail/${id}`);
  }

  return (
    <>
      <div
        className={
          'flex bg-tuscany-100 text-tuscany-950 overflow-hidden rounded-xl outline outline-[1px] outline-solid outline-tuscany-600 ' +
          className
        }
        onClick={goToDetail}>
        <div className='w-[125px] h-[125px] flex-shrink-0'>
          <img src={image} className='w-full h-full  object-cover'></img>
        </div>

        <div className='text-left flex flex-col w-full'>
          <div className='flex xsm:flex-col sm:flex-row justify-between w-full'>
            <div className='flex flec-col'>
              <span className='text-tuscany-600 sm:hidden text-lg sm:text-xl font-semibold line-clamp-1 px-2'>
                {address}
              </span>
              <span className='text-tuscany-600 xsm:hidden sm:inline text-lg sm:text-xl font-semibold line-clamp-1 px-2'>
                {address} ({postal_code})
              </span>
            </div>

            <span className='xsm:hidden sm:inline text-tuscany-800 opacity-70 text-lg sm:text-xl font-semibold line-clamp-1 px-2'>
              {company_name}
            </span>
          </div>

          <div className='flex flex-wrap sm:mt-1'>
            <span className='text-tuscany-800 opacity-70 text-sm sm:text-[15px] mx-2'>
              {contact_email}
            </span>
            <span className='text-tuscany-800 opacity-70 text-sm sm:text-[15px] mx-2'>
              {contact_tel}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
