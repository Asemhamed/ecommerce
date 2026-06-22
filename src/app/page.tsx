
import Products from './(platform)/products/page';
import CategorySlider from './_components/CategorySlider/CategorySlider';
import HomeBanner from './_components/HomeBanner/HomeBanner';
import MianSlider from './_components/MainSlider/MianSlider';
import PageWrapper from '@/components/shared/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <MianSlider />
      <HomeBanner/>
      <CategorySlider/>
      <Products/>
    </PageWrapper>
  )
}
