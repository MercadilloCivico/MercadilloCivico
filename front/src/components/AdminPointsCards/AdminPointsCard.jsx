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
  inventario,
  proveedores,
}) {
  const navigate = useNavigate();
  function goToDetail() {
    navigate(`/admin/point/detail/${id}`);
  }
  return (
    <>
      <div
        className={
          'flex bg-pearl-bush-100 transition hover:bg-tuscany-100 cursor-pointer text-tuscany-950 overflow-hidden rounded-xl outline outline-[1px] outline-solid outline-tuscany-600 ' +
          className
        }
        onClick={goToDetail}>
        <div className='w-[125px] h-[125px] flex-shrink-0 relative'>
          <img src={image} className='w-full h-full  object-cover'></img>
        </div>

        <div className='text-left flex flex-col w-full'>
          <div className='flex xsm:flex-col sm:flex-row justify-between w-full bg'>
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
            {contact_email && contact_email.length > 0 && (
              <span className='text-tuscany-800 opacity-70 text-sm sm:text-[15px] mx-2'>
                {contact_email}
              </span>
            )}
            <span className='text-tuscany-800 opacity-70 text-sm sm:text-[15px] mx-2'>
              {contact_tel}
            </span>
          </div>

          <div className='bg-tuscany-200 mt-auto rounded-tr-xl py-1'>
            <ul className='px-2 sm:block xsm:hidden'>
              <li>
                {!inventario || inventario.length < 1 ? '0' : inventario.length} productos en
                inventario
              </li>
              <li>{proveedores} proveedores</li>
            </ul>

            <ul className='px-2 hidden xsm:block sm:hidden '>
              <li>Productos: {!inventario || inventario.length < 1 ? '0' : inventario.length}</li>
              <li>Proveedores: {proveedores}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
