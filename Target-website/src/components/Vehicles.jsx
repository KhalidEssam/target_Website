import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTractor } from "@fortawesome/free-solid-svg-icons";
import {
  faTruck,
  faTruckMonster,
  faTruckMoving,
  faTruckPickup,
  faTruckRampBox,
  faTableList,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { MdFrontLoader } from "react-icons/md";
import { GiForklift } from "react-icons/gi";
import { TbBulldozer } from "react-icons/tb";
import { GiBulldozer } from "react-icons/gi";
import { TbCarCrane } from "react-icons/tb";



const Vehicles = () => {


    const handleVehicleClick = (vehicle) => {
        // console.log(`Selected vehicle: ${vehicle}`);
      };
    return (
        <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="vehicleDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faEllipsisV} size="1x" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="vehicleDropdown">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Tractor")}
                    >
                      <FontAwesomeIcon icon={faTractor} size="2x" /> Tractor
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Truck Moving")}
                    >
                      <FontAwesomeIcon icon={faTruckMoving} size="2x" /> Truck
                      Moving
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Truck Monster")}
                    >
                      <FontAwesomeIcon icon={faTruckMonster} size="2x" /> Truck
                      Monster
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Truck Pickup")}
                    >
                      <FontAwesomeIcon icon={faTruckPickup} size="2x" /> Truck
                      Pickup
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Truck")}
                    >
                      <FontAwesomeIcon icon={faTruck} size="2x" /> Truck
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Truck Ramp Box")}
                    >
                      <FontAwesomeIcon icon={faTruckRampBox} size="2x" /> Truck
                      Ramp Box
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Table List")}
                    >
                      <FontAwesomeIcon icon={faTableList} size="2x" /> Table
                      List
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Front Loader")}
                    >
                      <MdFrontLoader size="50px" /> Front Loader
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Forklift")}
                    >
                      <GiForklift size="50px" /> Forklift
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Bulldozer")}
                    >
                      <TbBulldozer size="50px" /> Bulldozer
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Bulldozer 2")}
                    >
                      <GiBulldozer size="50px" /> Bulldozer 2
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleVehicleClick("Car Crane")}
                    >
                      <TbCarCrane size="50px" /> Car Crane
                    </a>
                  </li>
                </ul>
              </div>
    );
  };
  
  export default Vehicles;