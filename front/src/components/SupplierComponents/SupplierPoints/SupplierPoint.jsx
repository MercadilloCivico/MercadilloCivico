export default function SupplierPoint({
  companyName,
  address,
  postalCode,
  contactEmail,
  contactTel,
  image,
  className,
}) {
  return (
    <div
      className={
        'flex bg-tuscany-100 text-tuscany-950 overflow-hidden rounded-xl outline outline-[1px] outline-solid outline-tuscany-600 ' +
        className
      }>
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
              {address} ({postalCode})
            </span>
          </div>

          <span className='xsm:hidden sm:inline text-tuscany-800 opacity-70 text-lg sm:text-xl font-semibold line-clamp-1 px-2'>
            {companyName}
          </span>
        </div>

        <div className='flex flex-wrap sm:mt-1'>
          <span className='text-tuscany-800 opacity-70 text-sm sm:text-[15px] mx-2'>
            {contactEmail}
          </span>
          <span className='text-tuscany-800 opacity-70 text-sm sm:text-[15px] mx-2'>
            {contactTel}
          </span>
        </div>
      </div>
    </div>
  );
}
