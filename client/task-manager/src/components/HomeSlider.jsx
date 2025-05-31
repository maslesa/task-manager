import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeSlider(){

    const settings = {
        infinite: true,
        speed: 4000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        variableWidth: true,
      };

      const settings2 = {
        infinite: true,
        speed: 8000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        variableWidth: true,
      };

    return(
        <>
            <div className="mt-10 overflow-hidden w-3/4 lg:w-2/3 h-8">
                <Slider {...settings}>
                    <div className='mx-5'>
                        <div className="flex items-center gap-2 text-2xl font-roboto text-my-blue3 mr-2 ml-2">
                            <img className='inline-block w-7 h-7' src="/calendar.png" alt="" />
                            <p>Check your Today’s Tasks</p>
                        </div>
                    </div>
                    <div className='mx-5'>
                        <div className="flex items-center gap-2 text-2xl font-roboto text-my-blue3 mr-2 ml-2">
                            <img className='inline-block w-7 h-7' src="/new.png" alt="" />
                            <p>Add new tasks anytime</p>
                        </div>
                    </div>
                    <div className='mx-5'>
                        <div className="flex items-center gap-2 text-2xl font-roboto text-my-blue3 mr-2 ml-2">
                            <img className='inline-block w-7 h-7' src="/trophy.png" alt="" />
                            <p>View completed tasks and reflect on your wins</p>
                        </div>
                    </div>
                </Slider>
            </div>
            <div className="mt-3 md:mt-5 mb-20 md:mb-0 overflow-hidden w-3/4 lg:w-2/3 h-8">
                <Slider {...settings2}>
                    <div className='mx-2'>
                        <div className="flex items-center gap-2 text-2xl font-roboto text-my-blue3 mr-2 ml-2">
                            <img className='inline-block w-7 h-7' src="/bell.png" alt="" />
                            <p>Get reminders to keep you on track</p>
                        </div>
                    </div>
                    <div className='mx-3'>
                        <div className="flex items-center gap-2 text-2xl font-roboto text-my-blue3 mr-2 ml-2">
                            <img className='inline-block w-7 h-7' src="/alarm.png" alt="" />
                            <p>Never miss a deadline</p>
                        </div>
                    </div>
                    <div className='mx-3'>
                        <div className="flex items-center gap-2 text-2xl font-roboto text-my-blue3 mr-2 ml-2">
                            <img className='inline-block w-7 h-7' src="/trend.png" alt="" />
                            <p>Manage work, study, or daily life</p>
                        </div>
                    </div>
                    <div className='mx-3'>
                        <div className="flex items-center gap-2 text-2xl font-roboto text-my-blue3 mr-2 ml-2">
                            <img className='inline-block w-7 h-7' src="/rocket.png" alt="" />
                            <p>Simple. Fast. Effective.</p>
                        </div>
                    </div>
                </Slider>
            </div>
        </>
    );

}

export default HomeSlider;