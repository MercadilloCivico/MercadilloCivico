import { useSelector, useDispatch } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { setFilterMarca, setFilterPrecio } from '../../store/slices/cardsSlice';

export default function FilterTags({ className, tagMargin }) {
  const { filters } = useSelector((state) => state.card);
  const dispatch = useDispatch();

  let i = 0;

  function getPriceText() {
    if (filters.filtroPrecio !== '') return `Precios ${filters.filtroPrecio}s`;
    else return '';
  }

  function handleRemove(key) {
    if (key === 'filtroPrecio') {
      dispatch(setFilterPrecio(''));
    }

    if (key === 'filtroMarca') {
      dispatch(setFilterMarca(''));
    }
  }

  const tagList = [
    {
      filtroMarca: filters.filtroMarca,
    },
    {
      filtroPrecio: getPriceText(),
    },
  ];

  // console.log(Object.values(tagList[0])[0])

  return (
    <div
      className={'overflow-hidden hover:overflow-auto ' + className}
      style={{ scrollbarWidth: 'thin' }}>
      {tagList.map(
        (tag) =>
          Object.values(tag)[0] !== '' && (
            <div
              key={i++}
              onClick={() => {
                handleRemove(Object.keys(tag)[0]);
              }}
              className={`cursor-pointer max-w-max hover:bg-tuscany-700 transition bg-tuscany-600 min-h-[40px] px-2 flex items-center rounded-xl ${tagMargin}`}>
              <span style={{ verticalAlign: 'middle' }} className='m-0 p-0 text-lg leading-none'>
                {Object.values(tag)[0]}
              </span>

              <RxCross1 className='w-5 h-5 text-lg ml-2 mt-[2px]' />
            </div>
          )
      )}
    </div>
  );
}
