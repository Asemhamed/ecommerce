import { getAllCategories } from '@/serverAPIs/Categories';
import { category } from '@/Types/APIsType';
import Slider from '../Slider/Slider';



export default async function CategorySlider() {



    const allCategories= await getAllCategories();
    
    return<div className="w-full bg-gray-100 py-10">
            <Slider allCategories={allCategories}/>
        </div>
}
