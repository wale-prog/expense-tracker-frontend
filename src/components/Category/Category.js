import { useSelector } from "react-redux";



const Category = (props) => {
  
  
  const categoryApi = useSelector(state => state.category);
  console.log(categoryApi)

return (
  <>
    <select>
      <option>Car</option>
    </select>
  </>
)
}

export default Category;