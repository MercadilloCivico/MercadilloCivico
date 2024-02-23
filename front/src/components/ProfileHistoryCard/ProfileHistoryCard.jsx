export default function ProfileHistoryCard({ lazyImg, img, name, price, amount, date }) {
  // Recibe por props: img, name, price, amount, date y eventualmente recibirá el id de producto
  // lazyImg será un downscale de la img real, se mostrará de fondo mientras carga la imágen real

  console.log(img);
  return (
    <div className='max-w-[650px] h-[100px] bg-pearl-bush-100 text-tuscany-950 rounded-xl overflow-hidden m-2 shadow-md shadow-[#00000030]'>
      <div className='flex h-full'>
        <div
          style={{ backgroundImage: `url(${lazyImg})`, backgroundPosition: 'center' }}
          className='h-[100px] w-[100px] flex-shrink-0'>
          <img className='w-full h-full object-cover' src={img} alt={name} title={name}></img>
        </div>
        <div className='bg-pearl-bush-100 w-full h-full flex-shrink relative'>
          <div className='flex justify-between px-2 items-end'>
            <span className='line-clamp-1 text-left'>{name}</span>
            <span className='text-xl ml-1'>x{amount}</span>
          </div>

          <div className='flex justify-between px-2 items-end'>
            <span className='line-clamp-1 text-left'>Precio total</span>
            <span className='text-2xl ml-1 font-semibold'>${price}</span>
          </div>

          <div className='align-baseline text-sm absolute mx-auto left-0 right-0 bottom-0 bg-tuscany-300'>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
