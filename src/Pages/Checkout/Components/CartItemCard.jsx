import react from 'react';
import { Trash2 } from 'lucide-react';

const CartItemCard = ({ item, onQuantityChange, onRemove }) => {
  const { id, name, price, quantity, image } = item;

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-100 last:border-b-0 transition-shadow hover:shadow-sm rounded-lg">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/facc15/333?text=Woven"; }}
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 truncate">{name}</h3>
        <p className="text-sm text-gray-600">Price: ₱{price}</p>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button
          onClick={() => onQuantityChange(id, quantity - 1)}
          className="p-1.5 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
          aria-label={`Decrease quantity of ${name}`}
        >
          -
        </button>
        <span className="w-5 text-center font-medium">{quantity}</span>
        <button
          onClick={() => onQuantityChange(id, quantity + 1)}
          className="p-1.5 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
          aria-label={`Increase quantity of ${name}`}
        >
          +
        </button>
      </div>
      <div className="text-right flex-shrink-0 w-20">
        <p className="font-bold text-slate-800">₱{price * quantity}</p>
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-700 mt-1 p-1 rounded-full hover:bg-red-50 transition"
          aria-label={`Remove ${name} from cart`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;