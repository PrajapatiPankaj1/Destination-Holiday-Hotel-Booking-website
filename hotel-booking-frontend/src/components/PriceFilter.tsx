type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2"> Max Price (Per Night)</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {/* FIXED: Changed to realistic Indian Rupee price points with currency prefix */}
        {[1000, 2000, 3000, 5000, 8000, 10000, 15000].map((price) => (
          <option key={price} value={price}>₹{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;