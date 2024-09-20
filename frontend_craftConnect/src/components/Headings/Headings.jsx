function Headings({ heading, link }) {
  return (
    <div className="flex justify-between items-end pr-2 w-full">
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-white/90">
        {heading}
      </h1>
     
    </div>
  );
}

export default Headings;
