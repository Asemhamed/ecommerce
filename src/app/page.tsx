
import Products from './(platform)/products/page';
import CategorySlider from './_components/CategorySlider/CategorySlider';
import HomeBanner from './_components/HomeBanner/HomeBanner';
import MianSlider from './_components/MainSlider/MianSlider';
export default function Home() {
  return <>
      <MianSlider />
      <HomeBanner/>
      <CategorySlider/>
      <Products/>
  </>
}
