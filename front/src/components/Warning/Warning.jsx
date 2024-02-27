export default function Warning({ titleText, buttonText, className }) {
  return (
    <div className={' ' + className}>
      <span>{titleText}</span>
      <button>{buttonText}</button>
    </div>
  );
}
