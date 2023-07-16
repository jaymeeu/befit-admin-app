import { HiMenuAlt3 } from 'react-icons/hi'
import blakskill from '../../assets/pushup.jpeg'
import icon from '../../assets/pushup.jpeg'
import Links from './Links';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';

const SideBar = ({ showNav, setShowNav, isMobile }) => {
  //   const router = useRouter();

  const navigation = useNavigate()

  const location = useLocation()

  return (
    <div className={` z-20 fixed top-0 left-0 h-full overflow-scroll bg-white shadow-sm ease-in-out duration-300 ${showNav ? "w-64" : "w-32"}`}>
      <div className="flex justify-center mt-10 mb-10 items-center gap-6">
        <HiMenuAlt3
          className="h-6 w-6 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
        <div onClick={()=>navigation('/overview')} className="cursor-pointer">
        {
          showNav ?
            <img
              className="w-12 h-auto"
              src={blakskill}
              alt="company logo"
            />
            :
            <img
              className="w-6 h-auto"
              src={icon}
              alt="company icon"
            />
        }
        </div>
      </div>

      <div className="flex flex-col pb-10">
        <Links showNav={showNav} path={location.pathname} />
      </div>
    </div>
  );
};

export default SideBar;