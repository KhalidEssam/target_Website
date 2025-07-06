import { useSelector, useDispatch } from 'react-redux';
import { getTotalQuantity, toggleCartDrawer } from '../store/features/cartSlice';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const CartIcon = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector(getTotalQuantity);
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate("/services/Supplies")
    dispatch(toggleCartDrawer()); // this toggles the drawer open/close
  };

  return (
    <span className="btn m-2 badge bg-primary" onClick={handleClick}>
      <FaShoppingCart /> {totalItems}
    </span>
  );
};
