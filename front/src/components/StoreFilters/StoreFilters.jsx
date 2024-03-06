import FilterMenu from './FilterMenu';

import { useState } from 'react';

import { LuFilter } from 'react-icons/lu';
import FilterTags from './FilterTags';

export default function StoreFilters({ className }) {
  const [activeFilterMenu, setActiveFilterMenu] = useState(false);

  function toggleFilterMenu() {
    setActiveFilterMenu(!activeFilterMenu);
  }

  return (
    <div className={'flex flex-col items-center ' + className}>
      <div className='flex flex-nowrap items-center w-full max-w-[600px] my-1 pl-1 pr-2 '>
        <button
          className='mr-1 ml-1 md:hidden flex-shrink-0 border-none bg-tuscany-600 shadow-sm w-[40px] h-[40px] text-tuscany-100 rounded-xl cursor-pointer hover:bg-tuscany-700 active:bg-tuscany-800 transition'
          onClick={() => {
            setActiveFilterMenu(!activeFilterMenu);
          }}>
          <LuFilter className='w-full h-full p-2' />
        </button>

        <FilterTags
          tagMargin='mr-1'
          className='md:hidden mr-auto grid grid-flow-col auto-cols-max overflow-auto rounded-xl '
        />

        {/* <CustomButton
              className='max-w-max'
              onClick={() => {
                  dispatch(resetFilters());
              }}
              text='X'
          /> */}
      </div>

      {activeFilterMenu && (
        <FilterMenu
          expanded={false}
          toggleFilterMenu={toggleFilterMenu}
          activeFilterMenu={activeFilterMenu}
          className='md:hidden max-w-[430px] left-0  top-[55px]'
        />
      )}
    </div>
  );
}
