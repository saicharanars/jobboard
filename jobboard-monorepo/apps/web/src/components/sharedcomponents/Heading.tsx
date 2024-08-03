interface heading {
  text: string;
  bluetext: string;
}
const Heading: React.FC<heading> = ({ text: text, bluetext: bluetext }) => {
  return (
    <>
      <h1 className="sm:text-2xl md:text-4xl font-bold mb-4">
        <span className="text-black">{text} </span>
        <span className="text-blue-500">{bluetext}</span>
      </h1>
    </>
  );
};

export default Heading;
