import classes from './Modal.module.css'
const Modal = ({
  title,
  children,
  firstButtonTitle,
  firstButtonHandler,
  secondButtonTitle,
  secondButtonHandler,
  closeButtonHandler,
  containerWidth,
}) => {
  return (
    <div
      className="flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-auto fixed inset-0 z-50 outline-none focus:outline-none"
      // onClick={closeButtonHandler}
    >
      <div
        className={`bg-white text-start mt-9 rounded-2xl shadow-lg w-full md:w-${
          containerWidth ? containerWidth : '3/5'
        }`}
      >
        <div className="flex sticky top-0 justify-between px-8 py-4 border-b border-gray-300">
          <div className="text-xl font-semibold mt-4">{title}</div>
          <div>
            <button type="button" onClick={closeButtonHandler}>
              <img
                src="../../../../assets/icon/cross.png"
                alt=""
                className={`w-4 h-4 mr-2 bold ${classes.close}`}
              ></img>
            </button>
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-28 max-h-screen overflow-y-auto overflow-x-hidden"
          
        >
          {children}
        </div>

        <div className="py-4 px-[50px] border-t border-gray-300 text-gray-600 mb-0">
          <div className="flex justify-between item-center w-auto">
            <button
              className={`${classes.btn} flex justify-center items-center bg-white border-2 border-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 w-1/2 rounded-md mr-5`}
              type="button"
              onClick={firstButtonHandler}
            >
              <span className="text-lg font-semibold py-2">
                {firstButtonTitle}
              </span>
            </button>

            <button
              className={`${classes.btn} flex justify-center items-center bg-white border-2 border-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 w-1/2 rounded-md`}
              onClick={secondButtonHandler}
            >
              <span className="text-lg font-semibold py-2">
                {secondButtonTitle}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
