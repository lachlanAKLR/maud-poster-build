export default function BackGround404() {
  return (
    <div className="flex flex-col md:flex-row gap-2.5 md:gap-5 bg-black h-dvh md:h-screen w-screen ">
      <div className="h-1/3 md:h-full bg-maud-grey w-full md:w-1/3 flex justify-center relative">
        <div className="bg-black w-2.5 md:w-5 h-2/5"></div>
        <div className=" bg-black w-1/2 h-2/5 absolute bottom-0 left-0"></div>
      </div>
      <div className="h-1/3 md:h-full bg-maud-grey w-full md:w-1/3 flex justify-center items-center relative">
        <div className="bg-black w-2.5 md:w-5 h-3/5"></div>
      </div>
      <div className="h-1/3 md:h-full bg-maud-grey w-full md:w-1/3 flex justify-center relative">
        <div className="bg-black w-2.5 md:w-5 h-2/5"></div>
        <div className=" bg-black w-1/2 h-2/5 absolute bottom-0 left-0"></div>
      </div>
    </div>
  );
}
