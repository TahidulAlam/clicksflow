import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SidebarToggleButton = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className={`fixed bottom-0 -ml-3 cursor-pointer transition-all duration-300 bg-blue-950 text-white ${
        open
          ? "rounded-b-xl w-72 p-5 -ml-5 flex justify-between items-center"
          : "w-12 p-4 rounded-xl mb-2 flex justify-center items-center"
      }`}
    >
      {open ? (
        <>
          <FaArrowLeft />
          <span>CLICKSFLOW</span>
        </>
      ) : (
        <FaArrowRight />
      )}
    </div>
  );
};

export default SidebarToggleButton;
