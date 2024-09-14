import { Button } from '@mui/base/Button';

type Props = {}

const Hero = (props: Props) => {
  return (
    <section className='pt-20 w-full h-screen flex flex-col bg-hero-image bg-cover bg-no-repeat justify-center'>
      <div className='basis-1/2 lg:px-16 relative text-white max-w-[450px] md:max-w-[750px] lg:max-w-[850px] flex flex-col justify-center items-center'>
        <h1 className='text-6xl md:text-8xl text-left px-16 pt-16 pb-4 font-bold'>Take Your Meal Prep <span className='text-4xl md:text-6xl block font-bold text-blue-500'>To The Next Level</span></h1>
        <p className='px-16 text-lg'>Your favorite recipes, tailored shopping lists, and meal planning—all in one place.</p>
        <Button className='bg-blue-500 w-fit p-2 rounded-xl'>Start Planning Now</Button>
      </div>
    </section>



  )
}

export default Hero