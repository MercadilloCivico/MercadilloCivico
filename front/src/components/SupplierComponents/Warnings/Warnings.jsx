import Warning from '../Warning/Warning.jsx';

export default function Warnings({ WarningList, className }) {
  let key = 0;

  return (
    <div className={'flex flex-wrap justify-center ' + className}>
      {WarningList.map((warningItem) => {
        return (
          <Warning
            key={key++}
            titleText={warningItem.text}
            buttonText={warningItem.action}
            className='mb-2 mx-2'
          />
        );
      })}
    </div>
  );
}
